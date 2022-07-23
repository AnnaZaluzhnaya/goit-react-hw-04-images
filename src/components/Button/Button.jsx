import PropTypes from 'prop-types';
import style from './Button.module.css';

const Button = ({ onMoreBtn }) => {
  return (
    <div className={style.LoadMore}>
      <button type="button" className={style.Button} onClick={onMoreBtn}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onMoreBtn: PropTypes.func.isRequired,
};

export default Button;
