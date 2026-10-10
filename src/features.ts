import type {Plan,Task,Owned} from './domain';
import type {Product} from './products';
export type RoutineKind='晨间护肤'|'晚间修护'|'妆容练习'|'运动后补妆'|'产品提醒'|'音乐灵感';
export const routineKinds:RoutineKind[]=['晨间护肤','晚间修护','妆容练习','运动后补妆','产品提醒','音乐灵感'];
export function routinePlan(kind:RoutineKind,owned:Owned[],catalog:Product[]):Plan{
 const categories=kind==='晨间护肤'?['洁面','保湿','防晒']:kind==='晚间修护'?['洁面','保湿']:['底妆','唇妆'];
 const selected=categories.map(c=>catalog.find(p=>p.category===c&&owned.some(o=>o.productId===p.id))).filter((p):p is Product=>!!p);
 const steps:Plan['steps']=[{id:'prepare',title:kind==='产品提醒'?'检查产品与记录':'准备与确认',instruction:kind==='产品提醒'?'核对实际用量和包装日期，按需要更新展柜记录。预计用完日期由你填写，不代表产品过期。':'清洁双手，按顺序摆好产品。若有不适，请暂停使用。',minutes:1,productId:null,optional:false}];
 if(kind!=='产品提醒')selected.forEach(p=>steps.push({id:p.id,title:`${p.category} · ${p.name}`,instruction:p.directions,minutes:p.category==='底妆'?3:2,productId:p.id,optional:p.category!=='防晒'}));
 steps.push({id:'review',title:'确认舒适度与感受',instruction:'感受是否舒适、是否符合这次的目标；需要时调整方案。',minutes:1,productId:null,optional:false});
 return {id:crypto.randomUUID(),title:kind,reason:`按已确认产品的使用资料安排。${selected.length?'优先使用手边产品。':'尚无相应产品，本次只安排准备与确认，请先补充展柜。'}此为本地预设例程。`,mode:'demo',steps};
}
export function scheduleDates(start:string,count:number,repeat:'每天'|'工作日'|'每周'|'单次'):string[]{
 const date=new Date(start);if(!Number.isFinite(date.getTime()))throw Error('提醒时间无效');
 const result:string[]=[];for(let i=0;result.length<Math.min(30,Math.max(1,count))&&i<220;i++){
  if(repeat!=='工作日'||![0,6].includes(date.getDay()))result.push(date.toISOString());
  if(repeat==='单次')break;date.setDate(date.getDate()+(repeat==='每周'?7:1));
 }return result;
}
export function calendarFile(tasks:Task[]):string{
 const escape=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
 const stamp=(s:string)=>new Date(s).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Beauty Alarm//ZH',...tasks.filter(t=>t.status==='pending').flatMap(t=>['BEGIN:VEVENT',`UID:${t.id}@beautyalarm.local`,`DTSTAMP:${stamp(new Date().toISOString())}`,`DTSTART:${stamp(t.due)}`,`SUMMARY:${escape(t.plan.title)}`,'END:VEVENT']),'END:VCALENDAR'].join('\r\n');
}
export function downloadText(name:string,text:string,type='text/plain'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export const taskMaterial=(kind?:string)=>kind==='晚间修护'?'夜光露':kind==='妆容练习'?'色彩花瓣':kind==='运动后补妆'?'场景果实':'晨露';
