import React, { Component } from 'react';
import Loading from 'react-loader-spinner'
class Loader extends Component {

  render() {
    return(
      <section className="loader">
        <Loading
           type="Oval"
           color="#b7baba"
           height="50"
           width="50"
        />
      </section>
    )
  }
}
export default Loader;
