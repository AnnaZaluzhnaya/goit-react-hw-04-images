import React from 'react';
import { Component } from 'react';
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';
import { MdImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    enteredValue: '',
  };

  changeValue = event => {
    this.setState({ enteredValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const value = this.state.enteredValue.trim();
    if (!value) {
      Notiflix.Notify.warning('Please enter a value in the search field');
      return;
    }
    this.props.onSubmit(value);
    this.setState({ enteredValue: '' });
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form onSubmit={this.handleSubmit} className={style.searchForm}>
          <button type="submit" className={style.SearchButton}>
            <span className={style.buttonLabel}>
              <MdImageSearch />
            </span>
          </button>

          <input
            className={style.SearchInput}
            name="enteredValue"
            value={this.state.enteredValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.changeValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Searchbar;
