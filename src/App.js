import React, { useState, useRef } from "react";
import "./App.css";
import * as model from "./models/model";
import ItemDescription from "./ItemDescription";
import ItemList from "./ItemList";
import ListFilter from "./ListFilter";

function App() {
  const { items } = model.list();

  const [activeList, setActiveList] = useState(items);
  const [activeItem, setActiveItem] = useState(null);
  const listPanel = useRef(null);
  return (
    <div className="App">
      <button
        onClick={() => {
          listPanel.current.classList.toggle("hidden-list");
        }}
>List</button>

      <main>
        <div className="list-panel" ref={listPanel}>
          <ListFilter setActiveList={setActiveList} items={items} />
          <ItemList
            setActiveItem={setActiveItem}
            activeList={activeList}
            selectedItem={activeItem}
          />
        </div>
        <div className="item-info">
          {activeItem ? (
            <>
              <ItemDescription
                model={model}
                setActiveItem={setActiveItem}
                item={items.find(el => el.name === activeItem)}
              />
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
