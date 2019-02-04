import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/styles.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import Search from './Search';
import Item from './Item';

const routing = (
  <BrowserRouter>
    <Switch>
        <Route exact path="/items/:id" component={Item} />
        <Route exact path="/items" component={Search} />
        <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
