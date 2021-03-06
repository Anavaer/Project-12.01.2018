import React from 'react';
import UserPanel from './UserPanel';
import SearchForm from "./SearchForm";
import {Link} from 'react-router-dom';

class Header extends React.Component {

  constructor() {
    super();

    this.state = {
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({userLoggedIn: nextProps.userLoggedIn})
  }
  
  render() {
    return (
      <div className="header">
        <div className="header__div container">
          <h1 className="header__heading"><Link to="/">Code<span style={{color: '#BDAEC6'}}>.js</span></Link></h1>
          <SearchForm
            search={this.props.search}
          />
          <UserPanel
            isLoggedIn={this.props.isLoggedIn}
          />
        </div>
      </div>
    );
  }
}

export default Header;