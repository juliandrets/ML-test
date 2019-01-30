import React, { Component } from 'react';
import ic_shipping from '../img/ic_shipping.png';
class SearchItem extends Component {
  render() {

    const id = this.props.id;
    const itemRoute = "./items/" + id + "/";
    const title = this.props.title;
    const price = this.props.price.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    const picture = this.props.thumbnail;
    const freeShipping = this.props.shipping.free_shipping;
    const addressState = this.props.address.state_name;

    return(
      <li>
        <article>
          <a href={itemRoute}>
            <figure>
              <img src={picture} />
            </figure>
          </a>
          <section className="info">
            <div>
                <h3>$ {price}</h3>
                <img src={ic_shipping} className="freeShipping" style={{ visibility: freeShipping ? 'visible' : 'hidden' }} />
                <h4>{addressState}</h4>
            </div>
            <h2>{title}</h2>
          </section>
        </article>
      </li>
    )
  }
}
export default SearchItem;
