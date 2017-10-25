import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Trips } from '../api/trips.js';
import { Grid, Row, Col } from 'react-bootstrap';

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
      <Row className="show-grid">
        <Col xs={6} md={1}>
          <input
            type="checkbox"
            readOnly
            checked={this.props.trip.checked}
            onClick={this.toggleChecked.bind(this)}
          />
        </Col>
        <Col xs={6} md={2}>
          <p>
            {this.props.trip.projCode}
          </p>
        </Col>
        <Col xs={6} md={2}>
          <p>
            {this.props.trip.empId}
          </p>
        </Col>
        <Col xs={6} md={3}>
          <p>
            {this.props.trip.destination}
          </p>
        </Col>
        <Col xs={6} md={2}>
          <button className="delete" onClick={this.deleteThisTrip.bind(this)}>
            &times;
          </button>
        </Col>
      </Row>
    );
  }
}

Trip.propTypes = {
  trip : PropTypes.object.isRequired,
};
