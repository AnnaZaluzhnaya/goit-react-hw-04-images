import axios from 'axios';

const KEY = '27631880-b0639dc61f111cbc90b791bd4';

const BASE_URL = `https://pixabay.com/api/?&key=${KEY}&image_type=photo&orientation=horizontal`;

export const searchImages = async (query, page, perPage) => {
  const response = await axios.get(
    `${BASE_URL}&q=${query}&page=${page}&per_page=${perPage}`
  );

  if (response.status !== 200) {
    throw new Error('Nothing found to match your query');
  }

  return response.data;
};
