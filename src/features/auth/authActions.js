import * as actionTypes from './authConstants';
import {closeModal} from '../modals/modalActions';




export const login = (cred) => {
   console.log(cred.email);
    return async (dispatch, getState, {getFirebase}) => {
        
        const firebase = getFirebase();
        
        try {
        
            await firebase.auth().signInWithEmailAndPassword(cred.email, cred.password);
            dispatch({
                type:'LOGIN_USER',
                cred:{
                    email: cred.email
                }
            });
            dispatch(closeModal());
        } catch (error) {
            console.log(error)
        }
        
    }
}

export const logout = () => {
    return {
        type: actionTypes.SIGN_OUT_USER
    }
}