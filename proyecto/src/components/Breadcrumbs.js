import React, { Component } from 'react';
class Breadcrumbs extends Component {

  render() {
    const data = this.props.data;

    return(
      <li>{data} <span>></span> </li>
    )
  }
}
export default Breadcrumbs;
