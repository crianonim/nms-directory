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

      <div className="resource-info">
        {activeItem ? (
          <>
            <h1>{activeItem}</h1>
            <ItemDescription
              item={items.find(el => el.name === activeItem)}
            />

            {model.recipesThatProduceInRefiner(activeItem).length ? (
              <>
                <h2>Can be Produced in Refiner</h2>
                <ul>
                  {model
                    .recipesThatProduceInRefiner(activeItem)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                        <Recipe setActiveItem={setActiveItem} recipe={recipe}/>
                      </li>
                    ))}
                </ul>
              </>
            ) : null}
            {model.recipesThatUseIngredient(activeItem).length ? (
              <>
                <h2>Is used in Refiner</h2>
                <ul>
                  {model
                    .recipesThatUseIngredient(activeItem)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                       <Recipe setActiveItem={setActiveItem} recipe={recipe} selectedItem={activeItem}/>
                      </li>
                    ))}
                </ul>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
