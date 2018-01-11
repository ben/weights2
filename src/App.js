import React, { Component } from 'react';
import { Search } from './search';

class App extends Component {
  render() {
    return (
      <div className="container">
        <section className="header">
          <h1>Weights</h1>
        </section>
        <Search />
        (search results)
      </div>
    )
  }
}

export default App;
