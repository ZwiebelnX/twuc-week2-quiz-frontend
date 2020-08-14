import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import ShopHeader from "./components/header/ShopHeader";
import {BrowserRouter} from "react-router-dom";
const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header>
              <ShopHeader />
          </Header>
      </BrowserRouter>
      <Content />
    </div>
  );
}

export default App;
