import {describe,it,expect} from 'vitest';
import {scheduleDates,routinePlan,calendarFile} from '../src/features';
import {products} from '../src/products';
import {ingredients,ingredientRecipes} from '../src/ingredients';
describe('extended features',()=>{
 it('schedules working days without weekends or duplicate instants',()=>{const dates=scheduleDates('2026-10-02T08:00',4,'工作日');expect(dates).toHaveLength(4);expect(dates.map(d=>new Date(d).getDay())).toEqual([5,1,2,3]);expect(new Set(dates).size).toBe(4);});
 it('validates schedule and caps count',()=>{expect(()=>scheduleDates('invalid',7,'每天')).toThrow();expect(scheduleDates('2026-10-04T08:00',100,'每天')).toHaveLength(30);expect(scheduleDates('2026-10-04T08:00',7,'单次')).toHaveLength(1);});
 it('uses only owned products in morning and evening order',()=>{const owned=products.map(p=>({productId:p.id,shade:'',opened:'',note:''}));const am=routinePlan('晨间护肤',owned,products);expect(am.steps.flatMap(x=>x.productId?[x.productId]:[])).toEqual(['cerave-cleanser','lp-light','lp-uv']);expect(routinePlan('晚间修护',owned,products).steps.some(s=>s.productId==='lp-uv')).toBe(false);expect(routinePlan('产品提醒',owned,products).steps.every(s=>s.productId===null)).toBe(true);});
 it('exports calendar text with escaped line breaks',()=>{const plan=routinePlan('晨间护肤',[],products);const ics=calendarFile([{id:'a',plan:{...plan,title:'test\nBEGIN:EVIL'},due:'2026-10-04T08:00:00Z',status:'pending',step:0}]);expect(ics).toContain('test\\nBEGIN:EVIL');expect(ics).toContain('DTSTART:20261004T080000Z');});
 it('provides 20 unique cards and six source-linked recipes',()=>{expect(ingredients).toHaveLength(20);expect(new Set(ingredients.map(i=>i.id)).size).toBe(20);expect(Object.keys(ingredientRecipes)).toHaveLength(6);for(const [id,cards] of Object.entries(ingredientRecipes)){expect(products.find(p=>p.id===id)?.source).toMatch(/^https:/);for(const card of cards)expect(ingredients.some(i=>i.id===card)).toBe(true);}});
});
