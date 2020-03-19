import React, { Fragment } from 'react'
import { Header, Card, Image, Button } from 'semantic-ui-react'

const UserPhotos = (props) => {
  let filteredPhotos;
  if(props.photos){
    filteredPhotos = props.photos.filter((photo)=>{
      return photo.url !==  props.profile.photoURL
    })
  }
    return (
    
        <Fragment>
        <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src = {props.profile.photoURL} />
          <Button positive>Main Photo</Button>
        </Card>
        {props.photos && filteredPhotos.map(photo => (
            <Card key = {photo.id}>
          <Image src = {photo.url} />
          <div className="ui two buttons">
            <Button onClick = {()=> props.setMainPhoto(photo)} basic color="green">
              Main
            </Button>
            <Button basic icon="trash" color="red" onClick ={()=> props.deletePhoto(photo)} />
          </div>
        </Card>
        ))}
      
      </Card.Group>
      </Fragment>
    )
}

export default UserPhotos;


