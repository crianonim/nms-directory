import React, { useState } from "react";
import "./ListFilter.css";

const ListFilter = ({ setActiveList, items }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const filterList = newFilter => {
    setNameFilter(newFilter);
    setActiveList(
      items.filter(item =>
        item.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    );
  };
  return (
    <div className="list-filter">
      <button
        onClick={() => {
          setShowFilters(!showFilters);
        }}
      >
        {showFilters?'>':'v'}
      </button>
      <input
        value={nameFilter}
        className="list-filter-input"
        onChange={({ target }) => {
          filterList(target.value);
        }}
      ></input>
      <button onClick={() => filterList("")}>x</button>
    </div>
  );
};
export default ListFilter;
