import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
          tags={tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
