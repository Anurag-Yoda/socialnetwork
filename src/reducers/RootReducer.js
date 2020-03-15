import {combineReducers} from 'redux';
import eventReducer from './EventReducer';
import {reducer as FormReducer} from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'
import modal from '../features/modals/modalReducer';
import authReducer from '../features/auth/authReducer';
import { firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    firebase:firebaseReducer,
    firestore: firestoreReducer,
    eventReducer: eventReducer,
    form: FormReducer,
    modals: modal,
    auth:authReducer,
    toastr: toastrReducer
});

export default rootReducer;