import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('discover, cultivate and compose using earned dew; persists without duplicate rewards',async({page})=>{
 await page.goto('/inspiration');await page.getByRole('button',{name:'生成我的方案'}).click();await page.getByRole('button',{name:'确认并加入时钟'}).click();await page.getByRole('button',{name:'开始逐步指导'}).click();await page.getByRole('button',{name:'下一步',exact:true}).click();await page.getByRole('button',{name:'完成并回顾'}).click();await page.getByRole('button',{name:'保存回顾，领取晨露'}).click();
 await page.goto('/ingredients?product=fit-me');await expect(page.getByLabel('当前产品',{exact:true})).toHaveValue('fit-me');
 await page.getByRole('button',{name:'拆解并收藏 3 张原料卡'}).click();await expect(page.getByRole('button',{name:'点亮产品图鉴',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'领取新手晨露 · 2 滴'}).click();
 for(const name of ['硅石','生育酚','尼龙-12'])await page.getByRole('button',{name:`培育${name} · 1 滴`}).click();
 await expect(page.getByText('可用晨露 0')).toBeVisible();await page.getByRole('button',{name:'点亮产品图鉴',exact:true}).click();
 const album=page.getByRole('region',{name:'产品图鉴收藏架'}).locator('article').filter({hasText:'FIT ME'});await expect(album.getByRole('button',{name:'已收藏'})).toBeDisabled();
 await page.reload();await page.getByRole('button',{name:'03 产品图鉴'}).click();await expect(album.getByRole('button',{name:'已收藏'})).toBeDisabled();
 await page.getByRole('button',{name:'02 培育原料'}).click();await expect(page.getByRole('button',{name:'领取新手晨露 · 2 滴'})).toHaveCount(0);await expect(page.getByRole('button',{name:'已成熟'})).toHaveCount(3);
 await page.getByLabel('当前产品',{exact:true}).selectOption('cerave-cleanser');await page.getByRole('button',{name:'拆解并收藏 5 张原料卡'}).click();await expect(page.getByRole('button',{name:'培育神经酰胺 · 1 滴'})).toBeDisabled();await expect(page.getByRole('link',{name:'去完成任务'})).toBeVisible();
});

test('cabinet opens matching verified product; unsupported product stays unavailable',async({page})=>{
 await page.goto('/cabinet?product=fit-me');await page.getByRole('link',{name:'拆解成原料卡'}).click();await expect(page.getByLabel('当前产品',{exact:true})).toHaveValue('fit-me');
 await page.goto('/cabinet?product=lancome-lip');await expect(page.getByText('这款产品的成分图鉴准备中。')).toBeVisible();
});

test('each garden view is accessible and has one main workspace',async({page})=>{
 await page.goto('/ingredients');
 for(const name of ['01 拆解产品','02 培育原料','03 产品图鉴']){await page.getByRole('button',{name}).click();expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);await expect(page.locator('h1')).toHaveCount(1);}
 await expect(page.getByRole('navigation',{name:'玩法地图'})).toHaveCount(0);await expect(page.locator('canvas')).toHaveCount(0);
});
for(const width of [320,375,768,1440])test(`all garden views fit at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:950});await page.goto('/ingredients');
 for(const [view,name] of [['discovery','01 拆解产品'],['grow','02 培育原料'],['albums','03 产品图鉴']]){await page.getByRole('button',{name}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`output/playwright/garden-${view}-${width}.png`,fullPage:true});}
});
