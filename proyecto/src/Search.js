import React, { Component } from 'react';
import SearchItem from './components/SearchItem';
import Header from './components/struct/Header';
import queryString from 'query-string';

class Search extends Component {
  state = {
    response: '',
    post: '',
    results: ''
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    fetch('/api/search/' + values.search, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({ results: json });
        });
      }
    });
  }

  render() {
    const products = Array.from(this.state.results);

    return (
      <div className="Search">
        <Header />

        <main>
          <ul id="breadcrumbs"></ul>

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
