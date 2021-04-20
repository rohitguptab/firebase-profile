import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultAvatar from '../../images/default-avatar.jpg';
class Card extends Component {
  render() {
    const { item } = this.props;

     return (
      <div className="card__item">
        <div className="card__item__left">
          <img className="card__img" src={item.photoURL ? item.photoURL : defaultAvatar} alt={item.displayName} />
        </div>
        <div className="card__item__right">
          <h4 className="card__sub-title">{item.subTitle}</h4>
          <h2 className="card__title"><Link to={`profile/${item.id}`}>{item.displayName}</Link></h2>
          <p className="card__desc">{item.description.slice(0, 220) + (item.description.length > 220 ? "..." : "")}</p>
          <ul className="icons">
            {item.email && (<li className="icons__item icons__item--email"><a href={`mailto:${item.email}`} className="far fa-envelope" target="_blank" rel="noreferrer">email</a></li>)}
            {item.twitter && (<li className="icons__item icons__item--twitter"><a href={item.twitter} className="fab fa-twitter" target="_blank" rel="noreferrer">Twitter</a></li>)}
            {item.facebook && (<li className="icons__item icons__item--facebook"><a href={item.facebook} className="fab fa-facebook-f" target="_blank" rel="noreferrer">Facebbok</a></li>)}
            {item.instagram && (<li className="icons__item icons__item--instagram"><a href={item.instagram} className="fab fa-instagram" target="_blank" rel="noreferrer">Instagram</a></li>)}
            {item.github && (<li className="icons__item icons__item--github"><a href={item.github} className="fab fa-github" target="_blank" rel="noreferrer">Github</a></li>)}
            {item.linkedin && (<li className="icons__item icons__item--linkedin"><a href={item.linkedin} className="fab fa-linkedin" target="_blank" rel="noreferrer">Linkedin</a></li>)}
          </ul>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  item: PropTypes.object.isRequired
};

export default Card;