import { useState, useEffect } from 'react';
import { searchImages } from '../Servise/Api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Notiflix from 'notiflix';
import * as Scroll from 'react-scroll';
import { ImFilesEmpty } from 'react-icons/im';

export const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const perPage = 12;

  useEffect(() => {
    if (query === '') {
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      try {
        const data = await searchImages(query, page, perPage);
        if (!data.total) {
          throw new Error('There are no images for your request');
        }

        if (data.total > page*perPage + perPage) {
          setShowLoadMoreButton(true);
        } else if (page*perPage + perPage >= data.total) {
          setShowLoadMoreButton(false);
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalImages(data.totalHits);
        setLoading(false);
      } catch (error) {
        Notiflix.Notify.failure(
          'There are no images for your request.Please try again.'
        );
        setLoading(false);
        setShowLoadMoreButton(false);
      }
    };
    fetchApi();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const openModal = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
  };

  const closeModal = () => {
    setLargeImageUrl('');
  };

  const onMoreBtn = () => {
    setPage(prevState => prevState + 1);
    setTotalImages(totalImages + perPage);
    scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    Scroll.animateScroll.scrollToBottom({
      duration: 1700,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length === 0 && (
        <p>
          <ImFilesEmpty />
          Find the best images for the gallery, which is currently empty
        </p>
      )}

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {largeImageUrl && (
        <Modal largeImageUrl={largeImageUrl} closeModal={closeModal} />
      )}
      {showLoadMoreButton && <Button onMoreBtn={onMoreBtn} />}

      {loading && <Loader />}
    </div>
  );
};
