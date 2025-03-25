import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './slice.js'; 
import { useNavigate } from 'react-router-dom';

function Userpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <h1>User Panel (If Admin Login with Admin Credentials)</h1>
      <button 
        onClick={handleLogout}
        style={{
          backgroundColor: '#f44336',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Userpage;
