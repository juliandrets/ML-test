import React, { Component } from 'react';
import logo from '../../img/mercadolibre-logo.png';
import search from '../../img/search.png';
class Header extends Component {

  render() {
    return(
        <header>
          <section className="content">
            <a href="/"><img src={logo} className="logo" alt="logo" /></a>
            <form id="search" action="/items" method="GET">
              <input type="text" name="search" placeholder="Nunca dejes de buscar"/>
              <button type="submit"><img src={search} alt="search button" /></button>
            </form>
          </section>
        </header>
    )
  }
}
export default Header;
