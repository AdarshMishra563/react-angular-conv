import React, { useState,useEffect,useRef } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Protected from './Protected';
import Sidebar from './Sidebar';
import Public from './Public';
import { Settings, Bell } from 'lucide-react';
import { logout } from './slice';
import { LogOut,User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import SignUp from './signup';
import Services from './Services';



function Layout() {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div>
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto',width:"100%",position:"relative"}}>
     <div style={{position:"absolute",top:18,right:34}}><div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      <Settings size={24} onClick={toggleDropdown} color="black" style={{ cursor: 'pointer' }} />
      {isOpen && (
        <div style={{ width: '250px', backgroundColor: '#f9fafb', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'hidden', position: 'absolute', right: 0, top: '40px' ,zIndex:9999 }}>

          <div style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#e0f2fe' }}>
            <img src={"https://tse4.mm.bing.net/th?id=OIP.-Zanaodp4hv0ry2WpuuPfgHaEf&pid=Api&P=0&h=180"} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px' }} />
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>John</span>
            <LogOut onClick={()=>{dispatch(logout())}} size={24} color="#ef4444" style={{ marginLeft: 'auto', cursor: 'pointer' }} />
          </div>

     
          <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer', color: '#4b5563' }}>
              <User size={20} style={{ marginRight: '12px' }} />
              Profile
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer', color: '#4b5563' }}>
              <Settings size={20} style={{ marginRight: '12px' }} />
              Settings
            </div>
          </div>
        </div>
      )}
    </div></div>
        <Routes>
        
          <Route path="/*" element={<Home/>} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/service" element={<Services/>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route
          path="/*"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
