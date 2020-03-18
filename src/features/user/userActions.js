import { toastr } from "react-redux-toastr";
import { asyncActionStart, asyncActionFinish } from "../async/asyncActions";


export const updateProfile = user => {
return async (dispatch, getState, {getFirebase})=>{
    const firebase = getFirebase();
    const {isLoaded, isEmpty, ...updatedUser} = user;
    try {
        await firebase.updateProfile(updatedUser);
        toastr.success('Success', 'Your profile has been updated')
    } catch (error) {
        console.log(error);
    }
}
}

export const uploadProfileImage = (file,filename) => {
    console.log('firebase upload start');
    return async (dispatch, getState , {getFirebase, getFirestore})=>{
       
        dispatch(asyncActionStart())
        const firebase = getFirebase();
         console.log(firebase, 'firebase log');
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: filename
        };
        console.log(path, 'path created');
        try {
           
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            console.log('firebase ipload fired');
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            let userDoc = await firestore.get(`users/${user.uid}`);

            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                })
            }

            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections:[{collection: 'photos'}]
            }, {
                name: filename,
                url: downloadURL
            })

        } catch (error) {
            console.log(error)
        }
        dispatch(asyncActionFinish())
        console.log('dispatch action finish')
    }
}