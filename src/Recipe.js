import React from 'react';

const Recipe = ({recipe,setActiveResource})=>{
    return (
        <div className="recipe">
             <span onClick={() => {
                              setActiveResource(recipe.result.name);
                            }}>{recipe.result.name} </span>
                                 ( {recipe.result.amount}) ={" "}
                        {recipe.ingredients.map(i => (
                          <span
                            key={i.name}
                            onClick={() => {
                              setActiveResource(i.name);
                            }}
                          >{`${i.name} (${i.amount}) `}</span>
                        ))}
        </div>
    )
}
export default Recipe;