import React, { Component } from 'react'
import { Search } from '../Search'
import { SearchResults } from '../SearchResults'
import { NewEntry } from '../NewEntry'
import { firebase, auth, provider } from '../firebase'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      search: '',
      proposedEntry: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    })
  }

  login = async () => {
    const result = await auth.signInWithPopup(provider)
    this.setState({ user: result.user })
  }

  logout = async () => {
    await auth.signOut()
    this.setState({ user: null })
  }

  setSearch = search => {
    this.setState({
      search
    })
  }

  render() {
    const {
      user,
      search,
      proposedEntry,
    } =  this.state

    const logOutButton = user
      ? <button onClick={this.logout}>Log out</button>
      : null
    const lowerSection = user
      ? <div>
          <Search text={search} onChange={this.setSearch} />
          {
            proposedEntry
              ? <NewEntry entry={proposedEntry} />
              : search ? <SearchResults query={search} /> : null
          }
        </div>
      : <button className='u-full-width' onClick={this.login}>Log in</button>

    return (
      <div className="container">
        <section className="header">
          <h1>
            Weights
            <small className='u-pull-right'>{logOutButton}</small>
          </h1>
        </section>
        {lowerSection}
      </div>
    )
  }
}
