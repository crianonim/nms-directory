import {resources} from './data/resources';
import {refiner} from './data/refiner';

const craftables=[
    "Glass","Nanite Clusters","Di-hydrogen Jelly","Viscous Fluid"
]



export const list=()=>{
    return { items ,refiner,craftables}
}

let items=[...resources]


export const recipesThatProduceInRefiner=(name)=>{
    return refiner.filter(recipe=>recipe.result.name===name)
}

export const recipesThatUseIngredient=(name)=>{
    return refiner.filter(recipe=>recipe.ingredients.some(ing=>ing.name===name))
}

const fillMissingWithEmptyData=()=>{

    let thingsMissing=[];
    const itemNames=items.map(item=>item.name)
    const addIfMissing=(name)=>{
        if (!thingsMissing.includes(name) && !itemNames.includes(name)){
            thingsMissing.push(name)
        }
    }
    refiner.forEach(recipe=>{
        addIfMissing(recipe.result.name);
        recipe.ingredients.forEach(ing=>{
            addIfMissing(ing.name)
        })
    })

    thingsMissing=thingsMissing.map(thing=>({
        name:thing,
        price:-1,
        category:'Unknown',
        rarity:"Unknown"
    }))
    console.log(thingsMissing)
    return thingsMissing
}

items= [...items,...fillMissingWithEmptyData()]