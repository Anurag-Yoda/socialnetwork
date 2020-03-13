

const initialState = {
    modalType: null,
    modalProps: {}
  }
  
  const modal = (state = initialState, actions) => {
    //const {modalType, modalProps} = payload.payload;
    console.log(actions.payload, 'modaltype recevied');
   // console.log(actions.payload.modalType, 'modalreducer exec');
    console.log(actions.type, 'swith case paload type');
    switch (actions.type) {
      
      case 'OPEN_MODAL':
        return {
          
         modalType: actions.payload.modalType,
         modalProps: actions.payload.modalProps
        }
        case 'HIDE_MODAL':
          return {
            initialState
          }
    
      default:
        return state
    }
   
  }
  
  export default modal;