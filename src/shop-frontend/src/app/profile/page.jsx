"use client"
import { useState, useEffect } from 'react';

export default function Page() {
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    try {
      const response = await fetch('http://localhost:4040/api/v1/user/info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': document.cookie
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []); // Run once on component mount

  return (
    <div>
      {userData && (
        <div>
          <h1>User Data</h1>
          <p>Email: {userData.email}</p>
          {/* Display other user details as needed */}
        </div>
      )}
      <div>{req.headers.cookie}</div>
    </div>
  );
}
