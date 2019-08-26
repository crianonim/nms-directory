import React, { useState } from "react";
import "./App.css";
import { list } from "./models/model";
function App() {
  const {resources,refiner}=list()
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
            <li key={resource.Name}>{resource.Name}</li>
          ))}
        </ul>
      </div>

      <div className="resource-info">
        {}
      </div>
    </div>
  );
}

export default App;
