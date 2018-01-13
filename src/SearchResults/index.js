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

  proposeEntry = (template = {}) => {
    this.props.onProposeEntry({
      name: template.name || this.props.query,
      reps: template.reps || '',
      weight: template.weight || '',
      when: Date.now(),
    })
  }

  render () {
    const { results } = this.state
    const renderedResults = results.map(result => (
      <pre key={result.when}><code>{JSON.stringify(result)}</code></pre>
    ))

    return (
      <div>
        {renderedResults}
        <button className="u-full-width" onClick={this.proposeEntry}>New entry</button>
      </div>
    )
  }
}
