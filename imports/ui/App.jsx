import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import {Grid, Row, Col, Button } from 'react-bootstrap';


import { Trips } from '../api/trips.js'

import Trip from './Trip.jsx';

class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const empId = ReactDOM.findDOMNode(this.refs.empId).value.trim();
    const projCode = ReactDOM.findDOMNode(this.refs.projCode).value.trim();
    const destination = ReactDOM.findDOMNode(this.refs.destination).value.trim();

    Trips.insert({
      projCode,
      empId,
      destination,
      createdAt: new Date(),
    });
    // clear form
    ReactDOM.findDOMNode(this.refs.projCode).value = '';
    ReactDOM.findDOMNode(this.refs.empId).value = '';
    ReactDOM.findDOMNode(this.refs.destination).value = '';
  }

  renderTrips () {
    return this.props.trips.map((trip) => (
      <Trip key={trip._id} trip={trip} />
    ));
  }

  render () {
    return (
      <div className="container">
        <header>
          <h1> Recent trips</h1>
          <form className="new-trip" onSubmit={this.handleSubmit.bind(this)}>

              <input
              type="text"
              ref="empId"
              placeholder="Employee ID"
            />
            <input
              type="text"
              ref="projCode"
              placeholder="Project Code"
            />

            <input
              type="text"
              ref="destination"
              placeholder="Destination"
            />

            
            <Button type="submit" className="btn btn-default">Submit</Button>

          </form>
        </header>
        <Grid>
            <Row className="show-grid">
              <Col xs={6} md={1}>check
              </Col>
              <Col xs={6} md={2}>
                <span>
                  Project Code
                </span>
              </Col>
              <Col xs={6} md={2}>
                <span>Emp ID</span>
              </Col>
              <Col xs={6} md={3}>
                <span> Destination</span>
              </Col>
              <Col xs={6} md={2}>del
              </Col>
            </Row>
            {this.renderTrips()}
        </Grid>

      </div>
    );
  }
}

App.propTypes = {
    trips: PropTypes.array.isRequired,
};

export default withTracker(trips => {
  return {
    trips: Trips.find({}, {sort: { createdAt: -1 } }).fetch(),
  };
})(App);
