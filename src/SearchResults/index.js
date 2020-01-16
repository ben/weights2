import React, { Component } from 'react'
import { sortBy, reverse } from 'lodash'

export class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
  }

  async componentWillMount() {
    this.updateSearchResults(this.props.query)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.query !== nextProps.query ||
      this.props.workouts !== nextProps.workouts
    ) {
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
      when: Date.now()
    })
  }

  duplicateHandler = entry => {
    return () => {
      this.proposeEntry(entry)
    }
  }

  render() {
    const { results } = this.state

    const formatDate = timestamp => {
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const year = date
        .getFullYear()
        .toString()
        .substr(2)
      return `${month}/${day}/${year}`
    }

    const formatReps = value => {
      if (value.match(/^\d+$/)) {
        return <span>&times;{value}</span>
      }
      return <span>{value}</span>
    }

    const renderedResults = results.map(result => (
      <tr key={result.when}>
        <td>{formatDate(result.when)}</td>
        <td>{result.name}</td>
        <td>{result.weight}#</td>
        <td>{formatReps(result.reps)}</td>
        <td>
          <button
            style={{ padding: '0 10px' }}
            onClick={this.duplicateHandler(result)}
          >
            {'\u002b'}
          </button>
        </td>
      </tr>
      // <pre key={result.when}><code>{JSON.stringify(result)}</code></pre>
    ))

    return (
      <div>
        <table className="u-full-width">
          <tbody>{renderedResults}</tbody>
        </table>
        <button className="u-full-width" onClick={this.proposeEntry}>
          New entry
        </button>
      </div>
    )
  }
}
