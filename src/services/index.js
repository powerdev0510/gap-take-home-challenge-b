import axios from 'axios';

const API_URL = 'http://localhost:5000/api/search';
export const fetchImages = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (e) {
    console.log(e.response);
    if (e.response) {
      throw new Error(e.response.data.message);
    }
    throw e;
  }
};