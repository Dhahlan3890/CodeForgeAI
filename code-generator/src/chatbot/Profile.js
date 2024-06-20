import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
            try {
                const response = await axios.get('http://localhost:8000/api/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data : 'Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="profile-container">
            <h1>Profile Information</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
        </div>
    );
};

export default Profile;
