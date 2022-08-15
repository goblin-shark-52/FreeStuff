import React, { Component, useState } from 'react';
import Sidebar from './Sidebar';
import './app.scss';

// State: Posts - derived from call to server OR mocked
    //const [state, setState] = useState(initialState);
       //states for each tag category initialized here;

// Props: none. Passes props to Sidebar and Posts container

// Logic: call to server to get posts

// Render: header/nav bar, sidebar component, posts container component, 
  // footer

function App() {

    return (
    <div className='App'>
      <div className="App__header">header!!!!!</div>
      <div className="App__content">
        <Sidebar/>
      </div>
      <div className="App__footer">
        footer
      </div>
    </div>
    );
}


export default App;
