import {combineReducers} from 'redux';
import eventReducer from './EventReducer';
import {reducer as FormReducer} from 'redux-form';

import modal from '../features/modals/modalReducer';
import authReducer from '../features/auth/authReducer';

const rootReducer = combineReducers({
    eventReducer: eventReducer,
    form: FormReducer,
    modals: modal,
    auth:authReducer
});

export default rootReducer;