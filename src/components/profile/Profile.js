import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';
import Card from './Card';

class Profile extends Component {

  render() {
    const { profile } = this.props;

    if (profile) {
      return (
        <React.Fragment>
          <div className="card">
            {profile.map(item => 
              <Card key={item.id} item={item} />  
            )}
          </div>
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

Profile.propTypes = {
  firestore: PropTypes.object.isRequired,
  profile: PropTypes.array
};

export default compose(
  firestoreConnect([{ 
    collection: 'profile',
    where: [
      ['emailVerified', '==', true],
      ['public', '==', true]
    ]
  }]),
  connect((state, props) => ({
    profile: state.firestore.ordered.profile,
  }))
)(Profile);

