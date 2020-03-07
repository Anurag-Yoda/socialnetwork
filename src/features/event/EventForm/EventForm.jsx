import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';

 const formInput = {};

 class EventForm extends Component {
     state = {
         title : ''
     }
     formInput = this.state;


     handleTitleChange = event => {
         this.setState({[event.target.name] : event.target.value});
         
     }

     handleFormSubmit = (event) => {
         event.preventDefault();
         this.props.eventCreate(this.state);
        }  

    render() {
        const {title} = this.state;
        const {cancelFormOpen} = this.props;
         return (
                  <Segment>
                    <Form autoComplete = 'off' onSubmit = {this.handleFormSubmit}>
                      <Form.Field>
                        <label>Event Title</label>
                        <input placeholder="First Name" name = 'title' onChange ={ this.handleTitleChange}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Event Date</label>
                        <input type="date" placeholder="Event Date" name = 'Date' onChange ={ this.handleTitleChange}/>
                      </Form.Field>
                      <Form.Field>
                        <label>City</label>
                        <input placeholder="City event is taking place" name = 'city' onChange ={ this.handleTitleChange} />
                      </Form.Field>
                      <Form.Field>
                        <label>Venue</label>
                        <input placeholder="Enter the Venue of the event" name = 'venue' onChange ={ this.handleTitleChange}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Hosted By</label>
                        <input placeholder="Enter the name of person hosting" name = 'hostedby' onChange ={ this.handleTitleChange}/>
                      </Form.Field>
                      <Button positive type="submit" >
                        Submit
                      </Button>
                      <Button type="button" onClick ={cancelFormOpen}>Cancel</Button>
                    </Form>
                  </Segment>
        )
    }
}

export default EventForm;