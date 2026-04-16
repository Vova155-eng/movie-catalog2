import { useEffect, useState } from 'react';
import { getMovies, deleteMovie, type Movie } from '../services/movieService';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '20px' }}>Завантаження...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
        🎬 Мій Кінокаталог
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '30px' 
      }}>
        {movies.map(m => (
          <div key={m.id} style={{ 
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)', // М'яка тінь
            textAlign: 'center',
            border: '1px solid #eee',
            transition: 'transform 0.3s ease'
          }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#2c3e50' }}>{m.title}</h2>
            <p style={{ color: '#7f8c8d', fontSize: '16px', marginBottom: '15px' }}>{m.genre}</p>
            
            <div style={{ fontSize: '22px', marginBottom: '20px', fontWeight: 'bold' }}>
              <span style={{ color: '#f1c40f' }}>⭐</span> {m.rating} <span style={{ color: '#bdc3c7', fontSize: '16px', fontWeight: 'normal' }}>/ 10</span>
            </div>
            
            <button 
              onClick={() => m.id && deleteMovie(m.id).then(load)}
              style={{ 
                backgroundColor: '#fdf0f0',
                color: '#e74c3c',
                border: '1px solid #fadbd8',
                padding: '8px 25px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;