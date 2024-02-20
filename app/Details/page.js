"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get(1);

        if (!userId) {
          setUser({ error: 'No user ID provided.' });
        } else {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
          setUser(response.data);
        }
      } catch (error) {
        setUser({ error: 'Error fetching user data.' });
        console.error('Error fetching user', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container">
      <h1>User Details</h1>
      {user && !user.error ? (
        <div className="user-info">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address.city}, {user.address.street}, {user.address.suite}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Company:</strong> {user.company.name} - {user.company.catchPhrase}</p>
        </div>
      ) : (
        <p>{user ? user.error : 'Loading...'}</p>
      )}
    </div>
  );
};

export default UserDetails;