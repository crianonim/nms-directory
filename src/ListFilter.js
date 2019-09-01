import React, { useState } from "react";
import "./ListFilter.css";

const ListFilter = ({ setActiveList, items }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showingCount,setShowingCount] = useState(items.length);
  const filterList = newFilter => {
    setNameFilter(newFilter);
    const list=items.filter(item =>
      item.name.toLowerCase().includes(newFilter.toLowerCase()))
    setActiveList(list);
    setShowingCount(list.length)
  };
  return (
    <div className="list-filter">
      <div className="name-filter">
        <button
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          {showFilters ? ">" : "v"}
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
      <div className="other-filters">
        <div>
  Showing {showingCount} of {items.length}}
        </div>
      </div>
    </div>
  );
};
export default ListFilter;
