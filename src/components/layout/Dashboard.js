import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Switch from "react-switch";

import Spinner from '../layout/Spinner';
import ProfilePhoto from '../profile/ProfilePhoto';

import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';


// get user firebase uid from localStorage
const userKey = Object.keys(window.localStorage).filter(it => it.startsWith('firebase:authUser'))[0];
const userId = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      public: false,
      emailVerified: true
    }

    this.displayName = React.createRef();
    this.email = React.createRef();
    this.description = React.createRef();
    this.subTitle = React.createRef();
    this.facebook = React.createRef();
    this.twitter = React.createRef();
    this.instagram = React.createRef();
    this.github = React.createRef();
    this.linkedin = React.createRef();

  }

  componentDidUpdate(nextProps, nextState){
    const { dashboard, auth } = this.props;
    if(dashboard){
      if (dashboard !== nextProps.dashboard) {
          this.setState({
            public: dashboard.public
          });
      }
    }
    if(auth){
      console.log("auth Rohit:",auth);
      if (auth !== nextProps.auth) {
          this.setState({
            emailVerified: auth.emailVerified
          });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const { firestore, auth, notifyUser } = this.props;

    const newClient = {
      uid: userId.uid,
      photoURL: auth.photoURL,
      displayName: this.displayName.current.value,
      description: this.description.current.value,
      subTitle: this.subTitle.current.value,
      email: this.email.current.value,
      facebook: this.facebook.current.value,
      twitter: this.twitter.current.value,
      instagram: this.instagram.current.value,
      github: this.github.current.value,
      linkedin: this.linkedin.current.value,
      public: this.state.public,
      emailVerified: this.state.emailVerified,
    };

    firestore.update({ collection: 'profile', doc: userId.uid }, newClient).then((res) =>{
      notifyUser('Data Updated...', 'success')
    });
      
  };

  render() {
    const { dashboard, auth } = this.props;
    const { message, messageType } = this.props.notify;

    if (dashboard) {
      return (
          <div className="details-content">
            {!this.state.emailVerified && (
              <div className="info-box">
                <span className="info-box__msg">Please verify your email address</span>
              </div>
            )}
            <div className="details-content__left">
              <ProfilePhoto displayName={dashboard.displayName} userId={auth.uid} edit={true}/>
              <h3>{dashboard.subTitle}</h3>
              <h1>{dashboard.displayName}</h1>
              <p>Show Your Profile on Public</p>
              <Switch offColor="#c54850" onColor="#39dc39" onChange={(val) => this.setState({public: val})} checked={!this.state.emailVerified ? this.state.emailVerified : this.state.public} />
            </div>
            <div className="details-content__right">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <form className="form-container" onSubmit={this.handleSubmit}>
                <div className="form-container__form-row">
                  <input
                    type="text"
                    className="form-container__form-textbox"
                    name="displayName"
                    defaultValue={dashboard.displayName}
                    ref={this.displayName}
                    required
                  />
                  <label className="form-container__form-label" htmlFor="displayName">Name</label>
                </div>
                <div className="form-container__form-row">
                  <input
                    type="text"
                    className="form-container__form-textbox"
                    name="subTitle"
                    defaultValue={dashboard.subTitle}
                    ref={this.subTitle}
                  />
                  <label className="form-container__form-label" htmlFor="subTitle">Sub Title</label>
                </div>
                <div className="form-container__form-row">
                  <input
                    type="email"
                    className="form-container__form-textbox"
                    name="email"
                    ref={this.email}
                    defaultValue={dashboard.email}
                    required
                  />
                  <label className="form-container__form-label" htmlFor="email">E-mail</label>
                </div>
                <div className="form-container__form-row">
                  <textarea
                    className="form-container__form-textbox"
                    name="description"
                    ref={this.description}
                    defaultValue={dashboard.description}
                  />
                  <label className="form-container__form-label" htmlFor="description">Description</label>
                </div>

                <div className="form-container__form-row">
                  <input
                    type="text"
                    className="form-container__form-textbox"
                    name="facebook"
                    defaultValue={dashboard.facebook}
                    ref={this.facebook}
                  />
                  <label className="form-container__form-label" htmlFor="facebook">Facebook</label>
                </div>
                <div className="form-container__form-row">
                  <input
                    type="text"
                    className="form-container__form-textbox"
                    name="twitter"
                    defaultValue={dashboard.twitter}
                    ref={this.twitter}
                  />
                  <label className="form-container__form-label" htmlFor="twitter">Twitter</label>
                </div>
                <div className="form-container__form-row">
                  <input
                    type="text"
                    className="form-container__form-textbox"
                    name="instagram"
                    defaultValue={dashboard.instagram}
                    ref={this.instagram}
                  />
                  <label className="form-container__form-label" htmlFor="instagram">Instagram</label>
                </div>
                <div className="form-container__form-row">
                  <input
                    type="text"
                    className="form-container__form-textbox"
                    name="github"
                    defaultValue={dashboard.github}
                    ref={this.github}
                  />
                  <label className="form-container__form-label" htmlFor="github">Github</label>
                </div>
                <div className="form-container__form-row">
                  <input
                    type="text"
                    className="form-container__form-textbox"
                    name="linkedin"
                    defaultValue={dashboard.linkedin}
                    ref={this.linkedin}
                  />
                  <label className="form-container__form-label" htmlFor="linkedin">Linkedin</label>
                </div>

                <div className="form-container__form-row">
                  <input
                      type="submit"
                      value="Save"
                      className="form-container__form-submit"
                  />
                </div>
              </form>
            </div>
          </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Dashboard.propTypes = {
  firestore: PropTypes.object.isRequired,
  dashboard: PropTypes.object,
  auth: PropTypes.object,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'profile', storeAs: 'dashboard', doc: userId.uid }
  ]),
  connect((state, props) => ({
    dashboard: state.firestore.ordered.dashboard && state.firestore.ordered.dashboard[0],
    auth: state.firebase.auth,
    notify: state.notify
  }), { notifyUser })
)(Dashboard);
  