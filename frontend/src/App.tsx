import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovie, type Movie } from './services/movieService';
import AddMoviePage from './pages/AddMoviePage';

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    color: '#1c1e21'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto 40px auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: 0,
    color: '#1a1a1a'
  },
  addButton: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  movieTitle: {
    fontSize: '20px',
    margin: 0,
    color: '#000'
  },
  info: {
    fontSize: '15px',
    color: '#65676b',
    margin: 0
  },
  rating: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f39c12',
    margin: 0
  },
  deleteButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#dc3545',
    border: '1px solid #dc3545',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s'
  }
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const isAddPage = window.location.pathname === '/add';

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Видалити цей фільм?')) {
      await deleteMovie(id);
      loadMovies();
    }
  };

  if (isAddPage) {
    return <AddMoviePage />;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>КиноКаталог</h1>
        <button 
          onClick={() => window.location.href = '/add'} 
          style={styles.addButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          + Додати фільм
        </button>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Завантаження...</p>
      ) : (
        <div style={styles.grid}>
          {movies.map(movie => (
            <div key={movie.id} style={styles.card}>
              <h3 style={styles.movieTitle}>{movie.title}</h3>
              <p style={styles.info}><b>Жанр:</b> {movie.genre}</p>
              <p style={styles.rating}>⭐ {movie.rating}</p>
              <button 
                onClick={() => handleDelete(movie.id)}
                style={styles.deleteButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc3545';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#dc3545';
                }}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;