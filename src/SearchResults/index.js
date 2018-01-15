import React, { Component } from 'react'
import { sortBy, reverse } from 'lodash'

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
    if(this.props.query !== nextProps.query || this.props.workouts !== nextProps.workouts) {
      this.updateSearchResults(nextProps.query)
    }
  }

  updateSearchResults(query) {
    const { workouts } = this.props
    const results = Object.keys(workouts)
      .map(k => workouts[k])
      .filter(w => !!w.name.match(new RegExp(query, 'i')))
    this.setState({ results: reverse(sortBy(results, r => r.when)) })
  }

  proposeEntry = (template = {}) => {
    this.props.onProposeEntry({
      name: template.name || this.props.query,
      reps: template.reps || '',
      weight: template.weight || '',
      when: Date.now(),
    })
  }

  duplicateHandler = (entry) => {
    return () => { this.proposeEntry(entry) }
  }

  render () {
    const { results } = this.state

    const formatDate = timestamp => {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}/${day}/${year}`
    }

    const renderedResults = results.map(result => (
      <tr key={result.when}>
        <td>{result.name}</td>
        <td>{result.weight}</td>
        <td>{result.reps}</td>
        <td>{formatDate(result.when)}</td>
        <td width={20}>
          <button style={{width: 20}}
                  onClick={this.duplicateHandler(result)}>
            +
          </button>
        </td>
      </tr>
      // <pre key={result.when}><code>{JSON.stringify(result)}</code></pre>
    ))

    return (
      <div>
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Movement</th>
              <th>Weight</th>
              <th>Reps</th>
              <th>Date</th>
              <th width={20}></th>
            </tr>
          </thead>
          <tbody>
            {renderedResults}
          </tbody>
        </table>
        <button className="u-full-width" onClick={this.proposeEntry}>New entry</button>
      </div>
    )
  }
}
