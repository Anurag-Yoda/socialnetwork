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
     console.log(modalType);
    if (!modalType) {
      return null; // after React v15 you can return null here
      
    }
    
    const SpecificModal = modalLookup[modalType];
    console.log(SpecificModal);
    return <SpecificModal {...modalProps} />
  }
  
  export default connect(
    state => state.modals
  )(ModalRoot)