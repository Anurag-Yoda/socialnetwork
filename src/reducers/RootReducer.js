import {combineReducers} from 'redux';
import eventReducer from './EventReducer';
import {reducer as FormReducer} from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr'
import modal from '../features/modals/modalReducer';
import authReducer from '../features/auth/authReducer';
import { firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import asyncReducer from '../features/async/asyncReducer';
import {
  
    pendingTasksReducer, // The redux reducer
    
  } from 'react-redux-spinner';
  
const rootReducer = combineReducers({
    firebase:firebaseReducer,
    firestore: firestoreReducer,
    eventReducer: eventReducer,
    form: FormReducer,
    modals: modal,
    auth:authReducer,
    toastr: toastrReducer,
    async: asyncReducer,
    pendingTasks: pendingTasksReducer
    

});

export default rootReducer;