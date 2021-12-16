import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './Components/Products/Products'
import IndvProduct from './Components/IndvProduct/IndvProduct';
import Checkout from './Components/Checkout/Checkout';
import Settings from './Components/Settings/Settings';
import Home from './Components/Home/Home'

export default (
    <Switch>
        <Route path='/product/:id' component={IndvProduct}/>
        <Route path='/products' component={Products}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/' component={Home}/>
    </Switch>
)