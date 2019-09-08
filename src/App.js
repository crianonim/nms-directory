import React, { useState, useRef } from "react";
import "./App.css";
import * as model from "./models/model";
import ItemDescription from "./ItemDescription";
import ItemList from "./ItemList";
import ListFilter from "./ListFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
function App() {
  const { items } = model.list();

  const [activeList, setActiveList] = useState(items);
  const [activeItem, setActiveItem] = useState(null);
  const [isShowList, setIsShowList] = useState(true);
  return (
    <div className="App">
      <button
        onClick={() => {
          setIsShowList(!isShowList);
        }}
      >
        <FontAwesomeIcon icon={isShowList ? faCaretDown : faCaretRight} />
      </button>

      <main>
        {isShowList && (
          <div className="list-panel">
            <ListFilter setActiveList={setActiveList} items={items} />
            <ItemList
              setActiveItem={setActiveItem}
              activeList={activeList}
              selectedItem={activeItem}
            />
          </div>
        )}
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
