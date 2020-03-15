import * as actionTypes from './authConstants';
import {closeModal} from '../modals/modalActions';
import { createStore } from 'redux';
import { SubmissionError } from 'redux-form';




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

export const registerUser = user => 
async (dispatch, getState , {getFirebase, getFirestore})=>{
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
       let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
       console.log(createdUser);
       await createdUser.user.updateProfile({
           displayName: user.displayName
       })

       let newUser = {
        displayName : user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
       };

       await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
       dispatch(closeModal());


    } catch (error) {
        console.log(error);
        throw new SubmissionError({
            _error: 'Login Failed'
        });
    }
}

export const logout = () => {
    return {
        type: actionTypes.SIGN_OUT_USER
    }
}