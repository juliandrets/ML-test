import React, { Component } from 'react';
import logo from './img/mercadolibre-logo.png';
import search from './img/search.png';
class App extends Component {

render() {
    return (
      <div className="App">
        <header>
          <section className="content">
            <img src={logo} className="logo" alt="logo" />
            <form id="search" action="/search" method="GET">
              <input type="text" name="product" placeholder="Buscar productos, marcas y más..." />
              <button type="submit"><img src={search} /></button>
            </form>
          </section>
        </header>

        <main>

        </main>
      </div>
    );
  }
}
export default App;
