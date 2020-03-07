import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';

 

 class EventForm extends Component {
     state = {
         title : '',
         date:'',
         venue:'',
         city:'',
         hostedBy:''

     }
     


     componentDidMount(){
         if(this.props.selectedEvent !== null ){
             this.setState({
                 ...this.props.selectedEvent
             });
         }
     }



     handleTitleChange = event => {
         this.setState({[event.target.name] : event.target.value});
         
     }

     handleFormSubmit = (event) => {
         event.preventDefault();
         if(this.state.id){
             this.props.updateEvent(this.state);
         }else{
            this.props.eventCreate(this.state);
         }

         
        }  

    render() {
        const {title,venue,city,date,hostedBy} = this.state;
        const {cancelFormOpen} = this.props;
         return (
                  <Segment>
                    <Form autoComplete = 'off' onSubmit = {this.handleFormSubmit}>
                      <Form.Field>
                        <label>Event Title</label>
                        <input placeholder="First Name" name = 'title' onChange ={ this.handleTitleChange} value = {title}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Event Date</label>
                        <input type="date" placeholder="Event Date" name = 'date' onChange ={ this.handleTitleChange} value = {date}/>
                      </Form.Field>
                      <Form.Field>
                        <label>City</label>
                        <input placeholder="City event is taking place" name = 'city' onChange ={ this.handleTitleChange} value= {city} />
                      </Form.Field>
                      <Form.Field>
                        <label>Venue</label>
                        <input placeholder="Enter the Venue of the event" name = 'venue' onChange ={ this.handleTitleChange} value = {venue}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Hosted By</label>
                        <input placeholder="Enter the name of person hosting" name = 'hostedBy' onChange ={ this.handleTitleChange} value = {hostedBy}/>
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