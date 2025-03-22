import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './slice.js';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import { ActivityIcon } from 'lucide-react';
export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false);

  const handleLogin = async () => {
 try{

  const data= await  axios.post('http://localhost:3000/api/login', {email,password});
  console.log(data);
  if(data.data.status==='admin'){
    navigate('/admin');
  dispatch(login({ email, password }));
  }else if(data.data.status==='user'){navigate('/user'); dispatch(login({ email, password }));}

 }catch(err){console.log(err)}
  
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
            fontSize: '16px'
          }}
        >
        Login  {loading && <ActivityIcon size={16} style={{marginLeft:'8px'}}/> }
        </button>
        <p style={{
          marginTop: '16px',
          textAlign: 'center'
        }}>
          Don't have an account? <a href="/signup" style={{ color: '#3b82f6', textDecoration: 'none' }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
