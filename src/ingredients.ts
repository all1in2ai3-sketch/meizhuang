export type Ingredient = {id:string;name:string;inci:string;symbol:string;note:string;kind:string};
export const ingredients:Ingredient[] = [
  {id:'ceramides',name:'神经酰胺',inci:'Ceramide NP / AP / EOP',symbol:'Ce',kind:'屏障拼图',note:'官网列出三种神经酰胺，并介绍其帮助维持皮肤屏障的作用。'},
  {id:'hyaluronate',name:'透明质酸钠',inci:'Sodium Hyaluronate',symbol:'HA',kind:'水分伙伴',note:'成分表标为透明质酸钠；官网以透明质酸介绍其保湿作用。'},
  {id:'silica',name:'硅石',inci:'Silica',symbol:'Si',kind:'质地线索',note:'香港官网成分表列有硅石。单凭这一成分不能推断产品妆效或具体含量。'},
  {id:'tocopherol',name:'生育酚',inci:'Tocopherol',symbol:'E',kind:'配方线索',note:'香港官网成分表列有生育酚。成分卡用于认识名称，不代表该粉底具有单独的护肤功效。'},
  {"id":"glycerin","name":"甘油","inci":"Glycerin","symbol":"G","kind":"水分伙伴","note":"官网成分资料列出的配方组成，实际含量未公开。"},
  {"id":"cholesterol","name":"胆固醇","inci":"Cholesterol","symbol":"Ch","kind":"屏障拼图","note":"CeraVe 官方成分表中的脂质成分，不能从单一成分推断整瓶效果。"},
  {"id":"phytosphingosine","name":"植物鞘氨醇","inci":"Phytosphingosine","symbol":"P","kind":"屏障拼图","note":"CeraVe 官方成分表列出此名称，可对照手边包装认识它。"},
  {"id":"collagen","name":"胶原","inci":"Collagen","symbol":"Co","kind":"配方线索","note":"小蜜罐官网介绍的复配组成之一；不等于外用后直接补充皮肤胶原。"},
  {"id":"betaine","name":"甜菜碱","inci":"Betaine","symbol":"B","kind":"水分伙伴","note":"小蜜罐官网复配原料说明中列有甜菜碱。配比未公开。"},
  {"id":"propanediol","name":"1,3-丙二醇","inci":"Propanediol","symbol":"Pr","kind":"配方线索","note":"官网说明中的复配组成之一，用于认识配方，不作为独立功效承诺。"},
  {"id":"proxylane","name":"玻色因成分","inci":"Hydroxypropyl Tetrahydropyrantriol","symbol":"Px","kind":"配方线索","note":"官网将玻色因名称对应到该成分；原料测试与成品功效需要区分。"},
  {"id":"peptides","name":"四重肽组合","inci":"Palmitoyl Tetrapeptide-7 / Tripeptide-1; Acetyl Hexapeptide-8; Palmitoyl Tetrapeptide-10","symbol":"Pe","kind":"配方线索","note":"官网脚注列明四种肽。这是一张组合知识卡，不表示一种单独原料。"},
  {"id":"ha","name":"透明质酸","inci":"Hyaluronic acid · 官网描述","symbol":"H","kind":"水分伙伴","note":"防晒官网描述的保湿成分；此页未提供完整 INCI 名称与比例。"},
  {"id":"amla","name":"油甘子果萃取","inci":"Amla extract · 官网描述","symbol":"A","kind":"植物线索","note":"小金管官网描述中的植物萃取，不代表水果可替代化妆品。"},
  {"id":"mexoryl","name":"Mexoryl XL","inci":"品牌防晒技术名称","symbol":"UV","kind":"防护线索","note":"官网介绍的防晒技术之一；防晒指数属于完整产品，不属于单张原料卡。"},
  {"id":"argan","name":"摩洛哥坚果油","inci":"Argania Spinosa Kernel Oil","symbol":"Ar","kind":"植物线索","note":"Colour Riche 美国官网列出的植物油，具体版本以包装为准。"},
  {"id":"sesame","name":"芝麻籽油","inci":"Sesame Seed Oil","symbol":"Se","kind":"植物线索","note":"Colour Riche 官网成分资料列有芝麻籽油。"},
  {"id":"beeswax","name":"蜂蜡","inci":"Beeswax","symbol":"W","kind":"质地线索","note":"Colour Riche 官网列出的蜡类成分，用卡片认识质地组成。"},
  {"id":"vitamin-e-acetate","name":"生育酚乙酸酯","inci":"Tocopheryl Acetate","symbol":"EA","kind":"配方线索","note":"美国唇膏成分表列出的维生素 E 衍生物，与生育酚分别建卡。"},
  {"id":"nylon","name":"尼龙-12","inci":"Nylon-12","symbol":"N","kind":"质地线索","note":"FIT ME 香港官网成分表列出的粉体成分。不能据此推断实际用量。"},
];
export const ingredientRecipes:Record<string,string[]>={'cerave-cleanser':['ceramides','hyaluronate','glycerin','cholesterol','phytosphingosine'],'fit-me':['silica','tocopherol','nylon'],'lp-light':['collagen','glycerin','betaine','propanediol','proxylane','peptides'],'lp-rich':['collagen','glycerin','betaine','propanediol','proxylane','peptides'],'lp-uv':['ha','amla','mexoryl'],'colour-riche':['argan','sesame','beeswax','vitamin-e-acetate']};
export type LabState={discovered:string[];cultivated:string[];albums:string[];welcomeClaimed:boolean};
export const emptyLab:LabState={discovered:[],cultivated:[],albums:[],welcomeClaimed:false};
export type LabAction={type:'discover'|'compose';productId:string}|{type:'grow';ingredientId:string}|{type:'welcome'};
export const dewBalance=(lab:LabState,rewardCount:number)=>Math.max(0,rewardCount+(lab.welcomeClaimed?2:0)-lab.cultivated.length);
export function evolveLab(lab:LabState,action:LabAction,rewardCount:number):LabState{
  if(action.type==='welcome')return lab.welcomeClaimed?lab:{...lab,welcomeClaimed:true};
  if(action.type==='grow'){
    if(!ingredients.some(i=>i.id===action.ingredientId)||!lab.discovered.includes(action.ingredientId)||lab.cultivated.includes(action.ingredientId)||dewBalance(lab,rewardCount)<1)return lab;
    return {...lab,cultivated:[...lab.cultivated,action.ingredientId]};
  }
  const recipe=ingredientRecipes[action.productId];if(!recipe)return lab;
  if(action.type==='discover')return {...lab,discovered:[...new Set([...lab.discovered,...recipe])]};
  if(lab.albums.includes(action.productId)||!recipe.every(id=>lab.cultivated.includes(id)))return lab;
  return {...lab,albums:[...lab.albums,action.productId]};
}

export function nextGardenProduct(lab:LabState){
 return Object.entries(ingredientRecipes).filter(([id])=>!lab.albums.includes(id)).map(([id,recipe])=>({id,known:recipe.filter(i=>lab.discovered.includes(i)).length,grown:recipe.filter(i=>lab.cultivated.includes(i)).length})).sort((a,b)=>b.known-a.known||b.grown-a.grown)[0]?.id||'cerave-cleanser';
}
export function gardenHref(lab:LabState){const product=nextGardenProduct(lab);return `/ingredients?product=${product}&view=${ingredientRecipes[product].every(id=>lab.discovered.includes(id))?'grow':'discover'}`;}
