import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar';
import './style.css';

const SettingsPage = () => {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const response = await axios.put('/api/users/change-password', {
        username: currentUser.username,
        currentPassword,
        newPassword
      });
      
      setMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      setTimeout(async () => {
        await logout();
        alert('Password changed successfully. Please log in with your new password.');
        navigate('/talktown');
      }, 3000);
    } catch (error) {
      setError('Failed to change password. Please check your current password.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? \nThis action cannot be undone and will delete all your posts.')) {
      try {
        await axios.delete(`/api/users/delete/${currentUser.username}`);
        await logout(); // Use the logout function in UserContext
        navigate('/');
      } catch (error) {
        setError('Failed to delete account. Please try again later.');
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div className="settings-container">
      <NavBar />
      <div className="settings-content">
        <h1>Account Settings</h1>
        
        <section className="settings-section">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="change-password-button">
              Change Password
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
          {message && (
            <div className="success-message">
              {message}
            </div>
          )}
        </section>

        <section className="settings-section danger-zone">
          <h2>Danger Zone</h2>
          <p>Once you delete your account, there is no going back. Please be certain.</p>
          <button onClick={handleDeleteAccount} className="delete-account-button">
            Delete Account
          </button>
        </section>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
      </div>
    </div>
  );
};

export default SettingsPage;