import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('create repeat goal, pause all reminders, resume at confirmed date',async({page})=>{
 await page.goto('/planner');await page.getByLabel('目标名称').fill('我的晨间目标');await page.getByLabel('重复频率').selectOption('工作日');await page.getByLabel('计划次数（1—30）').fill('3');await page.getByRole('button',{name:'预览例程与步骤'}).click();await page.getByRole('button',{name:'确认创建计划'}).click();await page.getByRole('link',{name:'美妆时钟',exact:true}).first().click();await expect(page.getByText('已完成 0 / 3 次',{exact:false})).toBeVisible();await page.getByRole('button',{name:'暂停整个计划'}).click();await expect(page.getByText('已完成 0 / 3 次',{exact:false})).toContainText('计划已暂停');await page.getByRole('button',{name:'恢复计划'}).click();await page.getByRole('button',{name:'确认恢复安排'}).click();await expect(page.getByRole('button',{name:'暂停整个计划'})).toBeVisible();
});
test('scan candidates require product confirmation and unknown input has exits',async({page})=>{
 await page.goto('/scan');await page.getByLabel('识别文字 / 手动输入条码或名称').fill('6902395774181');await page.getByRole('link',{name:'核对版本并记录'}).click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('button',{name:'保存到展柜'})).toBeDisabled();await page.goto('/scan');await page.getByLabel('识别文字 / 手动输入条码或名称').fill('no matching item');await expect(page.getByText('不确定：暂未找到匹配产品。可重拍或修改识别文字。')).toBeVisible();await page.getByRole('link',{name:'手动录入',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();
});
test('day context persists and weather failures are explicit',async({page})=>{
 await page.route('**/api/weather?*',route=>route.fulfill({status:502,contentType:'application/json',body:JSON.stringify({error:'天气服务暂不可用'})}));await page.goto('/context');await page.getByLabel('城市名称').fill('Shanghai');await page.getByRole('button',{name:'查询当前天气'}).click();await expect(page.getByRole('status')).toContainText('天气服务暂不可用');await page.getByLabel('日程名称').fill('社团活动');await page.getByRole('button',{name:'保存日程'}).click();await expect(page.getByText('社团活动',{exact:true})).toBeVisible();await page.reload();await expect(page.getByText('社团活动',{exact:true})).toBeVisible();
});
test('camera refusal preserves task navigation and timer controls',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(navigator.mediaDevices,'getUserMedia',{value:()=>Promise.reject(new DOMException('denied','NotAllowedError'))});});await page.goto('/inspiration');await page.getByRole('button',{name:'生成我的方案'}).click();await page.getByRole('button',{name:'确认并加入时钟'}).click();await page.getByRole('button',{name:'开始逐步指导'}).click();await page.getByRole('button',{name:'开始计时',exact:true}).click();await expect(page.getByRole('button',{name:'暂停计时',exact:true})).toBeVisible();await page.getByText('可选：镜头自查',{exact:true}).click();await page.getByRole('button',{name:'开启镜头',exact:true}).click();await expect(page.getByText('无法使用相机。',{exact:false})).toBeVisible();await page.getByRole('button',{name:'下一步',exact:true}).click();await expect(page.getByRole('button',{name:'完成并回顾'})).toBeVisible();
});
test('full beauty language is saved and plan can be edited',async({page})=>{
 await page.goto('/profile');await page.getByLabel('希望避开的感觉或颜色').fill('太艳');await page.getByLabel('材质感').selectOption('雾面');await page.getByRole('link',{name:'妆容方案',exact:true}).click();await page.getByRole('button',{name:'生成我的方案'}).click();await expect(page.getByText('避开 太艳。',{exact:false})).toBeVisible();await page.getByText('调整提醒时间与方案名称',{exact:false}).click();await page.getByLabel('修改方案名称').fill('我的可编辑方案');await page.getByRole('button',{name:'确认并加入时钟'}).click();await expect(page.getByRole('heading',{name:'我的可编辑方案'})).toBeVisible();
});
for(const route of ['/planner','/context','/scan'])test(`extended page access and responsive ${route}`,async({page})=>{
 await page.goto(route);expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);for(const width of [320,768,1440]){await page.setViewportSize({width,height:950});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.screenshot({path:`output/playwright/${route.slice(1)}-1440.png`,fullPage:true});
});

test('homepage self-completion requires confirmation and grants once',async({page})=>{
 await page.goto('/inspiration');await page.getByRole('button',{name:'生成我的方案'}).click();await page.getByRole('button',{name:'确认并加入时钟'}).click();await page.getByRole('link',{name:'今日',exact:true}).click();await page.getByRole('button',{name:'已自行完成'}).click();await page.getByRole('button',{name:'确认已完成'}).click();await expect(page.getByRole('button',{name:'已自行完成'})).toHaveCount(0);await page.goto('/growth');await expect(page.getByText('已经一起完成 1 次美妆时刻')).toBeVisible();
});
test('multiple tabs can open without an exclusive editor lock',async({page,context})=>{
 await page.goto('/');await expect(page.getByRole('heading',{name:'今天，也为自己。'})).toBeVisible();
 const second=await context.newPage();await second.goto('/ingredients');await expect(second.getByRole('heading',{name:'成分花园'})).toBeVisible();
 await expect(second.getByRole('heading',{name:'这个美妆档案已在另一页打开'})).toHaveCount(0);
 await second.reload();await expect(second.getByRole('heading',{name:'成分花园'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'今天，也为自己。'})).toBeVisible();
});
test('experimental vision rejects invalid data without calling a model',async({request})=>{
 const result=await request.post('/api/observe',{data:{image:'invalid'}});expect(result.status()).toBe(400);const status=await (await request.get('/api/status')).json();if(!status.configured){const result=await request.post('/api/observe',{data:{image:'data:image/jpeg;base64,YQ=='}});expect(result.status()).toBe(503);}
});
