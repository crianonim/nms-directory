import React from 'react';

const ItemList = ({activeList,setActiveItem,selectedItem})=>{
    return (
        <div className="item-list">
             <ul>
          {activeList.map((item,i) => (
            <li
              onClick={() => setActiveItem(item.name)}
              key={item.name+i}
            >
              <span className={selectedItem===item.name?"selected-item":selectedItem}>{item.name} <span className="price-color"> [{item.price}]</span> </span>
            </li>
          ))}
        </ul>
        </div>
    )
}
export default ItemList;