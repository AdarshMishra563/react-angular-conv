import React from 'react';
import image from './assets/icon.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import WorldMapChart from './Map';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

import { ProgressBar } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
const latlong = {};
latlong['AU'] = {
  latitude: -27,
  longitude: 133
};
latlong['BR'] = {
  latitude: -10,
  longitude: -55
};
latlong['BW'] = {
  latitude: -22,
  longitude: 24
};
latlong['IN'] = {
  latitude: 20,
  longitude: 77
};
latlong['KE'] = {
  latitude: 1,
  longitude: 38
};
latlong['MX'] = {
  latitude: 23,
  longitude: -102
};
latlong['MY'] = {
  latitude: 2.5,
  longitude: 112.5
};
latlong['NI'] = {
  latitude: 13,
  longitude: -85
};
latlong['NZ'] = {
  latitude: -41,
  longitude: 174
};
latlong['PH'] = {
  latitude: 13,
  longitude: 122
};
latlong['PL'] = {
  latitude: 52,
  longitude: 20
};
latlong['RU'] = {
  latitude: 60,
  longitude: 100
};
latlong['TH'] = {
  latitude: 15,
  longitude: 100
};
latlong['ZA'] = {
  latitude: -29,
  longitude: 24
};

const mapcolor=[
    {
      "code": "MX",
      "name": "Mexico",
      "value": 114793341,
      "color": "#a389d4"
    },
    {
      "code": "BR",
      "name": "Brazil",
      "value": 196655014,
      "color": "#1de9b6"
    },
    {
      "code": "PL",
      "name": "Poland",
      "value": 38298949,
      "color": "#f44236"
    },
    {
      "code": "KE",
      "name": "Kenya",
      "value": 41609728,
      "color": "#1dc4e9"
    },
    {
      "code": "ZA",
      "name": "South Africa",
      "value": 50459978,
      "color": "#f4c22b"
    },
    {
      "code": "RU",
      "name": "Russia",
      "value": 142835555,
      "color": "#f4c22b"
    },
    {
      "code": "IN",
      "name": "India",
      "value": 241491960,
      "color": "#1de9b6"
    },
    {
      "code": "PH",
      "name": "Philippines",
      "value": 94852030,
      "color": "#04a9f5"
    },
    {
      "code": "AU",
      "name": "Australia",
      "value": 22605732,
      "color": "#1dc4e9"
    },
    {
      "code": "TH",
      "name": "Thailand",
      "value": 69518555,
      "color": "#f44236"
    },
    {
      "code": "BW",
      "name": "Botswana",
      "value": 2030738,
      "color": "#04a9f5"
    },
    {
      "code": "MY",
      "name": "Malaysia",
      "value": 28859154,
      "color": "#a389d4"
    },
    {
      "code": "NZ",
      "name": "New Zealand",
      "value": 4414509,
      "color": "#04a9f5"
    },
    {
      "code": "NI",
      "name": "Nicaragua",
      "value": 5869859,
      "color": "#a389d4"
    }
  ];
const tables = [
    {
      src: image,
      title: 'Isabella Christensen',
      text: 'Requested account activation',
      time: '11 MAY 12:56',
      color: 'text-c-green'
    },
    {
      src: image,
      title: 'Ida Jorgensen',
      text: 'Pending document verification',
      time: '11 MAY 10:35',
      color: 'text-c-red'
    },
    {
      src: image,
      title: 'Mathilda Andersen',
      text: 'Completed profile setup',
      time: '9 MAY 17:38',
      color: 'text-c-green'
    },
    {
      src: image,
      title: 'Karla Soreness',
      text: 'Requires additional information',
      time: '19 MAY 12:56',
      color: 'text-c-red'
    },
    {
      src: image,
      title: 'Albert Andersen',
      text: 'Approved and verified account',
      time: '21 July 12:56',
      color: 'text-c-green'
    }
  ];
 
  


