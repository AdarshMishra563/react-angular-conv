import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WorldMapChart = ({ dataJson, mapColor }) => {
  useEffect(() => {
    const map = L.map('world-map', {
      center: [20, 0],
      zoom: 2,
      scrollWheelZoom: false, 
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    mapColor.forEach((item) => {
      const { latitude, longitude } = dataJson[item.code] || {};
      if (latitude !== undefined && longitude !== undefined) {
        const size = Math.sqrt(item.value) / 1100;

        L.circleMarker([latitude, longitude], {
          radius: size,
          color: item.color,
          fillColor: item.color,
          fillOpacity: 0.5,
        })
          .bindPopup(`<b>${item.name}</b><br>Population: ${item.value}`)
          .addTo(map);
      }
    });

    return () => map.remove();
  }, [dataJson, mapColor]);

  return <div id="world-map" style={{ width: '100%', height: '500px' }} />;
};

export default WorldMapChart;
