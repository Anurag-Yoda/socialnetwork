import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Menu, Container, Button , Item} from 'semantic-ui-react';
import {withFirebase} from 'react-redux-firebase';
import { NavLink, Link } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import {openModal} from '../../modals/modalActions';
import {logout} from '../../auth/authActions';


const mapStateToProps = state =>{
  return {
    auth:state.firebase.auth
  }
}

//const mapDispatchToProps = dispatch => {
 // return{
   //openRegisterModal: () => dispatch({ type: 'OPEN_MODAL'}),
   //openLoginModal:() => dispatch({ type: 'OPEN_MODAL', modalType:'LOGIN_MODAL'}),
 //  openModal
   //logout: () => dispatch({type:'SIGN_OUT_USER'})
 // }
//}
const mapDispatchToProps = {
openModal,logout
}



class NavBar extends Component {

handleSignIn = () => this.props.openModal('LOGIN_MODAL');
handleSignOut = () => {
  //this.setState({authenticated:false});
 
  this.props.firebase.logout();
  this.props.history.push('/');
}
handleRegister = () => {
  this.props.openModal('REGISTER_MODAL');
}

    render() {
      const {auth} = this.props;
      const authenticated = auth.isLoaded && !auth.isEmpty;
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
                      {authenticated ? <SignedInMenu signOut = {this.handleSignOut} auth = {auth}/> : 
                      <SignedOutMenu signIn = {this.handleSignIn} register = {this.handleRegister} />}
                     
                     
                    </Container>
                  </Menu>
        )
    }
}

export default  withFirebase(connect(mapStateToProps,mapDispatchToProps)(NavBar));