const Home = () => {
    const card = [
        {
          design: 'border-bottom',
          number: '235',
          text: 'TOTAL IDEAS',
          icon: 'icon-zap text-c-green'
        },
        {
          number: '26',
          text: 'TOTAL LOCATIONS',
          icon: 'icon-map-pin text-c-blue'
        }
      ];
     
    const social_card = [
        {
          design: 'col-md-12',
          icon:   <FaFacebook style={{ color: '#1877F2', fontSize: '24px', cursor: 'pointer' }} />,
          amount: '12,281',
          percentage: '+7.2%',
          color: 'text-c-green',
          target: '35,098',
          progress: 60,
          duration: '3,539',
          progress2: 45,
          progress_bg: 'progress-c-theme',
          progress_bg_2: 'progress-c-theme2'
        },
        {
          design: 'col-md-6',
          icon:<FaTwitter style={{ color: '#1DA1F2', fontSize: '24px', marginLeft: '8px' }} />
          ,
          amount: '11,200',
          percentage: '+6.2%',
          color: 'text-c-purple',
          target: '34,185',
          progress: 40,
          duration: '4,567',
          progress2: 70,
          progress_bg: 'progress-c-theme',
          progress_bg_2: 'progress-c-theme2'
        },
        {
          design: 'col-md-6',
          icon:   <FaGoogle style={{ color: '#DB4437', fontSize: '24px', cursor: 'pointer' }} />,
          amount: '10,500',
          percentage: '+5.9%',
          color: 'text-c-blue',
          target: '25,998',
          progress: 80,
          duration: '7,753',
          progress2: 50,
          progress_bg: 'progress-c-theme',
          progress_bg_2: 'progress-c-theme2'
        }
      ];
  const chartData = [
    { name: 'Mon', sales: 60, revenue: 100 },
    { name: 'Tue', sales: 45, revenue: 80 },
    { name: 'Wed', sales: 70, revenue: 130 },
    { name: 'Thu', sales: 55, revenue: 90 },
    { name: 'Fri', sales: 70, revenue: 120 },
    { name: 'Sat', sales: 55, revenue: 95 },
    { name: 'Sun', sales: 70, revenue: 140 }
  ];
  const  sales = [
    {
      title: 'Daily Sales',
      icon: 'icon-arrow-up text-c-green',
      amount: '$249.95',
      percentage: '67%',
      progress: 50,
      design: 'col-md-6',
      progress_bg: 'success'
    },
    {
      title: 'Monthly Sales',
      icon: 'icon-arrow-down text-c-red',
      amount: '$2,942.32',
      percentage: '36%',
      progress: 35,
      design: 'col-md-6',
      progress_bg: 'danger'
    },
    {
      title: 'Yearly Sales',
      icon: 'icon-arrow-up text-c-green',
      amount: '$8,638.32',
      percentage: '80%',
      progress: 70,
      design: 'col-md-12',
      progress_bg: 'success'
    }
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        
      {sales.map((sale, index) => (
        <div key={index} style={{ flex: '1 1 calc(33.333% - 20px)', margin: '10px',marginTop:"50px" }}>
          <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.05)' }}>
            <h6>{sale.title}</h6>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <i className={`fa fa ${sale.icon}`} style={{ fontSize: '30px', marginRight: '10px' }}></i>
                {sale.amount}
              </h3>
              <p>{sale.percentage}</p>
              
            </div>
            <ProgressBar variant={sale.progress_bg} now={sale.progress} style={{ height: '7px', marginTop: '20px' }} />
          </div>
        </div>
      ))}
      <WorldMapChart dataJson={latlong} mapColor={mapcolor} />
      {card.map((item, index) => (
        <div key={index} style={{ flex: '1 1 calc(50% - 20px)', margin: '10px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', borderBottom: item.design === 'border-bottom' ? '4px solid #4CAF50' : 'none' }}>
          <h3>{item.number}</h3>
          <p>{item.text}</p>
          <i className={item.icon} style={{ fontSize: '30px' }}></i>
        </div>
      ))}


      <div style={{ flex: '1 1 calc(50% - 20px)', margin: '10px' }}>
        <h5>Sales Overview</h5>
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      </div>

      <div style={{ flex: '1 1 calc(50% - 20px)', margin: '10px' }}>
        <h5>Revenue Breakdown</h5>
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </div>
      <div style={{ flex: '1 1 100%', margin: '10px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
        <h5>Recent Activity</h5>
        {tables.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgb(30, 28, 28)', padding: '10px 0' }}>
            <img src={item.src} alt={item.title} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '15px' }} />
            <div>
              <h6>{item.title}</h6>
              <p style={{ color: item.color }}>{item.text}</p>
            </div>
            <span style={{ marginLeft: 'auto', color: '#999' }}>{item.time}</span>
          </div>
        ))}
      </div>

      {social_card.map((list, index) => (
        <div key={index} style={{ flex: '1 1 calc(33.333% - 20px)', margin: '10px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
            <i className={list.icon} style={{ fontSize: '36px', marginRight: '15px' }}>{list.icon}
            </i>
            <div>
              <h3>{list.amount}</h3>
              <h5 style={{ color: list.color }}>{list.percentage} <span style={{ color: '#999' }}>Total Likes</span></h5>
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <h6>Target: {list.target}</h6>
            <ProgressBar variant={list.progress_bg} now={list.progress} style={{ height: '6px' }} />
            <h6 style={{ marginTop: '15px' }}>Duration: {list.duration}</h6>
            <ProgressBar variant={list.progress_bg_2} now={list.progress2} style={{ height: '6px' }} />
          </div>
        </div>
        
      ))}
    </div>
    
    
  );
};

export default Home;