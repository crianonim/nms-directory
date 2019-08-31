import {resources} from './data/resources';
import {refiner} from './data/refiner';
import {crafting} from './data/crafting';

const craftables=[
    "Glass","Nanite Clusters","Di-hydrogen Jelly","Viscous Fluid"
]



export const list=()=>{
    return { items ,refiner,crafting,craftables}
}

let items=[...resources]


export const recipesThatProduceInRefiner=(name)=>{
    return refiner.filter(recipe=>recipe.result.name===name)
}

export const recipesThatUseIngredient=(name)=>{
    return refiner.filter(recipe=>recipe.ingredients.some(ing=>ing.name===name))
}

export const recipesThatCraft=(name)=>{
    return crafting.filter(recipe=>recipe.result.name===name)
}

export const recipesThatUseInCrafting=(name)=>{
    return crafting.filter(recipe=>recipe.ingredients.some(ing=>ing.name===name))
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
    crafting.forEach(recipe=>{
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
    console.log(thingsMissing.map(el=>el.name).join(','))
    return thingsMissing
}

export const updateStarred=()=>{
    const store=JSON.parse(localStorage.getItem('nms-starred-recipes')||"[]")
    refiner.forEach( (recipe,i)=>{
        recipe.starred=store.includes(i)
    })
}
export const toggleStarred=(id)=>{
    const store=JSON.parse(localStorage.getItem('nms-starred-recipes')||"[]")
    if (store.includes(id)){
        console.log({id},store.filter(el=>el!==id))
       localStorage.setItem("nms-starred-recipes", JSON.stringify(store.filter(el=>el!==id)))
    } else {
        localStorage.setItem("nms-starred-recipes",JSON.stringify(store.concat(id)));
    }
    updateStarred();
}

items= [...items,...fillMissingWithEmptyData()]


