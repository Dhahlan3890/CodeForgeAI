// src/components/ProfileList.js
import React, { useEffect, useState } from 'react';
import api from '../axiosInstance';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    api.get('/profiles/')
      .then(response => {
        setProfiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  }, []);

  return (
    <div>
      <h1>Profiles</h1>
      <ul>
        {profiles.map(profile => (
          <li key={profile.user.id}>
            <a href={`/profiles/${profile.user.id}`}>{profile.user.name}</a>
          </li>
        ))}
      </ul>
      <a href="/profiles/new">Create New Profile</a>
    </div>
  );
};

export default ProfileList;
