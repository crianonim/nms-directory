import React from 'react';

const ItemList = ({activeList,setActiveResource,selectedItem})=>{
    return (
        <div className="item-list">
             <ul>
          {activeList.map((resource,i) => (
            <li
              onClick={() => setActiveResource(resource.name)}
              key={resource.name+i}
            >
              <span className={selectedItem===resource.name?"selected-item":selectedItem}>{resource.name}</span>
            </li>
          ))}
        </ul>
        </div>
    )
}
export default ItemList;