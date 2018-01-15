import React, { Component } from 'react'

export class NewEntry extends Component {
  update = (k, v) => {
    const { entry, onChange } = this.props
    onChange(Object.assign(entry, {[k]: v}))
  }

  updateHandler = (k) => (e) => this.update(k, e.target.value)

  cancel = () => this.props.onChange(null) && false
  save = () => this.props.onSave() && false

  render () {
    const {entry} = this.props
    return (
      <form>
        <div className="row">
          <label htmlFor="name">Movement</label>
          <input type="text" className="u-full-width" id="name"
                 value={entry.name}
                 onChange={this.updateHandler('name')} />
        </div>
        <div className="row">
          <label htmlFor="reps">Reps</label>
          <input type="number" className="u-full-width" id="reps"
                 value={entry.reps}
                 onChange={this.updateHandler('reps')} />
        </div>
        <div className="row">
          <label htmlFor="weight">Weight</label>
          <input type="number" className="u-full-width" id="weight"
                 value={entry.weight}
                 onChange={this.updateHandler('weight')} />
        </div>
        <div className="row">
          <div className="six columns">
            <button className="u-full-width" onClick={this.cancel}>
              Cancel
            </button>
          </div>
          <div className="six columns">
            <button className="u-full-width button-primary" onClick={this.save}>
              Save
            </button>
          </div>
        </div>
      </form>
    )
  }
}
