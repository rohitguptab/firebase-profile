import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import ProfilePhoto from '../profile/ProfilePhoto'

class Header extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps = (props, state) => {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <header className="site-header">
        <div className="container">
          <div className="site-header__inner">
             <div className="header__inner__left">
                <div className="site-header__logo">
                  <Link to="/">
                    Firebase Profile
                  </Link>
                </div>
              </div>
              <div className="header__inner__right">
                <nav className="navbar">
                  <ul className="navbar__nav">
                    <li className="navbar__nav__item">
                      <Link to="/">
                        Home
                      </Link>
                    </li>
                    <li className="navbar__nav__item">
                      <Link to="/contact">
                        Contact
                      </Link>
                    </li>
                    {isAuthenticated ? (
                      <React.Fragment>
                        <li className="navbar__nav__item navbar__nav__item--profile">
                          <Link to="/dashboard/" className="profile-img">
                            <ProfilePhoto displayName={auth.displayName} userId={auth.uid} edit={false}/>
                          </Link>
                          <div className="sub-menu">
                            <ul>
                              <li>
                                <Link to="/dashboard/" >
                                  Dashboard
                                </Link>
                              </li>
                              <li>
                                <a href="#!" onClick={this.onLogoutClick}>
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </React.Fragment>
                    ) : null}
                    { !isAuthenticated ? (
                      <React.Fragment>
                        <li className="navbar__nav__item">
                          <Link to="/login" >
                            Login
                          </Link>
                        </li>
                      </React.Fragment>
                    ) : null}
                    </ul>
                </nav>
              </div>
          </div>
        </div>
       </header>
    );
  }
}

Header.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
  }))
)(Header);
