import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard', { // Replace with your API endpoint
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token
          },
        });

        if (response.status === 401) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setCards(data.cards); // Assuming the API returns an array of card objects
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch dashboard data');
          setLoading(false);
        }
      } catch (err) {
        setError('An error occurred while fetching dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  },);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
              cursor: 'pointer',
            }}
          >
            <Link to={`/map/${card.id}`}>
              <h3>Card {card.id}</h3>
              <p>{card.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
