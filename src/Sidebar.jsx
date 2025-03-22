import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaUser, FaChevronDown, FaChevronUp, FaBars, FaTimes,  FaUps } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AiOutlineRise } from "react-icons/ai";
const NavigationItems = [
  {
    title: 'Dashboard',
    type: 'item',
    url: 'dashboard',
    icon: <FaHome />
  },
  {
    id: 'services',
    title: 'Services',
    type: 'collapse',
    icon: <FaBox />,
    children: [
      { id: 'service-list', title: 'Service List', url: 'service' },
      { id: 'sub_service-list', title: 'Sub Service List', url: 'sub-service' }
    ]
  },
  {
    id: 'users',
    title: 'Users',
    type: 'collapse',
    icon: <FaUsers />,
    children: [
      { id: 'active_users', title: 'Active Users', url: 'users' },
      { id: 'blocked_users', title: 'Blocked Users', url: 'users' }
    ]
  },
  {
    id: 'contractor',
    title: 'Contractor',
    type: 'collapse',
    icon: <FaUser />,
    children: [
      { id: 'active_contractor', title: 'Active Contractor', url: 'contractor' },
      { id: 'approved_contractor', title: 'Approved Contractor', url: 'contractor' },
      { id: 'rejected_contractor', title: 'Rejected Contractor', url: 'contractor' }
    ]
  },
  {
    id: 'order',
    title: 'Order',
    type: 'collapse',
    icon: <FaUser />,
    children: [
      { id: 'active_order', title: 'Active Order', url: 'contractor' },
      { id: 'approved_order', title: 'Completed Order', url: 'contractor' },
    ]
  }
];

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      if (!mobileView) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <motion.div
        animate={{ width: isSidebarOpen ? (isMobile ? '250px' : '300px') : '80px' }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: '#2D3748', color: '#FFF', minHeight: '100vh', overflow: 'hidden', padding: '16px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AiOutlineRise style={{ color: 'blue', fontSize: '24px', marginRight: '8px' }} />
            
            {isSidebarOpen && <span style={{ color: '#FFF', fontSize: '20px', marginLeft: '8px' }}>Click N Done</span>}
          </div>
          {isMobile && (
            <button onClick={toggleSidebar} style={{ backgroundColor: '#4A5568', color: '#FFF', border: 'none', padding: '8px', cursor: 'pointer' }}>
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}{!isMobile && ( <button onClick={toggleSidebar} style={{ backgroundColor: '#4A5568', color: '#FFF', border: 'none', padding: '8px', cursor: 'pointer' }}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>)}
        </div>

        {isSidebarOpen && NavigationItems.map((item) => (
          <div key={item.id}>
            {item.type === 'item' ? (
              <Link to={item.url} style={{ display: 'flex', alignItems: 'center', padding: '8px', textDecoration: 'none', color: '#FFF', backgroundColor: '#4A5568', marginBottom: '8px' }}>
                {item.icon} <span style={{ marginLeft: '8px' }}>{item.title}</span>
              </Link>
            ) : (
              <div>
                <button onClick={() => handleToggle(item.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px', backgroundColor: '#4A5568', border: 'none', color: '#FFF', cursor: 'pointer', marginBottom: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon} <span style={{ marginLeft: '8px' }}>{item.title}</span></span>
                  {openMenu === item.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: openMenu === item.id ? 'auto' : 0, opacity: openMenu === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden', paddingLeft: '16px' }}
                >
                  {item.children.map((child) => (
                    <Link key={child.id} to={child.url} style={{ display: 'block', padding: '8px', textDecoration: 'none', color: '#FFF', backgroundColor: '#718096', marginBottom: '8px', transition: 'background-color 0.3s' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#A0AEC0'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#718096'}>
                      {child.title}
                    </Link>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Sidebar;
