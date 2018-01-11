import React, { Component } from 'react'
import { Search } from '../Search'
import { SearchResults } from '../SearchResults'
import { NewEntry } from '../NewEntry'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      proposedEntry: null
    }
  }

  setSearch = search => {
    this.setState({
      search
    })
  }

  render() {
    const {
      search,
      proposedEntry
    } =  this.state

    return (
      <div className="container">
        <section className="header">
          <h1>Weights</h1>
        </section>
        <Search text={search} onChange={this.setSearch} />
        {
          proposedEntry
            ? <NewEntry entry={proposedEntry} />
            : search ? <SearchResults query={search} /> : null
        }
      </div>
    )
  }
}
