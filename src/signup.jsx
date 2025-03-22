import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      alert('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      const data = await axios.post('https://react-angular-backend-2.onrender.com/api/register', {
        email,
        password,
        name: username,
      });

      console.log(data);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err?.response?.data?.message || err.message);
      alert(err?.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', width: '100vw', backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        width: '100%', maxWidth: '400px', padding: '2rem',
        backgroundColor: '#fff', borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', margin: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginRight: '8px' }}>Click N Done</h1>
          <FaArrowUp style={{ color: '#3b82f6', fontSize: '24px' }} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>Sign Up</h1>
        <input
          type="email" placeholder="Enter your email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '8px' }}
        />
        <input
          type="password" placeholder="Enter your password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '8px' }}
        />
        <input
          type="text" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '24px', border: '1px solid #ccc', borderRadius: '8px' }}
        />
        <button
          onClick={handleSignUp}
          style={{
            width: '100%', backgroundColor: '#3b82f6', color: '#fff',
            padding: '12px', borderRadius: '8px', cursor: 'pointer', border: 'none', fontSize: '16px'
          }}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Already have an account? <a href="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>Login</a>
        </p>
      </div>
    </div>
  );
}
