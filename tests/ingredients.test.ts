import {describe,it,expect} from 'vitest';
import {emptyLab,evolveLab,dewBalance} from '../src/ingredients';
describe('ingredient garden',()=>{
 it('requires discovery and available dew before growing',()=>{
  expect(evolveLab(emptyLab,{type:'grow',ingredientId:'ceramides'},5)).toEqual(emptyLab);
  const found=evolveLab(emptyLab,{type:'discover',productId:'cerave-cleanser'},0);
  expect(evolveLab(found,{type:'grow',ingredientId:'ceramides'},0)).toEqual(found);
 });
 it('grants welcome dew once and prevents duplicate spending',()=>{
  let lab=evolveLab(emptyLab,{type:'welcome'},0);
  lab=evolveLab(lab,{type:'welcome'},0);expect(dewBalance(lab,0)).toBe(2);
  lab=evolveLab(lab,{type:'discover',productId:'cerave-cleanser'},0);
  lab=evolveLab(lab,{type:'grow',ingredientId:'ceramides'},0);
  expect(evolveLab(lab,{type:'grow',ingredientId:'ceramides'},0)).toEqual(lab);expect(dewBalance(lab,0)).toBe(1);
 });
 it('unlocks a product only after all its cards mature, once',()=>{
  let lab=evolveLab(emptyLab,{type:'discover',productId:'cerave-cleanser'},5);
  expect(evolveLab(lab,{type:'compose',productId:'cerave-cleanser'},2).albums).toEqual([]);
  for(const ingredientId of lab.discovered)lab=evolveLab(lab,{type:'grow',ingredientId},5);
  lab=evolveLab(lab,{type:'compose',productId:'cerave-cleanser'},2);
  expect(evolveLab(lab,{type:'compose',productId:'cerave-cleanser'},2).albums).toEqual(['cerave-cleanser']);
  expect(dewBalance(lab,5)).toBe(0);expect(dewBalance(lab,6)).toBe(1);
 });
 it('rejects unknown ingredients and unsupported product recipes',()=>{
  expect(evolveLab(emptyLab,{type:'discover',productId:'custom-invented'},5)).toEqual(emptyLab);
  expect(evolveLab(emptyLab,{type:'grow',ingredientId:'fake'},5)).toEqual(emptyLab);
 });
 it('repeated discovery deduplicates and does not award dew',()=>{
  let lab=evolveLab(emptyLab,{type:'discover',productId:'fit-me'},0);
  lab=evolveLab(lab,{type:'discover',productId:'fit-me'},0);
  expect(lab.discovered).toHaveLength(3);expect(dewBalance(lab,0)).toBe(0);
 });
});
