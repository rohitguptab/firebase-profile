import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import defaultAvatar from '../../images/default-avatar.jpg';
import Spinner from '../layout/Spinner';

class ProfileDetails extends Component {
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div className="details-content details-content--single">
          <div className="details-content__left">
            <img className="profile__avatar" src={user.photoURL ? user.photoURL : defaultAvatar} alt={user.displayName} />
            <div className="profile-details__left__pad">
              <h4 className="profile___sub-title">{user.subTitle}</h4>
              <h1 className="profile__title">{user.displayName}</h1>
              <ul className="icons icons--white">
                {user.email && (<li className="icons__item icons__item--email"><a href={`mailto:${user.email}`} className="far fa-envelope" target="_blank" rel="noreferrer">email</a></li>)}
                {user.twitter && (<li className="icons__item icons__item--twitter"><a href={user.twitter} className="fab fa-twitter" target="_blank" rel="noreferrer">Twitter</a></li>)}
                {user.facebook && (<li className="icons__item icons__item--facebook"><a href={user.facebook} className="fab fa-facebook-f" target="_blank" rel="noreferrer">Facebbok</a></li>)}
                {user.instagram && (<li className="icons__item icons__item--instagram"><a href={user.instagram} className="fab fa-instagram" target="_blank" rel="noreferrer">Instagram</a></li>)}
                {user.github && (<li className="icons__item icons__item--github"><a href={user.github} className="fab fa-github" target="_blank" rel="noreferrer">Github</a></li>)}
                {user.linkedin && (<li className="icons__item icons__item--linkedin"><a href={user.linkedin} className="fab fa-linkedin" target="_blank" rel="noreferrer">Linkedin</a></li>)}
              </ul>
            </div>
          </div>
          <div className="details-content__right">
            <p>{user.description}</p>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ProfileDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'profile', storeAs: 'profile', doc: props.match.params.id }
  ]),
  connect((state, props) => ({
    user: state.firestore.ordered.profile && state.firestore.ordered.profile[0]
  }))
)(ProfileDetails);
