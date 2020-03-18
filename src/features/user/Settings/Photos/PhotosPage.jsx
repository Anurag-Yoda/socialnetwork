import React, { useState, useEffect, Fragment } from "react";
import {firestoreConnect, firestoreReducer} from 'react-redux-firebase';
import {compose} from 'redux';
import Spinner from '../../../LoadingSpinner/Spinner';
import { isLoaded } from 'react-redux-firebase'
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card
} from "semantic-ui-react";
import { connect } from "react-redux";
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import { uploadProfileImage } from "../../userActions";
import { toastr } from "react-redux-toastr";
import UserPhotos from "./UserPhotos";



const mapDispatchToProps = {
  uploadProfileImage,

};
const mapStateToProps = state => ({
   
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos
   
   
})


const query = ({auth}) => {
   
  return [
    {  
        collection:'users',
        doc: auth.uid,
        subcollections: [{collection: 'photos'}],
        storeAs: 'photos',
        isDataloaded: true

    }
]

 
} 
console.log(query, 'query fired');

const PhotosPage = ({uploadProfileImage, photos, profile}) => {
  const [files, setFiles] = useState([]);
  const [cropResult, setCropResult] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
      URL.revokeObjectURL(cropResult);
    };
  }, [files, cropResult]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      handleCancelCrop();
      toastr.success("Sucess", "Photo has been uploaded");
    } catch (error) {
      console.log(error);
      toastr.error("error!", "Something went wrong");
    }
  };
  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setCropResult('');
  };

  


  return (
   
    <Fragment>
    {isLoaded ? 
    <Segment>
      <Header dividing size="large" content="Your Photos" />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <CropperInput setImage={setImage} imgPreview={files[0].preview} />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <Fragment>

            <div
              className="img-preview"
              style={{
                minHeight: "200px",
                minWidth: "200px",
                overflow: "hidden"
              }}
            />
            <Button.Group>
              <Button onClick ={handleUploadImage} style ={{width : "100px"}} positive icon = 'check'/>
              <Button onClick ={handleCancelCrop} style ={{width :'100px'}} icon = 'close'/>
            </Button.Group>
            </Fragment>
            
          )}
        </Grid.Column>
      </Grid>

      <Divider />
      <UserPhotos photos ={photos} profile = {profile}/>
    </Segment>
     : <Spinner /> }
    </Fragment>
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(auth => query(auth)))(PhotosPage);
