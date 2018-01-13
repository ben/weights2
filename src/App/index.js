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
        // ref.once('value', snapshot => {
        //   this.setState({workouts: snapshot.val() || []})
        // })
        ref.on('child_added', (data) => {
          console.log('child_added', data.key)
          this.setState(({workouts}) =>
            Object.assign(workouts, {[data.key]: data.val()}))
        })
        ref.on('child_removed', (data) => {
          console.log('child_removed', data.key)
          this.setState(({workouts}) => {
            delete workouts[data.key]
            return {workouts}
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
      search
    })
  }

  setProposedEntry = proposedEntry => {
    this.setState({
      proposedEntry
    })
  }

  render() {
    const {
      user,
      search,
      workouts,
      proposedEntry,
    } =  this.state

    const logInOutButton = user
      ? <button className='u-full-width' onClick={this.logout}>Log out</button>
      : <button className='u-full-width' onClick={this.login}>Log in</button>
    const lowerSection = (
      <div>
        {
          user
            ? <Search text={search} onChange={this.setSearch} />
            : null
        }
        {
          proposedEntry
            ? <NewEntry entry={proposedEntry} onChange={this.setProposedEntry} />
            : search ? <SearchResults workouts={workouts} query={search} /> : null
        }
        {logInOutButton}
      </div>
    )

    return (
      <div className="container">
        <section className="header">
          <h1>
            Weights
          </h1>
        </section>
        {lowerSection}
      </div>
    )
  }
}
