import React from 'react';

const Recipe = ({recipe,setActiveItem,selectedItem})=>{
    return (
        <div className="recipe">
             <span className={selectedItem===recipe.name?"selected-item":""} onClick={() => {
                              setActiveItem(recipe.result.name);
                            }}>{recipe.result.name} </span>
                                 ( {recipe.result.amount}) ={" "}
                        {recipe.ingredients.map(i => (
                          <span
                            key={i.name}
                            onClick={() => {
                              setActiveItem(i.name);
                            }}
                          ><span className={selectedItem===i.name?"selected-item":""}> {i.name}</span> {i.amount} </span>
                        ))}
        </div>
    )
}
export default Recipe;