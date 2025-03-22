import React from 'react';

export default function Services() {
  const services = [
    { name: 'Electrician', available: true },
    { name: 'IT Support', available: false },
    { name: 'Plumber', available: true },
    { name: 'Developer', available: false }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb',width:"82vw" }}>
      
      <div style={{ flex: 3, padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {services.map((service, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{service.name}</h2>
            <span style={{
              padding: '8px 16px',
              borderRadius: '16px',
              color: '#fff',
              backgroundColor: service.available ? '#10b981' : '#ef4444'
            }}>
              {service.available ? 'Available' : 'Not Available'}
            </span>
          </div>
        ))}
      </div>

      
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#e5e7eb', borderLeft: '1px solid #d1d5db' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Availability</h2>
        <ul>
          {services.map((service, index) => (
            <li key={index} style={{
              marginBottom: '12px',
              color: service.available ? '#10b981' : '#ef4444'
            }}>
              {service.name}: {service.available ? 'Available' : 'Not Available'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
