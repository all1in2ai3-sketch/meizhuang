# 妆容方案体验更新（2026-10-04）

## 原问题
原方案仅按底妆、唇妆套用产品说明，偏好主要改变标题。空展柜仍生成一个名为妆容的准备/确认流程。用户看不到妆感差异，生成后需要读长文本才能开始。

## 当前设计
视觉主张：延续奶油色界面，用三联妆感摄影作选择入口，官方产品图连接实际执行。
内容计划：选妆感 → 输入场合与时间 → 看产品和重点 → 开始执行。完整说明、提醒时间、改名及高级生成选项按需展开。
交互主张：微调必须改变执行内容；三分钟方案重新选择能完成的步骤，不统一压缩操作时间。

- 三种本地妆感模板：清透通勤、柔雾约会、利落会面。各自有底妆、唇部和检查重点。
- 场合关键词进入方案简报。明确的“不要口红/底妆”会移除对应类别。它是有限规则解析，不是通用自然语言理解；真实 AI 服务入口继续独立。
- 在时间预算内只选择已确认拥有的产品。底妆 3 分钟，常规唇妆 2 分钟，三分钟总流程仅含一层唇色、准备和检查各 1 分钟。
- “更清淡一些”改变妆感与叠加指引；“突出唇色”改变优先级和唇部操作重点；“只留三分钟”重建步骤。保留已明确的排除项。
- 显示对应产品图片、已录入色号、时间与具体操作。每一步附部位示意和完成检查点。
- 空展柜提供产品入口，替代流程明确命名为“两分钟状态整理”，内容是整理头发、衣领、嘴角与随身物品。
- 旧的未完成演示任务保留数据，准备页提供“重新设计这份妆容”入口。完成记录不自动改写。
- 妆感简报与检查点随方案收藏、任务及本地存档保存。现在开始和设置提醒分别可用。

## 来源
FIT ME 官方使用方法于本轮复核：干净海绵或指腹适量均匀涂抹。
https://www.maybelline.com.hk/zh-hk/all-products/face-makeup/foundation/fit-me-matte-poreless-foundation
其他产品延续项目已有资料；本轮兰蔻官网访问超时，没有新增官方使用断言。妆感操作是项目编辑的演示指导，不声称为官方功效。

## 图片
使用内置 imagegen。项目文件：public/assets/makeup-looks-v1.png。三个等宽区域对应清透、柔和、正式。图片的 AI 来源说明集中在 /about。

生成提示词：
Create a single editorial beauty triptych image for a Chinese makeup planner web app. Three equal-width vertical portrait panels side by side with no gaps, each showing the SAME fictional adult East Asian woman aged about 28, same face, hairstyle tucked behind ears, same frontal shoulders-and-head framing, same calm expression and cream blouse, natural visible skin texture, no retouching perfection. Left panel: fresh everyday makeup, sheer even base, subtle warm coral lip, barely-there eyes. Middle panel: soft romantic everyday makeup, muted rose lip with softer edges, subtle rosy feel. Right panel: composed formal makeup, carefully defined muted brick-rose lip edge, even matte base, understated neutral eyes. All three are subtle attainable everyday looks, no strong lashes, no dramatic eyeshadow. Elegant warm ivory background in all panels, diffuse daylight, realistic luxury beauty editorial photography, restrained sage and cream art direction matching an elegant cosmetics app. Each face centered exactly within its third, complete forehead and chin visible, consistent scale. Wide 3:2 overall image. No text, no labels, no logos, no products, no before-after implication. These are fictional style references, not promised product results.

## 验收
- 31 项领域单元测试通过：新增妆感差异、排除产品、三分钟计划、底妆优先级、空展柜和存档元数据检查。
- 最终 46 项浏览器回归全部通过，包括产品确认、生成、微调、现在开始、逐步指导、刷新、原料奖励与旧功能。
- 新结果页通过 axe WCAG A/AA 自动检查；修正原有步骤数字、时间文字和新小标题的对比度。
- 320、375、1440 宽度无横向溢出，截图保存在 output/playwright/makeup-*.png。
- 这是助手走查与自动验收，没有进行真人妆效试验或真实模型效果验证。
