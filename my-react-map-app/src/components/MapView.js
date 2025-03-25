import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


function MapView() {
  const { cardId } = useParams();
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(`/api/map/${cardId}`, {  // Replace with your API endpoint
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 401) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setMapData(data); // Assuming the API returns map-related data
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch map data');
          setLoading(false);
        }
      } catch (err) {
        setError('An error occurred while fetching map data');
        setLoading(false);
      }
    };

    fetchMapData();
  }, [cardId]);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mapData) {
    return <div>No map data available.</div>;
  }

  return (
    <div>
      <h2>Map View for Card {cardId}</h2>
      <MapContainer
        center={[mapData.latitude, mapData.longitude]} // Use data from your API
        zoom={10}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[mapData.latitude, mapData.longitude]}>
          <Popup>
            {mapData.popupText}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
