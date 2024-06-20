import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './component/main/main';
import office from './component/office/office'
import elect from './component/electronic/elect';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main}></Route>
        <Route path='/office' Component={office}></Route>
        <Route path='/elect' Component={elect}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;