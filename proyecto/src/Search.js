import React, { Component } from 'react';
import SearchItem from './components/SearchItem';
import Header from './components/struct/Header';
import Loader from './components/struct/Loader';
import Breadcrumbs from './components/Breadcrumbs';
import queryString from 'query-string';

class Search extends Component {
  state = {
    results: '',
    filters: '',
    pictures: '',
    loading: true
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    fetch('/api/search/' + values.search, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({ results: json.results });
          this.setState({ filters: json.filters });
          this.setState({ loading: false })

          // get ids from items
          const ids = json.results.map((item) => {
            return item.id
          });
          // get items pictures
          fetch('/api/pictures/' + ids, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
          ).then(response => {
            if (response.ok) {
              response.json().then(json => {
                this.setState({ pictures: json });
              });
            }
          });

        });
      }
    });
  }

  // Set breadcrumbs
  setBreadcumbs(filters) {
    if (filters[0]) {
      const breadcrumbs = [];
      const items = filters[0].values[0].path_from_root;
      
      for(var i=0; i < items.length; i++) {
        breadcrumbs.push(<Breadcrumbs key={i} data={items[i].name}></Breadcrumbs>);
      }
      return breadcrumbs;
    }
  }

  // Set hight quality pictures into items
  setPictures(products, pictures) {
    if (products && pictures) {
      products.map((product) => {
        pictures.map((picture) => {
          if (picture.body.id === product.id) {
             product.bestPicture = picture.body.pictures[0].url;
          }
        });
      });
    }
  }

  // second option
  /*setPictures(products, pictures) {
    if (products && pictures) {
      for (var i = 0; i < products.length; i++) {
        for (var e = 0; e < pictures.length; e++) {
          if (pictures[e].body.id === products[i].id) {
             products[i].bestPicture = pictures[e].body.pictures[0].url;
          }
        }
      }
    }
  }*/

  render() {
    const products = Array.from(this.state.results);
    const pictures = Array.from(this.state.pictures);
    const filters = Array.from(this.state.filters);
    const breadcrumbs = this.setBreadcumbs(filters)

    this.setPictures(products, pictures);

    let loader = this.state.loading ? <Loader /> : null

    return (
      <div className="Search">
        <Header />
        {loader}

        <main className="content">
          <ul id="breadcrumbs">{breadcrumbs}</ul>

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
