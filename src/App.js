import React from 'react';
import './App.css';
import {resources} from './models/resources'
function App() {
  return (
    <div className="App">
     <ul>
       {resources.map(resource=>
         (
            <li key={resource.Name}>
              {resource.Name}
            </li>           
         )
       )}
         
     </ul>
    </div>
  );
}

export default App;
