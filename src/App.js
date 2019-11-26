import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from './components/header/header.component'
import Auth from './pages/sign-in-and-sign-up/auth.componet'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import './App.css';

function App() {
  return (
    <div>
        <Header />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/signin" component={Auth} />
        </Switch>
    </div>
  );
}

export default App;
