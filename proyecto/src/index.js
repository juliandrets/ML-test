import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/styles.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Search from './Search';
import Item from './Item';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/search" component={Search} />
      <Route path="/items/:id" component={Item} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
