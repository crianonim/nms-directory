import React from 'react';
import Recipe from './Recipe';
import * as model from "./models/model";

export default ({item,setActiveItem})=>{
    
    return (
        <>
         <h1>{item.name}</h1>
        <h3>{item.name} ({item.abbreviation}) is {item.rarity} {item.category} worth {item.price}</h3>
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