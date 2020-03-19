import { toastr } from "react-redux-toastr";
import { asyncActionStart, asyncActionFinish } from "../async/asyncActions";
import cuid from 'cuid';

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
       
       
        const imageName = cuid();
        const firebase = getFirebase();
         console.log(firebase, 'firebase log');
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName
        };
        console.log(path, 'path created');
        try {
            dispatch(asyncActionStart())
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
                name: imageName,
                url: downloadURL
            })

        } catch (error) {
            console.log(error)
        }
        dispatch(asyncActionFinish())
        console.log('dispatch action finish')
    }
}


export const deletePhoto = (photo) => 
    
    async (dispatch, getState , {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        console.log('firebase current user select')
        try {
            dispatch(asyncActionStart())
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            console.log('firebase file to delete selected')
            await firestore.delete({
                collection:'users',
                doc:user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            })
        } catch (error) {
            console.log(error);
            throw new Error('Error deleting the Photo')
        }
        dispatch(asyncActionFinish())
    }
