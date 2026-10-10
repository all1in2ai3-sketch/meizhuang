import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
async function own(page:any,name:string){await page.goto('/cabinet');await page.getByRole('button',{name:new RegExp(name)}).click();await page.getByLabel('我已核对品牌与地区版本，确认拥有此产品').check();await page.getByRole('button',{name:'保存到展柜'}).click();}
test('style, adjustment, immediate start and coaching form a usable flow',async({page})=>{
 await own(page,'FIT ME');await own(page,'Colour Riche');await page.goto('/inspiration');await page.getByRole('button',{name:'柔雾约会'}).click();await page.getByRole('button',{name:'生成我的方案'}).click();await expect(page.getByRole('region',{name:'本次使用产品'}).getByRole('link')).toHaveCount(2);
 await expect(page.locator('#look-result')).toContainText('轻涂一层，让唇部边缘柔和过渡');await page.getByRole('button',{name:'只留三分钟',exact:true}).click();await expect(page.getByText('3 分钟 · 1 件产品')).toBeVisible();await page.getByRole('button',{name:'现在开始',exact:true}).click();await page.getByRole('button',{name:'开始逐步指导'}).click();await page.getByRole('button',{name:'下一步',exact:true}).click();await expect(page.getByRole('region',{name:'本步检查重点'})).toBeVisible();await page.reload();await expect(page.getByRole('region',{name:'本步检查重点'})).toBeVisible();
});
test('free text exclusion changes the product list and empty cabinet has a useful exit',async({page})=>{
 await page.goto('/inspiration');await page.getByRole('button',{name:'生成我的方案'}).click();await expect(page.getByRole('heading',{name:'出门前 · 两分钟状态整理'})).toBeVisible();await expect(page.getByRole('link',{name:'添加手边的彩妆'})).toBeVisible();
 await own(page,'FIT ME');await own(page,'Colour Riche');await page.goto('/inspiration');await page.getByLabel('今天的需求').fill('去面试，不要涂口红');await page.getByRole('button',{name:'生成我的方案'}).click();await expect(page.locator('#look-result')).not.toContainText('加一点你喜欢的唇色');await expect(page.locator('#look-result')).toContainText('面试妆容');
});
test('makeup result is accessible and fits mobile and desktop',async({page})=>{
 await own(page,'FIT ME');await own(page,'Colour Riche');await page.goto('/inspiration');await page.getByRole('button',{name:'生成我的方案'}).click();expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
 for(const width of [320,375,1440]){await page.setViewportSize({width,height:1000});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`output/playwright/makeup-${width}.png`,fullPage:true});}
});
