import React from 'react';

export default ({resource})=>{
    
    return (
        <>
        <h3>{resource.name} ({resource.abbreviation}) is {resource.rarity} {resource.category} worth {resource.price}</h3>
            </>
    )
}