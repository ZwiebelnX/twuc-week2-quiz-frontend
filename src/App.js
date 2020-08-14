import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import ShopHeader from "./components/header/ShopHeader";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ItemList from "./components/item/ItemList";
import AddItem from "./components/add/AddItem";
const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header>
              <ShopHeader />
          </Header>

          <Switch>
              <Route path='/cart'></Route>
              <Route path='/add'><AddItem /></Route>
              <Route><ItemList /></Route>
          </Switch>
      </BrowserRouter>
      <Content />
    </div>
  );
}

export default App;
