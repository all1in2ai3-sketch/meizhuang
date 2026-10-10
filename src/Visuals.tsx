import {ingredients} from './ingredients';
import './visuals.css';
import './manor-visuals.css';

export function IngredientArt({id}:{id:string}){const index=Math.max(0,ingredients.findIndex(i=>i.id===id));return <span aria-hidden="true" className="ingredient-art" style={{backgroundPosition:`${index%5*25}% ${Math.floor(index/5)*100/3}%`}}/>;}
export function ResourceArt({index=0}:{index?:number}){return <span aria-hidden="true" className="resource-art" style={{backgroundPosition:`${index%3*50}% ${Math.floor(index/3)===0?12.5:80}%`}}/>;}
