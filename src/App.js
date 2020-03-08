import React, { Fragment } from "react";

import "./App.css";
import EventDashboard from "./features/event/EventDashboard/EventDashboard";
import NavBar from "./features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import EventDetailedPage from "./features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "./features/user/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "./features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "./features/user/Settings/SettingsDashboard";
import EventForm from "./features/event/EventForm/EventForm";


function App() {
  return (
    <Fragment>
      <Route exact path = '/' component = {HomePage}/>
      <Route path = '/(.+)' render = {(props)=> ( 
        <Fragment>  
      <NavBar {...props} /> 
     <Container className="main">
      
      <Route exact path = '/events' component = {EventDashboard}/>
      <Route exact path = '/events/:id' component = {EventDetailedPage}/>
      <Route exact path = '/people' component = {PeopleDashboard}/>
      <Route exact path = '/profile:/id' component = {UserDetailedPage}/>
      <Route  path = '/settings' component = {SettingsDashboard}/>
      <Route exact path = '/createEvent' component = {EventForm}/>
     
     </Container>
     </Fragment>
      )}/>
    </Fragment>
   
     
   
  );
}

export default App;
