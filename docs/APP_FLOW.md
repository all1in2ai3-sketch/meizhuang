# 页面脉络与成分阅读优化

视觉主张：统一奶油白与鼠尾草绿，用产品、原料和小鹿图片区分工作区，减少横幅与重复卡片。
内容计划：首页只展示下一步、四步路线和收藏进度；主导航按产品→方案→任务→花园排序。其他工具收在相关页面的次级入口。
交互主张：保存产品后可生成方案；完成任务可直接带晨露培育；缺晨露时去待办或创建方案；页面切换保持产品和玩法视图。动效只用于按钮反馈、原料选中与进度变化，并尊重减少动画偏好。

成分文案：默认显示一句简明说明，展开后显示具体解释、INCI 和对应官方来源。来源页已核实的知识与产品成分表分开记录；不从单个成分推断整瓶功效。

## 已落实
- 主导航：今日 → 产品展柜 → 妆容方案 → 美妆时钟 → 成分花园。设置在右上角，装饰与成长为次级入口。
- 首页按档案状态给一个主行动：无产品时添加产品、有产品时生成妆容、有任务时继续任务。删去重复欢迎语、偏好引导、灵感卡组和花园横幅。
- 首页用四步路线解释产品、任务与晨露的关系。天气、日程和产品提醒收在折叠区。
- 展柜已有产品后显示生成方案入口。任务完成后直接进入最相关的已发现卡组；晨露耗尽且没有待办时进入方案页。
- 产品和玩法视图写入网址，刷新、返回和分享本地链接时保留所处步骤。修复先换产品再换视图导致产品被旧查询参数覆盖的问题。
- 20 张原料默认显示短说明，详情在页面内展开；英文名称和官方来源作为补充信息。

## 文案资料
2026-10-04 检查资料并编写简释。产品归属仍采用 src/products.ts 中对应地区官网；额外知识出处如下：
- 神经酰胺与胆固醇：https://www.cerave.com/skin-smarts/strength-of-ceramides/what-are-ceramides
- 甘油与保湿剂：https://www.cerave.com/skin-smarts/skincare-tips-advice/emollient-vs-humectant-vs-occlusive
- 透明质酸：https://www.cerave.com/skin-smarts/skincare-routines/a-nourishing-skincare-routine-for-dry-skin
- 生育酚及其衍生物：https://inside-our-products.loreal.com/ingredients/vitamin-e （本轮搜索可读取正文；站点部分旧成分页重定向，不把重定向后的集团宣传页当作知识证据。）
- 小蜜罐复配和名称：https://www.loreal-paris.com.hk/zh-hk/age-perfect/age-perfect-collagen-royal-light-cream-b-60ml
- 唇膏油蜡组成：https://www.lorealparisusa.com/beauty-magazine/makeup/lip-makeup/difference-between-lip-stain-lip-gloss-lipstick
- Colour Riche 配方表：https://www.lorealparisusa.com/makeup/lip-color/lipstick/colour-riche-lipcolour-sugar-plum-754
未取得额外作用证据的原料只解释名称、类型和产品关联，不添加功效承诺。

## 验收
- 浏览器共 49 项：首轮 47 项通过；修复查询参数更新问题后，相关 9 项全部通过，包含之前失败的两项。
- 31 项领域单元测试通过；生产构建通过。
- 新增逐张检查 20 张卡片的页面内文字、四步导航，以及完成任务回到正确原料卡组的测试。
- 首页、玩法与妆容结果通过自动无障碍检查；320、375、414、768、1440 等视口按现有回归覆盖，未发现横向溢出。
- 已人工检查首页与手机成分页截图；没有进行真人可用性研究。
