import React, { Fragment } from 'react'
import { Header, Card, Image, Button } from 'semantic-ui-react'

const UserPhotos = (props) => {
  
    return (
    
        <Fragment>
        <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src = {props.profile.photoURL} />
          <Button positive>Main Photo</Button>
        </Card>
        {props.photos && props.photos.map(photo => (
            <Card key = {photo.id}>
          <Image src = {photo.url} />
          <div className="ui two buttons">
            <Button basic color="green">
              Main
            </Button>
            <Button basic icon="trash" color="red" />
          </div>
        </Card>
        ))}
      
      </Card.Group>
      </Fragment>
    )
}

export default UserPhotos;
