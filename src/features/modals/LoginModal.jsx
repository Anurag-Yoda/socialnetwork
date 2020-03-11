import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';
import TextInput from '../../../src/common/form/TextInput';
import LoginForm from '../auth/Login/LoginForm';


const mapDispatchToProps = dispatch => {
    return{
        closeModal: () => dispatch({type:'HIDE_MODAL'})
    }
}

class LoginModal extends Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.closeModal}
            >
                <Modal.Header>
                    Login to Re-vents
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, mapDispatchToProps)(LoginModal);