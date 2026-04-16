import React from 'react';
import { deleteMovie, type Movie } from '../services/movieService'; 

interface Props {
  movies: Movie[];
  onDelete: () => void;
}

const MoviesList: React.FC<Props> = ({ movies, onDelete }) => {
  const handleDelete = async (id: number) => {
    await deleteMovie(id);
    onDelete();
  };

  return (
    <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
      {movies.map(movie => (
        <div key={movie.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <strong>{movie.title}</strong> — {movie.genre} (⭐ {movie.rating})
          <button 
            onClick={() => handleDelete(movie.id)}
            style={{ marginLeft: '15px', color: 'red', cursor: 'pointer' }}
          >
            Видалити
          </button>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;