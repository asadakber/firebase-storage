import React, { Component } from 'react'; 
import { storage } from '../firebase';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0
        }
        this.handleOnChangeImage = this.handleOnChangeImage.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleOnChangeImage = (e) => {
   
        if(e.target.files[0]) {
            const image = e.target.files[0]
            this.setState(() => ({image}))
        }
    }

    handleUpload = () => {
        const {image} = this.state
        const UploadTask = storage.ref(`/images/${image.name}`).put(image)
        UploadTask.on('state_changed', 
        (snapshot) => {
            // progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({
                progress
            })
        }, 

        (error) => {
            // error function
            console.log(error);
        }, 
        () => {
              // complete function
              storage.ref('images').child(image.name).getDownloadURL().then(url => {
                  console.log(url)
                  this.setState({
                      url
                  })
              })
        })
    }

    render() {
        return(
            <div style={styles.align}>
            <progress value={this.state.progress} max="100" />
            <br />
                <input onChange={this.handleOnChangeImage}  type="file" />
                <button onClick={this.handleUpload}>Upload</button>
                <br />
                <img src={this.state.url || 'https://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
            </div>
        )
    }
}

const styles = {
    align: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
   
  }

export default ImageUpload;