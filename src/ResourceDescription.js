import React from 'react';

export default ({resource})=>{
    
    return (
        <>
        <h3>{resource.Name} ({resource.Abbrev}) is {resource.Rarity} {resource.Category} worth {resource.Price}</h3>
            </>
    )
}