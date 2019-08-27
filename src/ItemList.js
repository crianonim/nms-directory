import React from 'react';

const ItemList = ({activeList,setActiveResource,selectedItem})=>{
    return (
        <div className="item-list">
             <ul>
          {activeList.map((resource,i) => (
            <li
              onClick={() => setActiveResource(resource.Name)}
              key={resource.Name+i}
            >
              <span className={selectedItem===resource.Name?"selected-item":selectedItem}>{resource.Name}</span>
            </li>
          ))}
        </ul>
        </div>
    )
}
export default ItemList;