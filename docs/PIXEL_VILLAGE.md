# 像素原料小镇（2026-10-04）

## 本轮实现

视觉采用原创 16-bit 农场场景：绿地、木屋、池塘、耕地与像素物品。采用经典田园游戏的画面语言，没有使用现成游戏素材。

- /ingredients 首屏直接进入小镇，详细手册保留在下方。
- /garden 使用同一交互地图和真实存档。
- 工坊拆解收藏 → 晨露池领新手礼 / 完成任务 → 三块田地选择并浇灌 → 图鉴小屋点亮产品。
- 20 个地块，每页 8 个；已发现、待浇灌、成熟状态与存档同步。
- 小鹿对话、工具栏、全屏按钮 / F 键；手机左右滑动地图，工具栏提供同等功能。
- 单 Canvas 绘制场景与原料，HTML 语义按钮承载操作。render_game_to_text 与 advanceTime 支持确定性检查；减少动效设置关闭闪光动画。
- 复用现有晨露和幂等收藏规则，没有额外收费、等待或漏做惩罚。

## 图片

内置 image_gen 工具生成，非 CLI 回退；原文件保留，新素材保存到：
- public/assets/pixel-garden-v3.png
- public/assets/pixel-ingredients-v3.png
- public/assets/pixel-resources-v3.png

### 最终提示词

#### pixelMap
Use case: stylized-concept. Original cozy 16-bit pixel-art farming game scene for a beauty ingredient garden. Top-down three-quarter view like classic farming RPGs, crisp visible square pixels, no smooth 3D rendering. Landscape 3:2 ratio. Warm late-spring sunshine. Detailed lush emerald grass, daisies, fences and leafy trees framing edges. A terracotta-roof botanical apothecary cottage at upper left (center x22% y25%); a clear blue small pond at upper right (x76% y28%); a small wood-roof library hut with open book sign at lower right (x80% y73%). Curving golden dirt paths connect all three. In the center foreground (x44% y65%) leave a generous EMPTY flat rectangular patch of dark tilled soil 40% width and 28% height for interactive crop tiles to be overlaid in code, no plants on this patch. Tiny original friendly spotted deer beside the left path at x14% y65%. Wooden fence, mushrooms, original handmade charming village details. Limited rich green, ochre, chestnut and aqua palette. Entire scene legible, no text, no labels, no UI, no characters or buildings copied from existing games. Pixel art, hard pixel edges, no blur, no gradients. This is a navigable original farm game background.

#### pixelIngredients
Use case: stylized-concept. One production pixel-art sprite atlas for an original cozy 16-bit botanical collecting game. Precisely 5 columns by 4 rows, 20 equal square cells, each object centered and fully contained with 18% margin, overall 5:4 landscape ratio. Uniform pale cream background in every cell. Crisp square pixels, dark colored outlines, tiny highlights, limited sage emerald gold aqua rose palette, no 3D render or antialiasing. Row1: pearly ceramide discs; aqua gel pearl; white silica crystals; golden vitamin E drop; clear glycerin ampoule. Row2: ivory wax curls; green crystal; ivory collagen ribbon spool; white sugar crystals; little clear vial. Row3: golden wood bead; chain of pearl beads; aqua water orb; green amla fruit and leaf; golden sun orb. Row4: argan nut and oil; sesame seeds in spoon; honeycomb chunk; golden oil capsule; white powder mound. No words letters numbers logos borders gridlines. Objects are collectible fantasy icons, not scientific diagrams. Charming coherent original pixel game inventory sprites.

#### pixelResources
Use case: stylized-concept. A production pixel-art sprite atlas, exactly 4 columns by 2 rows, eight equal square cells, overall wide 2:1 aspect ratio. Each centered isolated object fully contained with 20% margin. Uniform pale cream background, no lines. Original cozy 16-bit farming game inventory icons, hard square pixels, dark warm outlines, tiny high-contrast highlights, limited palette, no blur, no smooth 3D. Top row: bright cyan dew droplet; purple moon dew; rose petals; golden fruit. Bottom row: seed packet with small green sprout; golden leaf medal; small cute spotted deer facing right; silver watering can with cyan water. No text letters labels logos. All same scale and coherent pixel style.

## 验收

- 构建、25 项业务测试通过；43 项完整端到端回归通过。
- 最后的入口同步 / 手机提示调整后，5 项相关回归通过；新增一项从美妆奖励到图鉴合成的完整通关测试，与其他 2 项像素交互测试一起通过（现有端到端用例共 44 项）。
- 覆盖余额不足、新手礼只领一次、浇灌扣费、跨田地、图鉴合成、刷新保存、键盘、全屏、320/375/768/1440 宽度与 axe。
- 使用 develop-web-game 原版客户端执行动作与状态截图。技能目录无法解析项目 Playwright，故原样复制客户端为 scripts/pixel-game-client.mjs，从项目依赖执行；未修改客户端。
- 画面与状态证据：output/pixel-game，output/playwright/pixel-grown.png，pixel-garden-*.png。

后续可选方向：更多季节地图、人物走动、可摆放装饰；当前交互采用点击建筑和地块。

