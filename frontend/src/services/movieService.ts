import axios from 'axios';

const API_URL = 'http://localhost:3000/movies';

export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
}

export const getMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const createMovie = async (movie: Omit<Movie, 'id'>) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
};


export const deleteMovie = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};