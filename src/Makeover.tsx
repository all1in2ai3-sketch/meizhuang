import {Link} from 'react-router-dom';
import {Check,ArrowRight,Clock3} from 'lucide-react';
import {looks} from './makeup';
import {type Plan,type Step,totalMinutes} from './domain';
import {useStore} from './store';
import {products} from './products';
import s from './Makeover.module.css';

export function LookChoices({mood,onChange}:{mood:string;onChange:(mood:string)=>void}){return <section className={s.chooser} aria-label="选择妆容方向"><div className={s.sectionHead}><h2>先选今天的妆感</h2><span>妆感示意</span></div><div className={s.looks}>{looks.map(l=><button key={l.id} aria-pressed={mood===l.id} onClick={()=>onChange(l.id)}><span className={s.portrait} style={{backgroundPosition:`${l.index*50}% center`}}/><span className={s.lookLabel}><strong>{l.name}</strong><small>{l.tag}</small>{mood===l.id&&<Check size={18}/>}</span></button>)}</div></section>}

export function LookResult({plan,onAdjust}:{plan:Plan;onAdjust:(kind:'soft'|'lip'|'quick')=>void}){
 const store=useStore();const catalog=[...products,...store.customProducts];const l=looks.find(l=>l.id===plan.brief?.mood)||looks[0];
 const used=catalog.filter(p=>plan.steps.some(step=>step.productId===p.id));
 return <div className={s.result}>
 {plan.brief&&used.length>0&&<div className={s.summary}><div className={s.resultPortrait} style={{backgroundPosition:`${l.index*50}% center`}} role="img" aria-label={`${l.name}妆感示意`}/><div><span className={s.eyebrow}>你的妆容重点</span><h3>{l.tag}</h3><p>{plan.brief.focus==='lip'?l.lip:plan.brief.focus==='base'?l.base:l.base+'；'+l.lip}</p>{plan.brief.avoid&&<p>避开 {plan.brief.avoid}。</p>}<span className={s.timing}><Clock3 size={16}/> {totalMinutes(plan)} 分钟 · {used.length} 件产品</span></div></div>}
 {!used.length&&<div className={s.empty}><h3>先让方案认识你的产品</h3><p>记录一支唇膏或一瓶粉底，就能获得对应的上妆步骤。现在也可以先完成下方的两分钟状态整理。</p>{plan.brief?.avoid&&<p>避开 {plan.brief.avoid}。</p>}<Link to="/cabinet">添加手边的彩妆 <ArrowRight size={17}/></Link></div>}
 {used.length>0&&<section className={s.products} aria-label="本次使用产品">{used.map(p=><Link key={p.id} to={`/cabinet?product=${p.id}`}><img src={p.image||'/assets/cream-editorial.png'} alt=""/><span><small>{p.brand}</small><strong>{p.name}</strong><span>{store.owned.find(o=>o.productId===p.id)?.shade||'色号未记录'}</span></span></Link>)}</section>}
 {plan.mode==='demo'&&used.length>0&&<div className={s.adjust}><span>想微调一下？</span><button onClick={()=>onAdjust('soft')}>更清淡一些</button><button onClick={()=>onAdjust('lip')}>突出唇色</button><button onClick={()=>onAdjust('quick')}>只留三分钟</button></div>}
 </div>
}

export function StepCoach({step}:{step:Step}){if(!step.check)return null;return <section className={s.coach} aria-label="本步检查重点"><div className={s.face} aria-hidden="true"><svg viewBox="0 0 120 140" fill="none"><path d="M28 52C22 17 98 17 92 52L87 91Q60 134 33 91Z" fill="#f2e0cf" stroke="#907b66" strokeWidth="1.5"/><path d="M27 52Q20 11 60 15Q100 12 94 54L80 33Q55 47 40 35Z" fill="#685348"/><path d="M39 61h12m19 0h12M60 65l-4 18h8" stroke="#685348" strokeWidth="2" strokeLinecap="round"/><path d="M47 98Q60 90 73 98Q60 109 47 98Z" fill={step.focus==='lip'?'#a85f6a':'#c3988e'}/>{step.focus==='base'&&<g fill="#c88770" opacity=".55"><ellipse cx="41" cy="80" rx="9" ry="6"/><ellipse cx="79" cy="80" rx="9" ry="6"/></g>}</svg></div><div><strong>做到这里就可以</strong><p>{step.check}</p></div></section>}
