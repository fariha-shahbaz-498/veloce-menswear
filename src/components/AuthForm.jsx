import React, { useState } from 'react';
import API from '../services/api'; // Import your Axios client instance

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle typing inputs safely
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error messages when user types
  };

  // Process Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await API.post(endpoint, payload);
      
      if (response.data.success) {
        // Securely store the token locally on the machine
        localStorage.setItem('veloce_token', response.data.token);
        
        // Let the parent component know authentication succeeded
        if (onAuthSuccess) {
          onAuthSuccess(response.data.user);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h2>
        <p style={styles.subtitle}>
          {isLogin ? 'Sign in to access your Veloce account' : 'Join the Veloce menswear community'}
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Fariha Shahbaz"
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="name@example.com"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'PROCESSING...' : isLogin ? 'SIGN IN' : 'REGISTER'}
          </button>
        </form>

        <div style={styles.toggleText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => { setIsLogin(!isLogin); setError(''); }} style={styles.toggleLink}>
            {isLogin ? 'Register here' : 'Sign in here'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Minimalist, Clean Styling Object (Pink & White theme accents as preferred)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    background: '#ffffff',
    padding: '1rem'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '2.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f0f0f0',
    background: '#ffffff'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textAlign: 'center',
    margin: '0 0 0.5rem 0',
    color: '#111111'
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#777777',
    textAlign: 'center',
    margin: '0 0 2rem 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: '#333333'
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    border: '1px solid #dddddd',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#fafafa'
  },
  submitBtn: {
    padding: '0.85rem',
    background: '#111111',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    letterSpacing: '1px',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background-color 0.2s'
  },
  errorBox: {
    background: '#fff0f1',
    color: '#ff4d4d',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
    marginBottom: '1.25rem',
    border: '1px solid #ffe1e2',
    textAlign: 'center'
  },
  toggleText: {
    fontSize: '0.85rem',
    color: '#666666',
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  toggleLink: {
    color: '#d46b8a', // High-end premium pink accent brand color
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

export default AuthForm;