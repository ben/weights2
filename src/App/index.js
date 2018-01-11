import React, { Component } from 'react';
import { Search } from '../Search';

class App extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }

  setSearch = search => {
    this.setState({
      search
    })
  }

  render() {
    return (
      <div className="container">
        <section className="header">
          <h1>Weights</h1>
        </section>
        <Search text={this.state.search} onChange={this.setSearch} />
        (search results)
      </div>
    )
  }
}

export default App;
