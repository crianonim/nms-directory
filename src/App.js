import React, { useState } from "react";
import "./App.css";
import * as model from "./models/model";
import ItemDescription from "./ItemDescription";
import ItemList from './ItemList'
import ListFilter from "./ListFilter";

function App() {
  const { items } = model.list();
  
  const [activeList, setActiveList] = useState(items);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="App">
      <div className="list-panel">
       <ListFilter setActiveList={setActiveList} items={items} />
       <ItemList setActiveItem={setActiveItem} activeList={activeList} selectedItem={activeItem} />
      </div>
      <div className="item-info">
        {activeItem ? (
          <>
            <ItemDescription model={model} setActiveItem={setActiveItem}
              item={items.find(el => el.name === activeItem)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
