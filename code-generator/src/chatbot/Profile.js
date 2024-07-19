// Profile.js

import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Adjust import path as per your setup
import {
    Typography,
    Switch,
    Input,
    Button,
    Checkbox,
  } from "@material-tailwind/react";

const Profile = () => {
  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    verified: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profile/');
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        setError('Failed to fetch profile. Please login again.');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProfile({
      ...profile,
      [name]: val,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axiosInstance.patch('/api/profile/', profile);
      setProfile(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (


    <div className="max-w-[32rem]">
        <div style={{marginBottom:"20px"}}>
        <Typography variant="h5" className='mb-5'>
            Full Name
        </Typography>
        <Input label="Full Name" size="lg" name="full_name" value={profile.full_name} onChange={handleInputChange}/>
        </div>
        <div style={{marginBottom:"20px"}}>
        <Typography variant="h5" className='mb-5'>
            Bio
        </Typography>
        <Input label="Bio" size="lg" name="bio" value={profile.bio} onChange={handleInputChange}/>
        </div>
        <Button
            variant="text"
            color="red"
            onClick={handleUpdateProfile}
            className="mr-1"
          >
            <span>Save</span>
          </Button>
  
    
    </div>
  );
};

export default Profile;
