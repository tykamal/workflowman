import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Trips } from '../api/trips.js';

export default class Trip extends Component {
  constructor(props){
      super();
      }

  toggleChecked(){
    Trips.update(this.props.trip._id, {
        $set: { checked: !this.props.trip.checked },
    })
  }

  deleteThisTrip() {
    Trips.remove(this.props.trip._id)
  }

  render() {

  const tripClassName = this.props.trip.checked ? 'checked': '';

    return (
      <li className={tripClassName}>
        <button className="delete" onClick={this.deleteThisTrip.bind(this)}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={this.props.trip.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        <span className="trips">
            {this.props.trip.destination} {this.props.trip.projCode} {this.props.trip.empId}
        </span>
      </li>
    );
  }
}

Trip.propTypes = {
  trip : PropTypes.object.isRequired,
};
