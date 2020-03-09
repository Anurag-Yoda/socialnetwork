import React, { Component } from "react";
import { Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";

import cuid from "cuid";
import { connect } from "react-redux";
import * as actionTypes from "../eventContants";



class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  };

  createEventHandler = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.onCreateEvent(newEvent);
    this.setState(({ events }) => ({
      
      isOpen: false
    }));
  };

  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };

  handleUpdateEvent = updatedEvent => {
    this.setState(({ events }) => ({
      events: events.map(event => {
        if (event.id == updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    }));
  };
  handleDeleteEvent = deleteEvent => {};

  render() {
    
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            deleteEvent={this.props.onDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
         <h1>Activity Feed</h1>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.eventReducer
  };
};

const onDeleteEvent = event => ({
  type: actionTypes.DELETE_EVENT,
  payload: event
});
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
    onUpdateEvent: event => dispatch(onUpdateEvent(event)),
    onDeleteEvent: event => dispatch(onDeleteEvent(event))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
