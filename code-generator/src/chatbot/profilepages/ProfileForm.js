// src/components/ProfileForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosInstance';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    user: {
      name: '',
      email: '',
      password: ''
    },
    bio: '',
    location: '',
    birth_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('user.')) {
      const userField = name.split('.')[1];
      setProfile({ ...profile, user: { ...profile.user, [userField]: value } });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/profiles/', profile)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error creating profile:', error);
      });
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="user.name" value={profile.user.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="user.email" value={profile.user.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="user.password" value={profile.user.password} onChange={handleChange} />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={profile.bio} onChange={handleChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={profile.location} onChange={handleChange} />
        </label>
        <label>
          Birth Date:
          <input type="date" name="birth_date" value={profile.birth_date} onChange={handleChange} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProfileForm;
