# 素材来源与生成记录

2026-10-03。使用 imagegen skill 的内置 image_gen 工具，未使用 CLI/API fallback。

## 官方原图

7 个产品的页面、原图地址、地区和本地文件记录在 public/assets/official-sources.json；展柜使用原图，非生成包装。品牌包括 L’Oréal Paris、Maybelline、Lancôme、CeraVe。FIT ME 展示官网 110 色号图，仅是系列示例；用户色号需自行确认。官网图的版权归品牌方，Demo 使用记录不代表获得品牌授权。

## 生成素材与最终提示词

### public/assets/ritual-hero.png

Use case: photorealistic-natural. Create a refined wide editorial still life photograph for the Beauty Alarm beauty ritual website. Warm ivory, champagne beige, muted rose, natural morning sunlight. A beautiful unbranded oval mirror, folded ivory linen, soft makeup brush and a subtle dusty pink cosmetic smear on travertine, with botanical shadows. No bottles, no packaging, no text, no logos, no interface. Composition: left half largely quiet cream negative space for live HTML headline; objects grouped on right half, elegant tactile material, realistic photography with soft film grain, sophisticated beauty magazine art direction. Landscape 3:2 or wider.

### public/assets/garden-deer.png

Use case: stylized-concept. Asset for Beauty Alarm self-care companion garden. A single adorable small fawn sitting, gentle friendly expressive dark eyes, rounded ears, warm caramel fur and cream belly, tiny white spots, one tiny sage green sprout between ears. Sophisticated handmade matte clay miniature with soft tactile felt-like texture, elegant adult wellness app art rather than loud cartoon. Full body centered, three-quarter view, soft studio light, restrained warm ivory champagne sage palette. One tiny pale blush flower beside hoof. Isolated on genuine transparent background. No text, no letters, no logo, no UI, no pedestal. Enough padding around all ears and feet.

### public/assets/cream-editorial.png

Input: public/assets/lp-light.png (official reference inspected before tool call).

Use case: product-mockup. Input image is an official L'Oreal Paris Age Perfect Collagene Royal cream jar, exact product reference. Create a premium editorial product photograph, horizontal 3:2. Preserve the jar silhouette, amber glass, gold lid, front lettering and label layout faithfully. One jar on a low pale ivory travertine block, warm champagne sunlight, elegant soft botanical shadows on warm beige plaster, a small fold of ivory linen far behind. Product fully visible, large and centered with breathing space. No added advertising text, no extra products, no invented efficacy claims. This will be clearly labelled AI-styled scene in a hackathon prototype; official original remains in catalog.

生成结果的小字不能作为包装识别依据，已在页面标注 AI 场景创作。

### public/assets/inspiration-texture.png

Use case: photorealistic-natural. Premium editorial beauty still life for three small inspiration cards on an ivory and champagne wellness website. A horizontal composition of silky dusty rose ribbon looping gently over pale travertine, a soft rose cosmetic powder swatch and a delicate fresh sage green leaf, with ivory linen. Warm directional morning sunlight, tactile realistic materials, very restrained palette blush pink warm beige sage, elegant art photography, no people no products no bottles no text no logo no collage borders. Objects distributed across image so left center and right crops each create a pleasing standalone detail.

2026-10-04 新增原料图集、资源图集和花园地图。内置 imagegen 的完整提示词、文件路径和布局说明见 [VISUAL_PLAY.md](VISUAL_PLAY.md)。

2026-10-04 像素版本：新增原创像素地图、20 格原料图集和 8 格资源图集。素材路径和内置 imagegen 最终提示词见 [PIXEL_VILLAGE.md](PIXEL_VILLAGE.md)。
