import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Public() {
  const Authenticated = useSelector((state) => state.auth.Authenticated);

  return (
    <div style={{backgroundColor: 'lightblue'}}>
      <h1>Public Page</h1>
      <p>Welcome! Here are the available routes:</p>
      <ul>
        <li><Link to="/protected">Home (Protected)</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/">Public Page</Link></li>
      </ul>
      <p>{Authenticated ? "You are logged in." : "You are not logged in."}</p>
    </div>
  );
}
