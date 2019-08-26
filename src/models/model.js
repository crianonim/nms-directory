import {resources} from './resources';
import {refiner} from './refiner';

const craftables=[
    "Glass","Nanite Clusters","Di-hydrogen Jelly","Viscous Fluid"
]

export const list=()=>{
   return {resources,refiner,craftables}
}

export const recipesThatProduceInRefiner=(name)=>{
    return refiner.filter(recipe=>recipe.result.name===name)
}

export const recipesThatUseIngredient=(name)=>{
    return refiner.filter(recipe=>recipe.ingredients.some(ing=>ing.name===name))
}