import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Menu, Container, Button , Item} from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';



const mapStateToProps = state =>{
  return {
    auth:state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return{
   openRegisterModal: () => dispatch({ type: 'OPEN_MODAL', modalType: 'REGISTER_MODAL'}),
   openLoginModal:() => dispatch({ type: 'OPEN_MODAL', modalType:'LOGIN_MODAL'}),
   logout: () => dispatch({type:'SIGN_OUT_USER'})
  }
}



class NavBar extends Component {

handleSignIn = () => this.props.openLoginModal('LoginModal');
handleSignOut = () => {
  this.setState({authenticated:false});
  this.props.history.push('/');
}
handleRegister = () => {
  this.props.openRegisterModal('RegisterModal')
}

    render() {
      const {auth} = this.props;
      const authenticated = auth.authenticated;
        return (
                  <Menu inverted fixed="top">
                    <Container>
                      <Menu.Item as = {NavLink} exact to ="/" header>
                        <img src="assets/logo.png" alt="logo" />
                        Re-vents
                      </Menu.Item>
                      <Menu.Item as = {NavLink} exact to ="/events"  name="Events" />
                      <Menu.Item as = {NavLink} to ="/people"  name="People" />
                      <Menu.Item>
                        <Button as = {Link} to = "/createEvent" floated="right" positive inverted content="Create Event" />
                      </Menu.Item>
                      {authenticated ? <SignedInMenu signOut = {this.handleSignOut} currentUser = {auth.currentUser}/> : 
                      <SignedOutMenu signIn = {this.handleSignIn} register = {this.handleRegister} />}
                     
                     
                    </Container>
                  </Menu>
        )
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(NavBar);