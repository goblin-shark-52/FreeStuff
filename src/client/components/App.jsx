import React, { Component, useState } from 'react';
import Sidebar from './Sidebar';
import './app.scss';
import PostsContainer from './PostsContainer';

// Render: header/nav bar, sidebar component, posts container component, 
  // footer

function App() {

    return (
    <div className='App'>
      <div className="App__header">free stuff</div>
      <div className="App__content">
        <Sidebar/>
        <PostsContainer/>
      </div>
      <div className="App__footer">
      </div>
    </div>
    );
}


export default App;
