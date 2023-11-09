import { API_URL } from './const.js';

export const getData = async (url) => {
  try {
    const response = await fetch(`${API_URL}/${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Ошибка при получении данных:', error);
    throw error;
  }
};
