import React from 'react';
import Recipe from './Recipe';
import * as model from "./models/model";

export default ({item,setActiveItem})=>{
    
    return (
        <>
         <img class="resource_image" alt={item.name} src={"img/"+item.name.replace(/\s/g,'_')+".png"}/>
         <h1>{item.name}</h1>
        <h3>{item.name} 
        {item.abbreviation? <span className="abbr"> ({item.abbreviation}) </span>:null}
         is <span className='rarity'> {item.rarity} </span> 
         <span className='category'> {item.category} </span> 
         {item.price?  <span className="price">worth {item.price} </span>:null}</h3>
         {item.usedFor && <h4>Used for {item.usedFor}</h4>}
        {model.recipesThatProduceInRefiner(item.name).length ? (
              <>
                <h2>Can be Produced in Refiner</h2>
                <ul>
                  {model
                    .recipesThatProduceInRefiner(item.name)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                        <Recipe setActiveItem={setActiveItem} recipe={recipe}/>
                      </li>
                    ))}
                </ul>
              </>
            ) : null}


        {model.recipesThatUseIngredient(item.name).length ? (
              <>
                <h2>Is used in Refiner</h2>
                <ul>
                  {model
                    .recipesThatUseIngredient(item.name)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                       <Recipe setActiveItem={setActiveItem} recipe={recipe} selectedItem={item.name}/>
                      </li>
                    ))}
                </ul>
              </>
            ) : null}
            {model.recipesThatCraft(item.name).length ? (
              <>
                <h2>Can be Crafted</h2>
                <ul>
                  {model
                    .recipesThatCraft(item.name)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                        <Recipe setActiveItem={setActiveItem} recipe={recipe}/>
                      </li>
                    ))}
                </ul>
              </>
            ) : null}


        {model.recipesThatUseInCrafting(item.name).length ? (
              <>
                <h2>Is used in Crafting</h2>
                <ul>
                  {model
                    .recipesThatUseInCrafting(item.name)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                       <Recipe setActiveItem={setActiveItem} recipe={recipe} selectedItem={item.name}/>
                      </li>
                    ))}
                </ul>
              </>
            ) : null}
        </>
    )
}