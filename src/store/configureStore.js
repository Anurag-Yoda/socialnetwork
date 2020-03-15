import { createStore, applyMiddleware } from "redux";
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import rootReducer from "../reducers/RootReducer";
import {devToolsEnhancer, composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import firebase from '../config/firebase';
const rrfConfig = {
    userProfile: 'users',
    attachAuthisReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false

}


export const configureStore = () =>{

    const middleWare = [thunk.withExtraArgument({getFirebase,getFirestore})];

    const composedEnhancer = composeWithDevTools(applyMiddleware(...middleWare),
    reactReduxFirebase(firebase, rrfConfig), reduxFirestore(firebase));

    const store = createStore(rootReducer,composedEnhancer);
    return store;

}

