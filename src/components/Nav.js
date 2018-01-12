import React from 'react';
import Category from './Category';

class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <ul className="nav__list">
          <Category
            category="React.js"
          />
          <Category
            category="ES6"
          />
          <Category
            category="Vue.js"
          />
          <Category
            category="Redux"
          />
          <Category
            category="Css"
          />
          <Category
            category="AngularJS"
          />
          <Category
            category="Webpack"
          />
          <Category
            category="Node.js"
          />
        </ul>
      </div>
    );
  }
}

export default Nav;