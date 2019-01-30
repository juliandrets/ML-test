import React, { Component } from 'react';
import logo from '../../img/mercadolibre-logo.png';
import search from '../../img/search.png';
class Header extends Component {

  constructor(state) {
    super(state);
  }

  searchSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.json();
    this.setState({ results: body });
  };

  render() {
    return(
      <header>
        <section className="content">
          <img src={logo} className="logo" alt="logo" />
          <form id="search" onSubmit={this.searchSubmit} method="GET">
            <input type="text" name="q"
              onChange={e => this.setState({ post: e.target.value })}
              placeholder="Nunca dejes de buscar"
              value={this.state.post}
            />
            <button type="submit"><img src={search} /></button>
          </form>
        </section>
      </header>
    )
  }
}
export default Header;
