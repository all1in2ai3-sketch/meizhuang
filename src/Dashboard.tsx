import {Link} from 'react-router-dom';
import {ArrowRight,Clock3,Check,Droplets,Package,ScrollText,Sparkles,Flower2,SunMedium,Leaf} from 'lucide-react';
import {useStore} from './store';
import {dewBalance,gardenHref} from './ingredients';
import {products as officialProducts} from './products';
import {totalMinutes} from './domain';
import {ResourceArt,IngredientArt} from './Visuals';
import {QuickTaskActions} from './Assist';
import {TodayContext} from './ContextPage';
import ProductAlerts from './ProductAlerts';
import s from './Dashboard.module.css';

export default function Dashboard(){
 const {profile,tasks,owned,rewards,lab,customProducts}=useStore();
 const products=[...officialProducts,...customProducts];
 const next=tasks.filter(t=>!t.seriesPaused&&['pending','active','paused'].includes(t.status)).sort((a,b)=>Date.parse(a.due)-Date.parse(b.due))[0];
 const balance=dewBalance(lab,rewards.length);
 const destination=next?`/task/${next.id}`:owned.length?'/inspiration':'/cabinet';
 const steps=[
  {title:'收藏第一瓶',detail:'把手边好物放进藏妆阁',to:'/cabinet',done:owned.length>0},
  {title:'写下今日妆笺',detail:'按场合与时间安排步骤',to:'/inspiration',done:tasks.length>0},
  {title:'完成晨昏仪式',detail:'完成一次指导，收获晨露',to:'/clock',done:rewards.length>0},
  {title:'点亮百草图鉴',detail:'培育成分，解锁庄园故事',to:'/ingredients',done:lab.albums.length>0},
 ];
 const completed=steps.filter(step=>step.done).length;
 const progress=Math.round(completed/steps.length*100);
 const hour=new Date().getHours();
 const period=hour<6?'夜深':hour<11?'晨光':hour<17?'日和':hour<20?'晚霞':'月明';
 const ownedProducts=products.filter(p=>owned.some(o=>o.productId===p.id)).slice(0,3);

 return <div className={s.dashboard}>
  <header className={s.header}>
   <div><span className={s.kicker}>FLOWER DEW MANOR · 花露妆园</span><h1>{profile.name?`${profile.name}，`:''}今日也在妆园，照料自己。</h1></div>
   <Link to="/growth">查看庄园手账 <ArrowRight size={15}/></Link>
  </header>

  <section className={s.resourceBar} aria-label="庄园资源">
   <div><SunMedium size={19}/><span><small>当前时辰</small><strong>{period}</strong></span></div>
   <div><Droplets size={19}/><span><small>可用晨露</small><strong>{balance}</strong></span></div>
   <div><Package size={19}/><span><small>藏妆阁</small><strong>{owned.length} 件</strong></span></div>
   <div><Flower2 size={19}/><span><small>百草图鉴</small><strong>{lab.albums.length} / 6</strong></span></div>
   <div className={s.level}><span>妆园成长</span><div><i style={{width:`${progress}%`}}/></div><strong>{completed} / 4</strong></div>
  </section>

  <section className={s.manor} aria-labelledby="manor-title">
   <div className={s.manorVeil}/>
   <div className={s.manorCopy}>
    <span className={s.eyebrow}>{next?'今日妆事 · 待完成':'今日妆事 · 新的开始'}</span>
    <h2 id="manor-title">{next?next.plan.title:owned.length?'去梳妆亭，写一张今日妆笺':'从手边的一瓶开始布置妆园'}</h2>
    <p>{next?`${totalMinutes(next.plan)} 分钟 · ${new Date(next.due).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})} 提醒`:owned.length?`藏妆阁已有 ${owned.length} 件产品，可以开始组合今天的仪式。`:'收藏、搭配、完成步骤，让每一滴晨露都在百草园里生长。'}</p>
    <Link className={s.primary} to={destination}>{next?'继续今日仪式':owned.length?'写今日妆笺':'收藏第一瓶'}<ArrowRight size={18}/></Link>
   </div>
   <nav className={s.landmarks} aria-label="妆园地标">
    <Link className={s.vanity} to="/inspiration"><Sparkles size={17}/><span><strong>梳妆亭</strong><small>生成妆笺</small></span></Link>
    <Link className={s.cabinet} to="/cabinet"><Package size={17}/><span><strong>藏妆阁</strong><small>{owned.length?`${owned.length} 件收藏`:'等待布置'}</small></span></Link>
    <Link className={s.garden} to="/ingredients"><Leaf size={17}/><span><strong>百草园</strong><small>{lab.discovered.length} 张原料卡</small></span></Link>
   </nav>
   <div className={s.manorSeal} aria-hidden="true"><span>花</span><small>露妆园</small></div>
  </section>

  {next&&<QuickTaskActions id={next.id}/>} 

  <div className={s.contentGrid}>
   <section className={s.questPanel}>
    <div className={s.sectionHead}><div><span className={s.eyebrow}>TODAY'S JOURNEY</span><h2>今日妆园札记</h2></div><ScrollText size={22}/></div>
    <nav className={s.flow} aria-label="使用路线">{steps.map((step,index)=><Link key={step.to} to={step.to} className={step.done?s.done:''}><span className={s.number}>{step.done?<Check size={15}/>:index+1}</span><span><strong>{step.title}</strong><small>{step.detail}</small></span><ArrowRight size={15}/></Link>)}</nav>
   </section>

   <section className={s.collection}>
    <div className={s.collectionTop}><span className={s.eyebrow}>HERBARIUM</span><span className={s.dew}><ResourceArt/><strong>{balance}</strong> 晨露</span></div>
    <div className={s.collectionCopy}><IngredientArt id="amla"/><div><h2>百草园</h2><p>已发现 {lab.discovered.length} / 20 张原料卡<br/>已点亮 {lab.albums.length} / 6 本产品图鉴</p></div></div>
    <div className={s.gardenProgress}><span style={{width:`${Math.max(5,lab.discovered.length/20*100)}%`}}/></div>
    <Link className={s.secondary} to={gardenHref(lab)}>{lab.discovered.length?'继续培育':'拆解第一瓶'}<ArrowRight size={16}/></Link>
   </section>
  </div>

  {ownedProducts.length>0&&<section className={s.shelf}><div className={s.sectionHead}><div><span className={s.eyebrow}>BEAUTY CABINET</span><h2>藏妆阁今日陈列</h2></div><Link to="/cabinet">管理藏妆阁 <ArrowRight size={15}/></Link></div><div className={s.products}>{ownedProducts.map(p=><Link key={p.id} to={`/cabinet?product=${p.id}`}><span className={s.productFrame}><img src={p.image||'/assets/cream-editorial.png'} alt=""/></span><span><small>{p.brand}</small><strong>{p.name}</strong></span></Link>)}</div></section>}

  <details className={s.tools}><summary><Clock3 size={17}/><span><strong>晨昏提醒</strong><small>展开查看日程与产品提醒</small></span></summary><div className={s.toolsBody}><TodayContext/><ProductAlerts/></div></details>
 </div>
}
