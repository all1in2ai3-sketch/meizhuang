import {test,expect} from '@playwright/test';

test('all 20 ingredients are discoverable and current recipe stays together',async({page})=>{
 await page.goto('/ingredients');await page.getByRole('button',{name:'02 培育原料'}).click();await expect(page.getByRole('region',{name:'原料培育区'}).locator('article')).toHaveCount(5);
 await page.getByRole('button',{name:'查看全部 20 张原料'}).click();await expect(page.getByRole('region',{name:'原料培育区'}).locator('article')).toHaveCount(20);
 const nylon=page.locator('article').filter({has:page.getByRole('heading',{name:'尼龙-12',exact:true})});await nylon.getByRole('button',{name:'去发现这张原料'}).click();await expect(page.getByLabel('当前产品',{exact:true})).toHaveValue('fit-me');await expect(page.getByRole('button',{name:'拆解并收藏 3 张原料卡'})).toBeVisible();
});

test('keyboard actions and welcome dew persist without double spending',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/garden');await page.getByRole('button',{name:'拆解并收藏 5 张原料卡'}).focus();await page.keyboard.press('Enter');await page.getByRole('button',{name:'领取新手晨露 · 2 滴'}).click();await page.getByRole('button',{name:'培育神经酰胺 · 1 滴'}).click();await page.reload();await page.getByRole('button',{name:'02 培育原料'}).click();await expect(page.getByText('可用晨露 1')).toBeVisible();await expect(page.getByRole('button',{name:'已成熟'})).toHaveCount(1);await expect(page.getByRole('button',{name:'领取新手晨露 · 2 滴'})).toHaveCount(0);expect(errors).toEqual([]);
});

test('accessibility preferences live in settings and persist on the garden',async({page})=>{
 await page.goto('/');await expect(page.getByRole('button',{name:/大字体/})).toHaveCount(0);await expect(page.getByRole('checkbox',{name:/大字体/})).toHaveCount(0);
 await page.getByRole('link',{name:'设置',exact:true}).first().click();await page.getByRole('checkbox',{name:'大字体'}).check();await page.getByRole('checkbox',{name:'步骤自动朗读'}).check();await page.reload();await expect(page.getByRole('checkbox',{name:'大字体'})).toBeChecked();await expect(page.getByRole('checkbox',{name:'步骤自动朗读'})).toBeChecked();
 await page.setViewportSize({width:320,height:950});await page.goto('/ingredients');await expect(page.locator('html')).toHaveAttribute('data-large','true');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
