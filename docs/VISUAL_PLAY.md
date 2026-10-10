
## 图形化玩法资产（2026-10-04）

使用 imagegen 技能的内置 image_gen 工具生成，共 3 张项目图片；未调用 CLI/API 回退。

视觉方向：奶油纸色、鼠尾草绿、柔和玻璃和植物材质，把科普收藏做成可以看懂的花园路线。
结构：图形导航 → 产品拆解 → 下一步引导 → 原料培育 → 合成收藏；花园地图连接原料工坊、晨露池和图鉴室。
交互：拆解展开、成熟反馈、地图入口悬浮抬升；尊重减少动态效果设置。

- public/assets/ingredient-atlas-v2.png：5 × 4 图集，按 src/ingredients.ts 的顺序对应 20 张原料卡。
- public/assets/reward-atlas-v2.png：3 × 2 图集，晨露、夜光露、花瓣、果实、种子、徽章。
- public/assets/garden-map-v2.png：花园地图背景。

图集由 CSS 定位显示，没有将艺术化形态作为真实原料或功效证据。相关声明集中于 /about。

### 最终生成提示词

#### 原料图集
Use case: stylized-concept. Asset: a single production sprite atlas for Beauty Alarm ingredient collecting game. Exactly 20 distinct collectible ingredient illustrations arranged in a precise 5 column by 4 row equal square grid, no gutters, no borders, each object fully contained in its own cell with generous 18% margins. Overall landscape 5:4 ratio. Every cell uniform pale ivory background #f7f3e9. Premium miniature botanical apothecary objects, softly sculpted translucent glass, ceramic, wax and botanical textures, sage green, honey gold, pale aqua, warm natural lighting. Each cell has one clear object, centered, same scale. Row1: layered pearly ceramide discs; transparent hyaluronic gel pearl; white silica mineral crystals; amber vitamin E droplet; clear glycerin glass ampoule. Row2: ivory cholesterol wax curls; green phytosphingosine leaflike crystal; pearly collagen ribbon spool; white betaine sugar crystals; transparent propanediol vial. Row3: golden proxylane wood-inspired bead; peptide chain of pearl beads; aqua hyaluronic water orb; green amla fruit with leaf; sun-filter golden protective orb. Row4: argan nut with golden oil; sesame seeds in tiny ceramic spoon; honeycomb beeswax chunk; vitamin E acetate golden capsule; soft white nylon powder mound. No text, letters, numbers, brands, molecular diagrams or labels. Polished cohesive elegant collectible game art, not photoreal ingredient evidence.

#### 资源图集
Use case: stylized-concept. Create one square game resource sprite atlas, exactly 3 columns x 2 rows equally sized cells, uniform pale ivory #f7f3e9 background, no grid lines or text. Premium miniature objects with soft 3D glass and botanical textures, warm light, sage green honey gold muted rose colors; each centered completely within its cell, generous margin. Top row: 1 luminous aqua morning dew teardrop on a tiny leaf, 2 violet moonlit dewdrop with small crescent, 3 loose rose and peach flower petals. Bottom row: 4 tiny golden peach-like fruit with leaf, 5 three golden seeds with a tiny sprout, 6 gold botanical medallion embossed with a leaf, elegant achievement reward. Consistent camera and scale, no labels letters or logos. For a gentle beauty ritual garden game.

#### 地图
Use case: stylized-concept. Wide landscape 3:1 illustrated garden map backdrop for a premium beauty ritual web game. An elegant miniature botanical garden on warm ivory paper, sage green rounded plant beds, winding cream stone path connecting a small cosmetic apothecary shelf on left, a dew pond and tiny glass greenhouse in center, an open botanical album and small friendly deer on right. Soft sculpted 3D storybook objects, tactile paper and glass, honey gold, muted rose, sage. Beautiful soft morning light and restrained detail. View from elevated isometric perspective. Plenty of breathing room. No text, labels, UI, logos, humans, borders. It will be overlaid with three clickable navigation stations.

