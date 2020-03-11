import React from 'react';
import {connect} from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';


const modalLookup = {
  'LOGIN_MODAL':LoginModal,
  'REGISTER_MODAL': RegisterModal,
  
}

  const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) {
      return <span /> // after React v15 you can return null here
    }
  
    const SpecificModal = modalLookup[modalType];
    return <SpecificModal {...modalProps} />
  }
  
  export default connect(
    state => state.modals
  )(ModalRoot)