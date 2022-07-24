import React from 'react';
import { useState } from 'react';
import Notiflix from 'notiflix';
import style from './Searchbar.module.css';
import { MdImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [enteredValue, setEnteredValue] = useState('');

  const changeValue = event => {
    setEnteredValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    const value = enteredValue.trim();
    if (!value) {
      Notiflix.Notify.warning('Please enter a value in the search field');
      return;
    }
    onSubmit(value);
    setEnteredValue();
  };

  return (
    <header className={style.searchbar}>
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <button type="submit" className={style.SearchButton}>
          <span className={style.buttonLabel}>
            <MdImageSearch />
          </span>
        </button>

        <input
          className={style.SearchInput}
          name="enteredValue"
          value={enteredValue || ''}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeValue}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default Searchbar;
