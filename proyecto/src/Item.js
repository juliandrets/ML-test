import React, { Component } from 'react';
import logo from './img/mercadolibre-logo.png';
import search from './img/search.png';
import Breadcrumbs from './components/Breadcrumbs';

class Item extends Component {
  state = {
    response: '',
    post: '',
    results: '',
    description: '',
    breadcrumbs: '',
  }

  searchSubmit = async e => {
    e.preventDefault();
    const search = this.state.post;
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

  componentDidMount() {
      // get product]
      fetch('/api/items/' + this.props.match.params.id, {
        method: 'GET',
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

      // get description
      fetch('/api/items/' + this.props.match.params.id + '/description', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
      ).then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({ description: json });
          });
        }
      });

      // get category for breadcrumbs
      fetch('/api/categories/MLA50085', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
      ).then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.setState({ breadcrumbs: json });
          });
        }
      });
  }

  // Get item condition (new or used)
  getItemCondition(item) {
    if (item) {
      for(var i=0; i < item.attributes.length; i++) {
        if (item.attributes[i].id == "ITEM_CONDITION") {
          return item.attributes[i].value_name;
        }
      }
    }
  }

  getFirstPicture(item) {
    if (item) {
      return item.pictures[0].secure_url;
    }
  }

  setBreadcumbs(item) {
    const breadcrumbs = [];
    if (item) {
      for(var i=0; i < item.path_from_root.length; i++) {
          breadcrumbs.push(item.path_from_root[i].name);
      }
      return breadcrumbs;
    }
  }

  render() {
    const product = this.state.results;
    const description = this.state.description;
    const itemCondition = this.getItemCondition(product);
    const picture = this.getFirstPicture(product);
    const breadcrumbs = this.setBreadcumbs(this.state.breadcrumbs)

    return (
      <div className="Product">
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
          <Breadcrumbs {... breadcrumbs} />

          <article id='product'>
            <section id="primaryInfo">
              <figure>
                <img src={picture} />
              </figure>
              <section>
                <h4>{itemCondition} - {product.sold_quantity} vendidos</h4>
                <h2>{product.title}</h2>
                <h3>${product.price}</h3>
              </section>
            </section>
            <section id="description">
              <h2>Descripción del producto</h2>
              <p>{description.plain_text}</p>
            </section>
          </article>

        </main>

      </div>
    );
  }
}
export default Item;
