import {test,expect} from '@playwright/test';

test('every ingredient has plain language content in the page',async({page})=>{
 await page.goto('/ingredients?view=grow');await page.getByRole('button',{name:'查看全部 20 张原料'}).click();const cards=page.getByRole('region',{name:'原料培育区'}).locator('article');await expect(cards).toHaveCount(20);
 for(const card of await cards.all()){await expect(card.locator('p').first()).toBeVisible();expect((await card.locator('p').first().innerText()).length).toBeGreaterThan(8);await card.getByText('成分说明',{exact:true}).click();expect((await card.locator('details p').innerText()).length).toBeGreaterThan(20);await expect(card.locator('details a').first()).toHaveAttribute('href',/^https:/);}
});
test('home has one route and a clear next step; settings stays separate',async({page})=>{
 await page.goto('/');await expect(page.getByRole('link',{name:'添加我的产品',exact:true})).toBeVisible();await expect(page.getByRole('navigation',{name:'使用路线'}).getByRole('link')).toHaveCount(4);await expect(page.getByRole('navigation',{name:'主要导航'}).getByRole('link')).toHaveText(['今日','产品展柜','妆容方案','美妆时钟','成分花园']);await expect(page.getByText('辅助方式',{exact:true})).toHaveCount(0);await page.getByRole('link',{name:'添加我的产品',exact:true}).click();await expect(page).toHaveURL(/cabinet/);
});
test('task reward returns to a discovered ingredient group',async({page})=>{
 await page.goto('/ingredients?product=fit-me');await page.getByRole('button',{name:'拆解并收藏 3 张原料卡'}).click();await page.goto('/inspiration');await page.getByRole('button',{name:'生成我的方案'}).click();await page.getByRole('button',{name:'现在开始',exact:true}).click();await page.getByRole('button',{name:'开始逐步指导'}).click();await page.getByRole('button',{name:'下一步',exact:true}).click();await page.getByRole('button',{name:'完成并回顾'}).click();await page.getByRole('button',{name:'保存回顾，领取晨露'}).click();await page.getByRole('link',{name:'用晨露培育成分'}).click();await expect(page.getByLabel('当前产品',{exact:true})).toHaveValue('fit-me');await expect(page.getByRole('button',{name:'培育硅石 · 1 滴'})).toBeEnabled();await page.reload();await expect(page.getByRole('region',{name:'原料培育区'})).toBeVisible();
});
