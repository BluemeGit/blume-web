import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/index.tsx';
import Products from './pages/products/index.tsx';
import Product from './pages/products/[id]/index.tsx'
import Privacy from './pages/privacy/index.tsx';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />}/>
        <Route path='/products/:id' element={<Product />} />
        <Route path='/privacy' element={<Privacy />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
