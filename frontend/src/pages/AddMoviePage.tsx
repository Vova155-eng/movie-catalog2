import React, { useState } from 'react';
import { createMovie } from '../services/movieService';

const AddMoviePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMovie(formData);
      alert('Фільм успішно додано!');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Помилка при збереженні');
    }
  };

  const styles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      width: '100%',
      maxWidth: '400px'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '30px',
      color: '#1a1a1a'
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    label: {
      fontWeight: '600',
      color: '#444',
      fontSize: '14px'
    },
    input: {
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '16px',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box' as const
    },
    submitBtn: {
      padding: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background 0.2s'
    },
    cancelBtn: {
      textAlign: 'center' as const,
      background: 'none',
      border: 'none',
      color: '#666',
      textDecoration: 'underline',
      cursor: 'pointer',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.header}>🎬 Новий фільм</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Назва фільму</label>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Наприклад: Початок"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Жанр</label>
            <input 
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Sci-Fi, Драма..."
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Рейтинг (0-10)</label>
            <input 
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.rating}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Зберегти фільм
          </button>

          <button type="button" onClick={() => window.location.href = '/'} style={styles.cancelBtn}>
            Скасувати
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;