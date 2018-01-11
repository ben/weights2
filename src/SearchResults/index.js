import React, { Component } from 'react'
import { db, auth } from '../firebase'

export class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.user = auth.currentUser
    this.state = {
      workouts: [],
      results: [],
    }
  }

  async componentWillMount() {
    const snapshot = await db.ref(`users/${this.user.uid}/workouts`).once('value')
    const workouts = snapshot.val() || []
    this.setState({ workouts })
    this.updateSearchResults(this.props.query)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.query !== nextProps.query) {
      this.updateSearchResults(nextProps.query)
    }
  }

  updateSearchResults(query) {
    const { workouts } = this.state
    const results = workouts.filter(w => !!w.name.match(new RegExp(query, 'i')))
    this.setState({ results })
  }

  render () {
    const { results } = this.state
    if (results.length === 0) {
      return <p>(no results)</p>
      // TODO: new-workout button
    }
    // TODO: table with button cells
    return results.map(result => (
      <pre><code>{JSON.stringify(result)}</code></pre>
    ))
  }
}
