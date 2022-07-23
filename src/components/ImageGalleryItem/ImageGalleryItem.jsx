import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webURL, openModal, tags, largeImageURL }) => {
  return (
    <li
      className={style.ImageGalleryItem}
      onClick={() => openModal(largeImageURL)}
    >
      <img className={style.ImageGalleryItemImage} src={webURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
