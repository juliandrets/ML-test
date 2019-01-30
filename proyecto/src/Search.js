import React, { Component } from 'react';
import logo from './img/mercadolibre-logo.png';
import search from './img/search.png';
import SearchItem from './components/SearchItem';
import Breadcrumbs from './components/Breadcrumbs';

class Search extends Component {
  state = {
    response: '',
    post: '',
    results: ''
  }

  searchSubmit = async e => {
    e.preventDefault();
    const search = this.state.post;
    console.log(search)
    const response = await fetch('/api/search/' + this.state.post, {
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
    const products = Array.from(this.state.results);

    return (
      <div className="Search">
        <header>
          <section className="content">
            <img src={logo} className="logo" alt="logo" />
            <form id="search" onSubmit={this.searchSubmit} method="GET">
              <input type="text" id="q"
                onChange={e => this.setState({ post: e.target.value })}
                placeholder="Nunca dejes de buscar"
                value={this.state.post}
              />
              <button type="submit"><img src={search} /></button>
            </form>
          </section>
        </header>

        <main>
          <Breadcrumbs />

          <ul id="results">
            {
              products.map((product) => {
                return <SearchItem {...product} key={product.id} />
              })
            }
          </ul>
        </main>

      </div>
    );
  }
}
export default Search;
