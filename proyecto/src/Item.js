import React, { Component } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import Header from './components/struct/Header';

class Item extends Component {
  state = {
    response: '',
    post: '',
    results: '',
    description: '',
    breadcrumbs: '',
    category: '',
  }

  componentDidMount() {
      // get product
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
            this.setState({ category: json.category_id });
          });
        }
      })
      .then(response => {
        // get category for breadcrumbs
        fetch('/api/categories/' + this.state.category, {
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
  }

  // Get item condition (new or used)
  getItemCondition(item) {
    if (item) {
      for(var i=0; i < item.attributes.length; i++) {
        if (item.attributes[i].id === "ITEM_CONDITION") {
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
          breadcrumbs.push(<Breadcrumbs key={i} data={item.path_from_root[i].name}></Breadcrumbs>);
      }
      return breadcrumbs;
    }
  }

  render() {
    const product = this.state.results;
    const price = product.price ? product.price.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) : 0;
    const description = this.state.description;
    const itemCondition = this.getItemCondition(product);
    const picture = this.getFirstPicture(product);
    const breadcrumbs = this.setBreadcumbs(this.state.breadcrumbs)

    return (
      <div className="Product">
        <Header />

        <main>
          <ul id="breadcrumbs">{breadcrumbs}</ul>

          <article id='product'>
            <section id="primaryInfo">
              <figure>
                <img src={picture} alt={product.title}/>
              </figure>
              <section>
                <h4>{itemCondition} - {product.sold_quantity} vendidos</h4>
                <h2>{product.title}</h2>
                <h3>${price}</h3>
                <button className="btn">Comprar</button>
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
