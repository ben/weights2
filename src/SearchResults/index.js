import React, { Component } from 'react'

export class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
    }
  }

  async componentWillMount() {
    this.updateSearchResults(this.props.query)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.query !== nextProps.query) {
      this.updateSearchResults(nextProps.query)
    }
  }

  updateSearchResults(query) {
    const { workouts } = this.props
    const results = Object.keys(workouts)
      .map(k => workouts[k])
      .filter(w => !!w.name.match(new RegExp(query, 'i')))
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
      <pre key={result.when}><code>{JSON.stringify(result)}</code></pre>
    ))
  }
}
