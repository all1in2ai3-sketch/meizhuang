import { z } from 'zod';
import { products,type Product } from './products';
import {looks,makeupBrief,type MakeupOptions} from './makeup';
export const StepSchema=z.object({id:z.string().min(1),title:z.string().min(1),instruction:z.string().min(1),minutes:z.number().int().min(1).max(30),productId:z.string().nullable(),optional:z.boolean(),check:z.string().optional(),focus:z.enum(['base','lip','prepare','finish']).optional()});
export const PlanSchema=z.object({id:z.string().min(1),title:z.string().min(1),reason:z.string().min(1),mode:z.enum(['demo','live']),steps:z.array(StepSchema).min(1).max(10),brief:z.object({mood:z.string(),occasion:z.string(),focus:z.enum(['balanced','base','lip']),avoid:z.string(),noLip:z.boolean(),noBase:z.boolean()}).optional()});
export type Plan=z.infer<typeof PlanSchema>;
export type Step=z.infer<typeof StepSchema>;
export type Task={seriesId?:string;kind?:string;voiceUsed?:boolean;seriesPaused?:boolean;id:string;plan:Plan;due:string;status:'pending'|'active'|'paused'|'done'|'skipped';step:number;feedback?:string;completedAt?:string;notified?:boolean};
export type Owned={purchased?:string;estimatedEnd?:string;area?:string;order?:string;pao?:string;productId:string;shade:string;opened:string;note:string};
export function validatePlan(value:unknown,allowed:string[],budget:number):Plan {
 const p=PlanSchema.parse(value);
 if(new Set(p.steps.map(s=>s.id)).size!==p.steps.length) throw new Error('步骤标识重复');
 if(p.steps.some(s=>s.productId!==null&&!allowed.includes(s.productId))) throw new Error('方案引用了未确认的产品');
 if(p.steps.reduce((n,s)=>n+s.minutes,0)>budget)throw new Error('方案超出时间预算');
 return p;
}
export function createDemoPlan(owned:Owned[],budget:number,mood:string,catalog:Product[]=products,options:MakeupOptions={}):Plan {
 const selected=catalog.filter(p=>owned.some(o=>o.productId===p.id));
 const brief=makeupBrief(mood,options);const look=looks.find(l=>l.id===brief.mood)!;
 const base=brief.noBase?undefined:selected.find(p=>p.category==='底妆');
 const lips=brief.noLip?undefined:selected.find(p=>p.category==='唇妆');
 const steps:Step[]=[{id:'prepare',title:'准备好你的美妆台',instruction:'到光线均匀的位置，把镜子放稳。清洁双手，拿出本次要用的产品；先确认手边色号，再开始。',minutes:1,productId:null,optional:false,focus:'prepare',check:'产品、镜子和干净工具都在手边。'}];
 const choices:Step[]=[];
 if(base)choices.push({id:base.id,title:'轻薄底妆，保留自然肤感',instruction:base.directions+' '+look.base+'。'+(brief.avoid?'你希望避开「'+brief.avoid+'」，先完成一层再决定是否补充。':''),minutes:3,productId:base.id,optional:true,focus:'base',check:'检查鼻翼与脸侧有没有明显堆积或分界，先整理边缘。'});
 if(lips)choices.push({id:lips.id,title:'加一点你喜欢的唇色',instruction:lips.directions+' '+look.lip+'。'+(brief.focus==='lip'?'这次把唇色作为重点，涂完后先离镜查看，再决定是否补充。':'')+(budget<=3?'这次只做一层唇色，不增加其他步骤。':''),minutes:budget<=3?1:2,productId:lips.id,optional:true,focus:'lip',check:brief.mood==='正式'?'检查嘴角和唇缘是否整齐，合唇确认舒适。':'检查唇色是否均匀、边缘是否符合你想要的柔和程度。'});
 let remaining=budget-2;
 const priority=brief.focus==='lip'||brief.focus==='balanced'&&budget<7?[...choices].reverse():choices;
 const keep=new Set<string>();for(const step of priority){if(step.minutes<=remaining){keep.add(step.id);remaining-=step.minutes;}}
 steps.push(...choices.filter(step=>keep.has(step.id)));
 steps.push({id:'finish',title:'感受一下今天的自己',instruction:look.check+'。检查衣领、牙齿和嘴角是否沾到颜色，把需要携带的补妆产品放进包里。',minutes:1,productId:null,optional:false,focus:'finish',check:'整体效果符合你的目标，使用感受舒适；需要时返回上一步调整。'});
 const hasMakeup=steps.some(step=>step.productId);
 if(!hasMakeup){steps[0]={...steps[0],title:'整理出门前的状态',instruction:'走到光线均匀的镜子前，整理头发和衣领，检查嘴角与牙齿是否干净。已有妆容只做观察，不需要添加产品。',check:'头发、衣领和嘴角已整理好。'};steps[1]={...steps[1],instruction:'离镜子一步查看整体，确认随身物品。想继续完成妆容，可以先在展柜记录你的粉底或唇膏，再生成对应步骤。',check:'出门准备已完成；妆容产品可以之后再添加。'};}
 return {id:crypto.randomUUID(),title:hasMakeup?`${look.name} · ${brief.occasion}妆容`:'出门前 · 两分钟状态整理',reason:hasMakeup?`${brief.occasion}场景，优先${brief.focus==='base'?'底妆均匀':brief.focus==='lip'?'唇色重点':'轻量完成'}。使用 ${steps.filter(s=>s.productId).length} 件已有产品，留出最后一分钟检查。`:'当前没有可纳入时间预算的彩妆步骤。这是一份出门整理清单；添加产品后，可生成对应的化妆指导。',mode:'demo',steps,brief};
}
export function shortenPlan(task:Task,minutes:number):Plan|null {
 const completed=task.plan.steps.slice(0,task.step);let remaining=task.plan.steps.slice(task.step);
 while(remaining.reduce((n,s)=>n+s.minutes,0)>minutes){const i=remaining.findIndex(s=>s.optional);if(i<0)return null;remaining=remaining.filter((_,j)=>j!==i);}
 return {...task.plan,steps:[...completed,...remaining]};
}
export function completeTask(task:Task,feedback:string):Task{return task.status==='done'?task:{...task,status:'done',feedback,completedAt:new Date().toISOString()};}
export const totalMinutes=(p:Plan)=>p.steps.reduce((n,s)=>n+s.minutes,0);
