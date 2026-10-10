import {ingredientStories} from './ingredientStories';
import {useEffect,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {ArrowRight,Check,Droplets,Sparkles} from 'lucide-react';
import {IngredientArt,ResourceArt} from './Visuals';
import {useStore} from './store';
import {products} from './products';
import {ingredients,ingredientRecipes,dewBalance} from './ingredients';
import s from './IngredientLab.module.css';

type View='discover'|'grow'|'albums';
const catalog=products.filter(p=>ingredientRecipes[p.id]);
export default function IngredientLab(){
 const [params,setParams]=useSearchParams();
 const requested=params.get('product')||'cerave-cleanser';
 const selected=ingredientRecipes[requested]?requested:'cerave-cleanser';
 const rawView=params.get('view');const view:View=rawView==='grow'||rawView==='albums'?rawView:'discover';
 const setView=(next:View)=>setParams(previous=>{const updated=new URLSearchParams(previous);updated.set('view',next);return updated;});
 const [all,setAll]=useState(false);
 const [message,setMessage]=useState('');
 const {lab,labAction,rewards,tasks}=useStore();
 useEffect(()=>{setAll(false);setMessage('');},[selected]);
 const product=catalog.find(p=>p.id===selected)!;
 const recipe=ingredientRecipes[selected];
 const cards=ingredients.filter(i=>recipe.includes(i.id));
 const available=dewBalance(lab,rewards.length);
 const collected=recipe.every(id=>lab.discovered.includes(id));
 const grown=recipe.filter(id=>lab.cultivated.includes(id)).length;
 const unlocked=lab.albums.includes(selected);
 const choose=(id:string,next:View='discover')=>{setParams({product:id,view:next});setAll(false);};
 const discover=()=>{labAction({type:'discover',productId:selected});setView('grow');setMessage('原料已收藏，给它们一滴晨露，就能培育成熟。');};
 const compose=()=>{labAction({type:'compose',productId:selected});setView('albums');setMessage(`${product.name}图鉴已点亮！`);};
 return <div className={s.lab}>
  <header className={s.header}><div><span className={s.eyebrow}>HERB GARDEN · 百草</span><h1>百草园</h1><p>拆解产品为原料卡，用晨露培育，在妆园里点亮你的百草图鉴。</p></div><div className={s.balance}><ResourceArt/><span>可用晨露 <strong>{available}</strong></span></div></header>
  <nav className={s.steps} aria-label="花园玩法"><button aria-current={view==='discover'?'step':undefined} onClick={()=>setView('discover')}><span>01</span> 拆解产品</button><button aria-current={view==='grow'?'step':undefined} onClick={()=>setView('grow')}><span>02</span> 培育原料</button><button aria-current={view==='albums'?'step':undefined} onClick={()=>setView('albums')}><span>03</span> 产品图鉴</button></nav>
  {view!=='albums'&&<div className={s.selector}><label htmlFor="garden-product">当前产品</label><select id="garden-product" value={selected} onChange={e=>choose(e.target.value)}>{catalog.map(p=><option key={p.id} value={p.id}>{p.brand} · {p.name}</option>)}</select></div>}
  {view==='discover'&&<section className={s.discovery} aria-label="产品成分拆解台">
   <div className={s.product}><img src={product.image} alt={`${product.name} 官方包装图`}/><small>{product.brand}</small><h2>{product.name}</h2><span>{product.region}版</span></div>
   <div className={s.reveal}><span className={s.eyebrow}>一瓶产品 · {cards.length} 张原料卡</span><h2>认识这瓶的成分</h2><div className={s.preview}>{cards.map(i=><article key={i.id}><IngredientArt id={i.id}/><strong>{i.name}</strong><p className={s.description}>{ingredientStories[i.id].summary}</p><IngredientDetail id={i.id}/></article>)}</div><button className={s.primary} onClick={discover}>{collected?'继续培育这组原料':`拆解并收藏 ${cards.length} 张原料卡`}<ArrowRight size={18}/></button></div>
  </section>}
  {view==='grow'&&<section aria-label="原料培育区">
   <div className={s.growHead}><div><h2>{all?'全部原料':product.name}</h2><p>{all?`已发现 ${lab.discovered.length} / ${ingredients.length} 张`:`已成熟 ${grown} / ${recipe.length} 张 · 每张需要 1 滴晨露`}</p></div><button className={s.textButton} onClick={()=>setAll(!all)}>{all?'只看当前产品':'查看全部 20 张原料'}</button></div>
   <div className={s.dewHelp}>{!lab.welcomeClaimed?<><span><Droplets size={18}/> 先领晨露，再开始培育</span><button className={s.secondary} onClick={()=>{labAction({type:'welcome'});setMessage('已领取 2 滴新手晨露。');}}>领取新手晨露 · 2 滴</button></>:available===0?<><span>晨露用完了，完成一次美妆任务可获得 1 滴。</span><Link className={s.secondary} to={tasks.some(t=>!t.seriesPaused&&['pending','active','paused'].includes(t.status))?'/clock':'/inspiration'}>去完成任务 <ArrowRight size={16}/></Link></>:<span><Droplets size={18}/> 选择一张原料卡，把晨露送给它。</span>}</div>
   <div className={s.plots}>{(all?ingredients:cards).map(i=>{const known=lab.discovered.includes(i.id),mature=lab.cultivated.includes(i.id);return <article key={i.id} className={`${s.plot} ${mature?s.mature:''}`}><div className={s.art}><IngredientArt id={i.id}/>{mature&&<span className={s.check}><Check size={15}/></span>}</div><h3>{i.name}</h3><p className={s.description}>{ingredientStories[i.id].summary}</p><IngredientDetail id={i.id}/>{!known?<button className={s.secondary} onClick={()=>{const source=catalog.find(p=>ingredientRecipes[p.id].includes(i.id))!;choose(source.id);}}>去发现这张原料</button>:<button className={s.secondary} disabled={mature||available<1} onClick={()=>{labAction({type:'grow',ingredientId:i.id});setMessage(`${i.name}已成熟，消耗 1 滴晨露。`);}}>{mature?'已成熟':`培育${i.name} · 1 滴`}</button>}</article>})}</div>
   <div className={s.finish}><div><strong>{unlocked?'这本图鉴已点亮':grown===recipe.length?'原料齐了，点亮你的图鉴吧':`再培育 ${recipe.length-grown} 张，就能点亮图鉴`}</strong><progress aria-label="当前产品成熟进度" value={grown} max={recipe.length}/></div>{!collected?<button className={s.primary} onClick={()=>setView('discover')}>先去拆解产品</button>:<button className={s.primary} disabled={grown!==recipe.length||unlocked} onClick={compose}><Sparkles size={17}/>{unlocked?'已点亮图鉴':'点亮产品图鉴'}</button>}</div>
  </section>}
  {view==='albums'&&<section aria-label="产品图鉴收藏架"><div className={s.growHead}><div><h2>我的产品图鉴</h2><p>已点亮 {lab.albums.length} / {catalog.length} 本</p></div><Link className={s.textButton} to="/growth">装饰与成长 →</Link></div><div className={s.albums}>{catalog.map(p=>{const list=ingredientRecipes[p.id],count=list.filter(id=>lab.cultivated.includes(id)).length,lit=lab.albums.includes(p.id);return <article key={p.id}><div className={`${s.albumArt} ${lit?s.lit:''}`}><img src={p.image} alt=""/>{lit&&<span><Check size={16}/> 已点亮</span>}</div><small>{p.brand}</small><h3>{p.name}</h3><p>成熟原料 {count} / {list.length}</p><button className={s.secondary} disabled={lit} onClick={()=>{if(count===list.length){labAction({type:'compose',productId:p.id});setMessage(`${p.name}图鉴已点亮！`);}else{choose(p.id,list.every(id=>lab.discovered.includes(id))?'grow':'discover');}}}>{lit?'已收藏':count===list.length?'点亮这本图鉴':'继续探索'}</button></article>})}</div></section>}
  <p role="status" className={s.status}>{message}</p>
 </div>;
}

function IngredientDetail({id}:{id:string}){const card=ingredients.find(i=>i.id===id)!;const story=ingredientStories[id];return <details className={s.details}><summary>成分说明</summary><p>{story.detail}</p><small>{card.inci}</small><div className={s.sources}>{story.source&&<a href={story.source} target="_blank" rel="noreferrer">成分资料 ↗</a>}{catalog.filter(p=>ingredientRecipes[p.id].includes(id)).map(p=><a key={p.id} href={p.source} target="_blank" rel="noreferrer">{p.name} ↗</a>)}</div></details>}
