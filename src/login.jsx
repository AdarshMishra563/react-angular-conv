import React, { useState } from 'react';
import { useDispatch } from 'react-redux';







import { useNavigate,Link } from 'react-router-dom';

import { login } from './slice.js';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import { ActivityIcon } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function popup(message) {
    const div = document.createElement('div');
    div.innerText = message;
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    div.style.color = 'white';
    div.style.padding = '20px';
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.zIndex = '9999';
    div.style.borderRadius = '12px';
    div.style.fontSize = '16px';
    div.style.textAlign = 'center';
    div.style.maxWidth = '80%';
    div.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2000);
  }

  const handleLogin = async () => {

    setLoading(true);
    try {
      const data = await axios.post('https://react-angular-backend-2.onrender.com/api/login', { email, password });
      console.log(data, "ffff");

      if (data.data.status === 'admin') {
        navigate('/admin');
        dispatch(login({ email, password }));
      } else if (data.data.status === 'user') {
        navigate('/user');
        dispatch(login({ email, password }));
      }
    } catch (err) {
      console.log(err.response);
      popup(err?.response?.data?.message || 'An error occurred or Invalid Credentials');
    } finally {
      setLoading(false);
 try{
setLoading(true);
  const data= await  axios.post('https://react-angular-backend-2.onrender.com/api/login', {email,password});
  console.log(data,"ffff");

  
  if(data.data.status==='admin'){
    navigate('/admin');
  dispatch(login({ email, password }));
  }else if(data.data.status==='user'){navigate('/user'); dispatch(login({ email, password }));}

 }catch(err){console.log(err.response),
  popup(err?.response?.data?.message || 'An error occurred or Invalid Credentials');
 }finally{setLoading(false)}
  

    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        margin: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginRight: '8px' }}>Click N Done</h1>
          <FaArrowUp style={{ color: '#3b82f6', fontSize: '24px' }} />
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px',
          textAlign: 'center'
        }}>Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '24px',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        />
    <button
          onClick={handleLogin}
          style={{
            width: '100%',
            backgroundColor: '#3b82f6',
            color: '#fff',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            fontSize: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              Logging in...
              <ActivityIcon size={16} style={{ marginLeft: '8px' }} />
            </>
          ) : (
            'Login'
          )}
        </button>

        <div style={{




          marginTop: '16px',
          textAlign: 'center'
        }}>
          Don't have an account? <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}    
