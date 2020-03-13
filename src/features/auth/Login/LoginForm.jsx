import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm} from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import {connect} from 'react-redux';
import {login} from '../authActions';
const mapDispatchToProps = dispatch => {
  return{
   loginUser: () => dispatch({ type: 'LOGIN_USER', email: 'gogo'}),
  
  }
}



const LoginForm = ({loginUser, handleSubmit}) => {
  return (
    <Form error size="large" onSubmit = {handleSubmit(loginUser)} autoComplete ="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(null, mapDispatchToProps)(reduxForm({form : 'loginForm'})(LoginForm));