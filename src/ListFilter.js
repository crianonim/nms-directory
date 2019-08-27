import React,{useState} from 'react';

const ListFilter = ({setActiveList,items})=>{
    const [nameFilter, setNameFilter] = useState("");
    return (
        <div className="list-filter">
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
        </div>
    )
}
export default ListFilter