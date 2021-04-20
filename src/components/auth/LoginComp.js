import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';

import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
import { regExp, formValid } from "../../actions/FormValidation";

class LoginComp extends Component {
  state = {
    email: '',
    password: '',
    isError: {
      email: "",
      password: "",
    },
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    if (formValid(this.state)) {
      firebase.login({ email, password }).catch(err => notifyUser('Invalid Login Credentials', 'error'));
    }
  };

  onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };

    switch (name) {
      case "email":
        isError.email = regExp.test(value)
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        isError.password =
          value.length < 8 ? "Atleast 8 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ isError, [name]: value });
  };

  initCreateProfile = user =>{
    const { firestore } = this.props;

    const newClient = {
      uid: user.uid,
      displayName: user.displayName,
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
    const { isError } = this.state;

    return (
      <React.Fragment>
        {message ? (
          <Alert message={message} messageType={messageType} />
        ) : null}
        
        <form onSubmit={this.onSubmit} className="form-container">
          <div className={`form-container__form-row ${this.state.email ? "active" : ''}`}>
            <input
              type="email"
              className="form-container__form-textbox"
              name="email"
              required
              value={this.state.email}
              onChange={this.onChange}
            />
            <label className="form-container__form-label" htmlFor="email">Email</label>
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
              value={this.state.password}
              onChange={this.onChange}
            />
            <label className="form-container__form-label" htmlFor="password">Password</label>
          </div>
          {isError.password.length > 0 && (
            <span className="alert alert--label">{isError.password}</span>
          )}
          <div className="form-container__form-row">
            <input
              type="submit"
              value="Login"
              className="form-container__form-submit"
            />
          </div>
        </form>
        <p>or sign in with:</p>
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

LoginComp.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(LoginComp);
