// src/components/ProfileDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axiosInstance';

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get(`/profiles/${id}/`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/profiles/${id}/`, profile)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Profile</h1>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileDetail;
