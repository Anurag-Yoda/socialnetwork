import * as actionTypes from './authConstants';

export const login = (cred) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(cred.email, cred.password);

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