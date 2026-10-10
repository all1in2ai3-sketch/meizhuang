import {describe,it,expect} from 'vitest';
import {createDemoPlan,totalMinutes,shortenPlan,validatePlan,completeTask,type Task} from '../src/domain';
const owned=[{productId:'fit-me',shade:'已确认',opened:'',note:''},{productId:'colour-riche',shade:'已确认',opened:'',note:''}];
const task=():Task=>({id:'task-a',plan:createDemoPlan(owned,10,'有精神'),due:new Date().toISOString(),step:1,status:'active'});
describe('plan boundaries',()=>{
 it('only references products actually owned',()=>{const p=createDemoPlan(owned,10,'有精神');expect(p.steps.filter(s=>s.productId).map(s=>s.productId)).toEqual(['fit-me','colour-riche']);});
 it.each([3,4,5,6,7,10,20])('respects a %i-minute budget without speeding up steps',budget=>{const p=createDemoPlan(owned,budget,'温柔');expect(totalMinutes(p)).toBeLessThanOrEqual(budget);expect(p.steps.filter(s=>!s.optional)).toHaveLength(2);});
 it('does not invent products for an empty cabinet',()=>expect(createDemoPlan([],10,'正式').steps.every(s=>s.productId===null)).toBe(true));
 it('preserves completed steps when shortening',()=>{const t=task();t.step=2;const p=shortenPlan(t,1)!;expect(p.steps.slice(0,2)).toEqual(t.plan.steps.slice(0,2));expect(p.steps.slice(2).reduce((n,s)=>n+s.minutes,0)).toBe(1);});
 it('refuses to compress mandatory steps',()=>{const t=task();t.step=0;expect(shortenPlan(t,1)).toBeNull();});
 it('rejects hallucinated products',()=>{const p=createDemoPlan(owned,10,'正式');p.steps[0].productId='fake';expect(()=>validatePlan(p,owned.map(o=>o.productId),10)).toThrow('未确认');});
 it('rejects duplicate step identifiers',()=>{const p=createDemoPlan([],10,'正式');p.steps[1].id=p.steps[0].id;expect(()=>validatePlan(p,[],10)).toThrow('重复');});
 it('rejects over-budget AI output',()=>expect(()=>validatePlan(createDemoPlan(owned,10,'正式'),owned.map(o=>o.productId),3)).toThrow('预算'));
 it('completion is idempotent',()=>{const t=completeTask(task(),'满意');expect(completeTask(t,'重复')).toBe(t);expect(t.feedback).toBe('满意');});
});

// Makeup variations must change executable content, not just titles.
describe('makeup usefulness',()=>{
 it('varies instructions by style',()=>{
  const soft=createDemoPlan(owned,10,'温柔'),formal=createDemoPlan(owned,10,'正式');
  expect(soft.steps.find(s=>s.productId==='colour-riche')?.instruction).not.toBe(formal.steps.find(s=>s.productId==='colour-riche')?.instruction);
  expect(formal.steps.find(s=>s.productId==='colour-riche')?.check).toContain('唇缘');
 });
 it('excludes a category explicitly declined in the request',()=>{
  const p=createDemoPlan(owned,10,'正式',undefined,{request:'去面试，不要涂口红'});
  expect(p.steps.some(s=>s.productId==='colour-riche')).toBe(false);expect(p.brief?.occasion).toBe('面试');
 });
 it('three minute option includes a genuinely smaller lip routine',()=>{
  const p=createDemoPlan(owned,3,'有精神');expect(totalMinutes(p)).toBe(3);expect(p.steps.some(s=>s.productId==='colour-riche')).toBe(true);expect(p.steps.some(s=>s.productId==='fit-me')).toBe(false);
 });
 it('explicit base priority wins a constrained budget',()=>{
  const p=createDemoPlan(owned,5,'有精神',undefined,{focus:'base'});expect(p.steps.some(s=>s.productId==='fit-me')).toBe(true);expect(p.steps.some(s=>s.productId==='colour-riche')).toBe(false);
 });
 it('empty cabinet is honestly a practical departure checklist',()=>{
  const p=createDemoPlan([],10,'有精神');expect(p.title).toContain('状态整理');expect(p.steps[0].instruction).toContain('整理头发和衣领');expect(p.steps.every(s=>Boolean(s.check))).toBe(true);
 });
 it('brief and checkpoints survive validation for storage',()=>{
  const p=createDemoPlan(owned,10,'正式');const parsed=validatePlan(p,owned.map(p=>p.productId),10);expect(parsed.brief).toEqual(p.brief);expect(parsed.steps[1].check).toBeTruthy();
 });
});
