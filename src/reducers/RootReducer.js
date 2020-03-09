import {combineReducers} from 'redux';
import eventReducer from './EventReducer';
import {reducer as FormReducer} from 'redux-form';

const rootReducer = combineReducers({
    eventReducer: eventReducer,
    form: FormReducer
});

export default rootReducer;