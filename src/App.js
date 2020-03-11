import React, { Fragment } from "react";

import "./App.css";
import EventDashboard from "./features/event/EventDashboard/EventDashboard";
import NavBar from "./features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import EventDetailedPage from "./features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "./features/user/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "./features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "./features/user/Settings/SettingsDashboard";
import EventForm from "./features/event/EventForm/EventForm";
import ModalManager from "./features/modals/ModalManager";


function App() {
  return (
    <Fragment>
      <Route exact path = '/' component = {HomePage}/>
      <ModalManager/>
      <Route path = '/(.+)' render = {(props)=> ( 
        <Fragment>  
      <NavBar {...props} /> 
     <Container className="main">
      <Switch {...props} key = {props.location.key}>
      <Route exact path = '/events' component = {EventDashboard}/>
      <Route exact path = '/events/:id' component = {EventDetailedPage}/>
      <Route exact path = '/people' component = {PeopleDashboard}/>
      <Route exact path = '/profile:/id' component = {UserDetailedPage}/>
      <Route  path = '/settings' component = {SettingsDashboard}/>
      <Route exact path = {['/createEvent','/manage/:id']} component = {EventForm}/>
      </Switch>
     </Container>
     </Fragment>
      )}/>
    </Fragment>
   
     
   
  );
}

export default App;
