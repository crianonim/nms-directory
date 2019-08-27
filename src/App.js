import React, { useState } from "react";
import "./App.css";
import * as model from "./models/model";
import ResourceDescription from "./ResourceDescription";
import Recipe from "./Recipe";
import ItemList from './ItemList'

function App() {
  const { resources, refiner } = model.list();
  const [nameFilter, setNameFilter] = useState("");
  const [activeList, setActiveList] = useState(resources);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="App">
      <div className="resources-list">
        <input
          value={nameFilter}
          onChange={({ target }) => {
            setNameFilter(target.value);
            setActiveList(
              resources.filter(resource =>
                resource.name.toLowerCase().includes(target.value.toLowerCase())
              )
            );
          }}
        ></input>
       <ItemList setActiveResource={setActiveItem} activeList={activeList} selectedItem={activeItem} />
      </div>

      <div className="resource-info">
        {activeItem ? (
          <>
            <h1>{activeItem}</h1>
            <ResourceDescription
              resource={resources.find(el => el.name === activeItem)}
            />

            {model.recipesThatProduceInRefiner(activeItem).length ? (
              <>
                <h2>Can be Produced in Refiner</h2>
                <ul>
                  {model
                    .recipesThatProduceInRefiner(activeItem)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                        <Recipe setActiveResource={setActiveItem} recipe={recipe}/>
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
                       <Recipe setActiveResource={setActiveItem} recipe={recipe} selectedItem={activeItem}/>
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
