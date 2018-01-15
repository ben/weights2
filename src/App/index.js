import React, { Component } from 'react'
import { Search } from '../Search'
import { SearchResults } from '../SearchResults'
import { NewEntry } from '../NewEntry'
import { auth, provider, db } from '../firebase'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      workouts: {},
      search: '',
      proposedEntry: null,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
        window.user = user

        const ref = db.ref(`users/${user.uid}/workouts`)
        ref.on('child_added', (data) => {
          this.setState(({workouts}) =>
            Object.assign(workouts, {[data.key]: data.val()}))
        })
        ref.on('child_removed', (data) => {
          this.setState(({workouts}) => {
            delete workouts[data.key]
            return {workouts: Object.assign({}, workouts)}
          })
        })
        window.ref = ref
      }
    })
  }

  login = async () => {
    const result = await auth.signInWithPopup(provider)
    this.setState({ user: result.user })
  }

  logout = async () => {
    await auth.signOut()
    this.setState({
      user: null,
      workouts: {}
    })
  }

  setSearch = search => {
    this.setState({
      search,
      proposedEntry: null
    })
  }

  setProposedEntry = proposedEntry => {
    this.setState({ proposedEntry })
  }

  saveProposedEntry = async () => {
    const { proposedEntry, user } = this.state
    const ref = db.ref(`users/${user.uid}/workouts`)
    await ref.push(proposedEntry)
    this.setState({ proposedEntry: null })
  }

  render() {
    const {
      user,
      search,
      workouts,
      proposedEntry,
    } =  this.state

    let content
    if (user) {
      content = (
        <div>
        {
          proposedEntry
            ? <NewEntry entry={proposedEntry} onChange={this.setProposedEntry} onSave={this.saveProposedEntry} />
            : <div>
              <Search text={search} onChange={this.setSearch} />
              {
                search
                  ? <SearchResults workouts={workouts} query={search} onProposeEntry={this.setProposedEntry} />
                  : null
              }
            </div>
        }
        <footer>
          <a className='small'
                  onClick={user ? this.logout : this.login}>
            Log out
          </a>
        </footer>
      </div>
      )
    } else {
      content = (
        <button className='u-full-width' onClick={this.login}>
          Log in
        </button>
      )
    }

    return (
      <div className="container">
        <section className="header">
          <h1>Weights</h1>
        </section>
        {content}
      </div>
    )
  }
}
