import React, {Component, createRef} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default



class CropperInput extends Component {
  cropper = createRef();
  cropImage =() => {
      const {setImage} = this.props;
      if(typeof this.cropper.current.getCroppedCanvas() === 'undefined'){
          return;
      }

      this.cropper.current.getCroppedCanvas().toBlob(blob => {
          setImage(blob);
      }, 'image/jpeg')
  }
  render() {
      const {imgPreview} = this.props;
    return (
      <Cropper
        ref={this.cropper}
        src={imgPreview}
        style={{height: 200, width: '100%'}}
        // Cropper.js options
        preview ='.img-preview'
        aspectRatio={1}
        dragMove = 'move'
        guides={false}
        scalable = {true}
        cropBoxMovable ={true}
        cropBoxResizable = {true}
        crop={this.cropImage} />
    );
  }
}

export default CropperInput;