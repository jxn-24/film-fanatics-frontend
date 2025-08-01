import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ClubDetails() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch club details
    fetch(`http://localhost:5000/api/clubs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data);
        setIsMember(data.is_member); // backend should include this if you want pre-check
      })
      .catch((err) => console.error('Failed to fetch club:', err));
  }, [id]);

  const handleJoin = () => {
    fetch(`http://localhost:5000/api/clubs/${id}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(async response => {
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error joining club:', errorData);
          throw new Error(errorData.message || 'Failed to join club');
        }
        return response.json();
      })
      .then(() => {
        setIsMember(true);
        setSuccessMessage('Successfully joined the club!');
        setTimeout(() => setSuccessMessage(''), 1500);
      })
      .catch((error) => {
        console.error('Error joining club:', error);
        alert('Could not join club. Try again.');
      });
  };

  if (!club) return <div>Loading club details...</div>;

  return (
    <div style={styles.container}>
      <h2>{club.name}</h2>
      <p>{club.description}</p>

      {!isMember ? (
        <button onClick={handleJoin} style={styles.joinButton}>
          Join Club
        </button>
      ) : (
        <span style={styles.joinedText}>You are a member of this club</span>
      )}

      {successMessage && <p style={styles.success}>{successMessage}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto'
  },
  joinButton: {
    padding: '10px 20px',
    backgroundColor: '#006400',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  joinedText: {
    color: '#444',
    fontWeight: 'bold'
  },
  success: {
    color: 'green',
    marginTop: '10px'
  }
};

export default ClubDetails;
