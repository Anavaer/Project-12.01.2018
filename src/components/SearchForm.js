import React from 'react';

class SearchForm extends React.Component {
  render() {
    return (
      <form onSubmit={(e) => this.props.search(e, this.search)} className="header__form">
          <input
            ref={input => this.search = input}
            type="text"
            name="searchBar"
            placeholder="Search for videos"
          />
      </form>
    );
  }
}

export default SearchForm;