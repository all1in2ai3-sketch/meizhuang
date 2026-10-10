import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('album shelf returns to product and growth decorations stay available',async({page})=>{
 await page.goto('/ingredients');await page.getByRole('button',{name:'03 产品图鉴'}).click();const album=page.locator('article').filter({hasText:'FIT ME'});await album.getByRole('button',{name:'继续探索'}).click();await expect(page.getByLabel('当前产品',{exact:true})).toHaveValue('fit-me');await page.getByRole('button',{name:'03 产品图鉴'}).click();await page.getByRole('link',{name:'装饰与成长'}).click();await expect(page.getByLabel('小鹿装饰')).toBeVisible();await expect(page.getByRole('button',{name:'下载成长分享卡'})).toBeVisible();
});
test('statements are in a separate deep page and remain accessible',async({page})=>{
 await page.goto('/profile');await page.getByRole('link',{name:'关于与使用说明'}).click();await expect(page.getByRole('heading',{name:'使用说明与资料声明'})).toBeVisible();await expect(page.getByText('种植、晨露及合成是科普收藏玩法',{exact:false})).toBeVisible();expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
});
test('nonpixel ingredient and reward artwork loads',async({page,request})=>{
 for(const name of ['ingredient-atlas-v2.png','reward-atlas-v2.png']){const r=await request.get('/assets/'+name);expect(r.ok()).toBe(true);expect(r.headers()['content-type']).toContain('image/png');}
 await page.goto('/ingredients');await expect(page.locator('.ingredient-art')).toHaveCount(5);await expect(page.locator('.pixel-game')).toHaveCount(0);await expect(page.getByText('展示经核实的代表性成分',{exact:false})).toHaveCount(0);
});
