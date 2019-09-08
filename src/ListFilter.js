import React, { useState } from "react";
import "./ListFilter.css";
import { getItemCategories } from './models/model'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
const categories=getItemCategories();
const filterByName=(items,name)=>{
  return items.filter(item=>item.name.toLowerCase().includes(name.toLowerCase()))
}
const ListFilter = ({ setActiveList, items }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter,setCategoryFilter] =useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showingCount,setShowingCount] = useState(items.length);
  const filterList = (name,category) => {
    const nameF=name!==null?name:nameFilter;
    setNameFilter(nameF);
    let list=items.filter(item =>item.name.toLowerCase().includes(name||nameF.toLowerCase()))
    const categoryF=category!==null?category:categoryFilter;
    setCategoryFilter(categoryF);
    if (categoryF && categoryF!=='All'){
      const categoryList=categories.find(el=>el[0]===categoryF)[1].map(el=>el.name)
      list=list.filter(item=>categoryList.includes(item.name))
    }
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
          <FontAwesomeIcon icon={showFilters ? faCaretRight : faCaretDown}/>
        </button>
        <input
          value={nameFilter}
          className="list-filter-input"
          onChange={({ target }) => {
            filterList(target.value,null);
          }}
        ></input>
        <button onClick={() => filterList("",null)}>x</button>
      </div>
     {showFilters &&  (<div className="other-filters">
        <div>
  Showing {showingCount} of {items.length}

        </div>
        <div className="category-dropdown">
        Category &nbsp;  
          <select onChange={(event)=>filterList(null,event.target.value)}>
            {['All',...categories.map(el=>el[0])].map(category=>(<option key={category}>{category}</option>))}
          </select>
        </div>
        <div className="sorting">Sort
          <select defaultValue={'None'} onChange={({target})=>{
            const {value}=target;
            if (value==="A->B"){
              items.sort();
            }
          }}>
            <option>A->B</option>
            <option>Worth</option>
            <option>None</option>
          </select>
        </div>
     </div>)}
    </div>
  );
};
export default ListFilter;
