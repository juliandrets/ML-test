import React, { Component } from 'react';
import logo from './img/mercadolibre-logo.png';
class Test extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/searssch');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/search', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  /*searchSubmit = async e => {
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
  };*/

  
render() {
    return (
      <div className="Test">


        <main>
          <ul id="breadcrumbs">
            <li></li>
          </ul>
        </main>

        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>

      </div>
    );
  }
}
export default Test;
