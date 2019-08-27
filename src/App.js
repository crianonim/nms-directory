import React, { useState } from "react";
import "./App.css";
import * as model from "./models/model";
import ItemDescription from "./ItemDescription";
import Recipe from "./Recipe";
import ItemList from './ItemList'

function App() {
  const { items } = model.list();
  const [nameFilter, setNameFilter] = useState("");
  const [activeList, setActiveList] = useState(items);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="App">
      <div className="list-panel">
        <input
          value={nameFilter}
          onChange={({ target }) => {
            setNameFilter(target.value);
            setActiveList(
              items.filter(item =>
                item.name.toLowerCase().includes(target.value.toLowerCase())
              )
            );
          }}
        ></input>
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
