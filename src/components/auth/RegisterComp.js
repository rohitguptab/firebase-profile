import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
import { regExp, formValid } from "../../actions/FormValidation";

class RegisterComp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isError: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };

    console.log("value:", regExp.test(value));

    switch (name) {
      case "name":
        isError.name = value.length < 4 ? "Atleast 4 characaters required" : "";
        break;
      case "email":
        isError.email = regExp.test(value)
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        isError.password =
          value.length < 8 ? "Atleast 8 characaters required" : "";
        break;
      case "confirmPassword":
        isError.confirmPassword =
          value !== this.state.password ? "Password is not same" : "";
        break;
      default:
        break;
    }

    this.setState({
      isError,
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault()
    const { name, email, password } = this.state;
    const { firebase, notifyUser } = this.props;

    if(formValid(this.state)){
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.sendEmailVerification(); //Send email verification
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            user.updateProfile({
              displayName: name,
            })
            this.initCreateProfile(user);
          }
        })
        
      })
      .catch(err => notifyUser('Invalid Login Credentials', 'error'));
    } else{
      notifyUser('Password is not same', 'error')
    }
  }


  initCreateProfile = user =>{
    const { firestore } = this.props;
    const {name} = this.state;
    
    const newClient = {
      uid: user.uid,
      displayName: user.displayName ? user.displayName : name,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      public: false,
    };

    firestore.collection("profile").doc(user.uid).set(newClient);
  }

  render() {
    const { firebase } = this.props;
    const { message, messageType } = this.props.notify;
    const { name, email, password, confirmPassword, isError } = this.state

    return (
      <React.Fragment>
        {message ? (
          <Alert message={message} messageType={messageType} />
        ) : null}
        <form className="form-container" onSubmit={this.handleSubmit}>
          <div className="form-container__form-row">
            <input
              type="text"
              className="form-container__form-textbox"
              name="name"
              value={name}
              required
              onChange={this.handleInputChange}
            />
            <label className="form-container__form-label" htmlFor="name">First Name</label>
          </div>
          {isError.name.length > 0 && (
            <span className="alert alert--label">{isError.name}</span>
          )}
          <div className={`form-container__form-row ${email ? "active" : ''}`}>
            <input
              type="email"
              className="form-container__form-textbox"
              name="email"
              value={email}
              required
              onChange={this.handleInputChange}
            />
            <label className="form-container__form-label" htmlFor="email">E-mail</label>
          </div>
          {isError.email.length > 0 && (
            <span className="alert alert--label">{isError.email}</span>
          )}
          <div className="form-container__form-row">
            <input
              type="password"
              className="form-container__form-textbox"
              name="password"
              required
              value={password}
              onChange={this.handleInputChange}
            />
            <label className="form-container__form-label" htmlFor="password">Password</label>
          </div>
          {isError.password.length > 0 && (
            <span className="alert alert--label">{isError.password}</span>
          )}
          <div className="form-container__form-row">
            <input
              type="password"
              className="form-container__form-textbox"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={this.handleInputChange}
            />
            <label className="form-container__form-label" htmlFor="confirmPassword">Confirm Password</label>
          </div>
          {isError.confirmPassword.length > 0 && (
            <span className="alert alert--label">{isError.confirmPassword}</span>
          )}
          <div className="form-container__form-row">
            <input
                type="submit"
                value="Sign up"
                className="form-container__form-submit"
            />
          </div>
        </form>
        <p>or sign up with:</p>
          <ul className="social-main">
            <li>
              <span
                className="fab fa-google google"
                onClick={() => {
                  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
                    if(res.additionalUserInfo.isNewUser){
                      this.initCreateProfile(res.user)
                    }
                  })
                }}
              ></span>
            </li>
          </ul>
      </React.Fragment>
    );
  }
}

RegisterComp.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firestoreConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(RegisterComp);
