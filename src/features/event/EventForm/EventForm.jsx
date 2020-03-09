import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button } from "semantic-ui-react";
import * as actionTypes from '../eventContants';
import cuid from "cuid";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: "",
    date: "",
    venue: "",
    city: "",
    hostedBy: ""
  };

  if (eventId && state.eventReducer.length > 0) {
    event = state.eventReducer.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};



const onCreateEvent = event => ({
  type: actionTypes.CREATE_EVENT,
  payload: event
});
const onUpdateEvent = event => ({
  type: actionTypes.UPDATE_EVENT,
  payload: event
});

const mapDispatchToProps = dispatch => {
  return {
    onCreateEvent: event => dispatch(onCreateEvent(event)),
    onUpdateEvent: event => dispatch(onUpdateEvent(event))
  };
};


class EventForm extends Component {
  state = {
    ...this.props.event
  };

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent
      });
    }
  }

  handleTitleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.id) {
      this.props.onUpdateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`)
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.onCreateEvent(newEvent);
      this.props.history.push(`/events`)
    }
  };

  render() {
    const { title, venue, city, date, hostedBy } = this.state;
    const { cancelFormOpen } = this.props;
    return (
      <Segment>
        <Form autoComplete="off" onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              placeholder="First Name"
              name="title"
              onChange={this.handleTitleChange}
              value={title}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type="date"
              placeholder="Event Date"
              name="date"
              onChange={this.handleTitleChange}
              value={date}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              placeholder="City event is taking place"
              name="city"
              onChange={this.handleTitleChange}
              value={city}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              placeholder="Enter the Venue of the event"
              name="venue"
              onChange={this.handleTitleChange}
              value={venue}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              placeholder="Enter the name of person hosting"
              name="hostedBy"
              onChange={this.handleTitleChange}
              value={hostedBy}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventForm);
