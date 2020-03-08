import {combineReducers} from 'redux';
import eventReducer from './EventReducer';

const rootReducer = combineReducers({
    eventReducer: eventReducer
});

export default rootReducer;