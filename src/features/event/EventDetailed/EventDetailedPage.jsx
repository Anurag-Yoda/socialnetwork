import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import {connect} from 'react-redux';



const mapStateToProps = (state,ownProps) =>{
    const eventId = ownProps.match.params.id;

    let event = {};

    if(eventId && state.eventReducer.length > 0){
        event = state.eventReducer.filter(event => event.id === eventId)[0];
    }

    return {
        event
    }

}

const EventDetailedPage = ({event}) => {
    return ( 
    
        <Grid>
            <Grid.Column width = {10}>
                <EventDetailedHeader event ={event}/>
                <EventDetailedInfo event ={event}/>
                <EventDetailedChat/>
            </Grid.Column>
            <Grid.Column width = {6}>
                <EventDetailedSidebar attendees = {event.attendees}/>
            </Grid.Column>
        </Grid>
    
    
    
    
        );
}
 


export default connect(mapStateToProps)(EventDetailedPage);