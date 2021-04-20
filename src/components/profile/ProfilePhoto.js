import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ImageUploader from "react-images-upload"

import defaultAvatar from '../../images/default-avatar.jpg';

class ProfilePhoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: "",
      imageLoading: false
    }
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          imageUrl: user.photoURL,
        })
      }
    })
  }

  onDrop = picture => {
    const { firebase} = this.props;
    this.setState({
      imageLoading: !this.state.imageLoading,
    })
    picture.map((item, index) => {
      firebase
        .storage()
        .ref()
        .child(`${this.props.userId}/${this.props.displayName}`)
        .put(item)
        .then(snapshot => {
          this.updateOnAuth(snapshot.downloadURL)
          this.setState({imageUrl: snapshot.downloadURL})
        })
        .catch(error => {
          console.log("upload media errors:", error)
        })
      return null
    })
  }

  updateOnAuth = (url) => {
    const { firebase, firestore, auth } = this.props;

    // update profile photo on auth
    firebase.auth().currentUser.updateProfile({photoURL: url})

    // update profile photo on user data
    const newClient = {
      photoURL: url,
    };

    firestore.update({ collection: 'profile', doc: auth.uid }, newClient).then((res) =>{
      // refress page to load update profile image
      window.location.reload();
    });

  }

  render() {
    const { displayName, edit } = this.props;
    const { imageUrl, imageLoading  } = this.state;
    return (
      <div className="avatar">
        <div className={`avatar__inner ${imageLoading ? "avatar__inner--loading" : ""}`}>
          {imageUrl ? (
            <img src={imageUrl} alt={displayName} />
          ) : (
            <img src={defaultAvatar} alt={displayName} />
          )}
          {edit && (
            <ImageUploader
              withIcon={false}
              buttonText="Change images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          )}
        </div>
      </div>
    );
  }
}

ProfilePhoto.propTypes = {
  firestore: PropTypes.object.isRequired,
  user: PropTypes.object,
  auth: PropTypes.object
};


export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
  }))
)(ProfilePhoto);
  