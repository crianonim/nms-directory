import React, { useState } from "react";
import "./App.css";
import * as model from "./models/model";
import ResourceDescription from "./ResourceDescription";
function App() {
  const { resources, refiner } = model.list();
  const [nameFilter, setNameFilter] = useState("");
  const [activeList, setActiveList] = useState(resources);
  const [activeResource, setActiveResource] = useState(null);
  return (
    <div className="App">
      <div className="resources-list">
        <input
          value={nameFilter}
          onChange={({ target }) => {
            setNameFilter(target.value);
            setActiveList(
              resources.filter(resource =>
                resource.Name.toLowerCase().includes(target.value.toLowerCase())
              )
            );
          }}
        ></input>
        <ul>
          {activeList.map(resource => (
            <li
              onClick={() => setActiveResource(resource.Name)}
              key={resource.Name}
            >
              {resource.Name}
            </li>
          ))}
        </ul>
      </div>

      <div className="resource-info">
        {activeResource ? (
          <>
            <h1>{activeResource}</h1>
            <ResourceDescription
              resource={resources.find(el => el.Name === activeResource)}
            />

            {model.recipesThatProduceInRefiner(activeResource).length ? (
              <>
                <h2>Can be Produced in Refiner</h2>
                <ul>
                  {model
                    .recipesThatProduceInRefiner(activeResource)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                        {recipe.result.amount} ={" "}
                        {recipe.ingredients
                          .map(i => `${i.name} (${i.amount}) `)
                          .join(" + ")}
                      </li>
                    ))}
                </ul>
              </>
            ) : null}
            {model.recipesThatUseIngredient(activeResource).length ? (
              <>
                <h2>Is used in Refiner</h2>
                <ul>
                  {model
                    .recipesThatUseIngredient(activeResource)
                    .map((recipe, i) => (
                      <li key={recipe.result.name + i}>
                        {recipe.result.name} {recipe.result.amount} ={" "}
                        {recipe.ingredients
                          .map(i => `${i.name} (${i.amount}) `)
                          .join(" + ")}
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
