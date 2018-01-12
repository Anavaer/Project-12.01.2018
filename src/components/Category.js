import React from 'react';
import {NavLink} from 'react-router-dom';


class Category extends React.Component {
  render() {
    return (
      <li className="nav__list-el">
        <NavLink exact to={`/category/${this.props.category}`} className="nav__link" activeClassName="nav__link--active">
          {this.props.category}
        </NavLink>
      </li>
    );
  }
}

export default Category;