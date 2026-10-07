import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { auth, db } from './firebase.jsx';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../style/Profilpage.css';

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Current logged-in user ko Firebase se fetch karna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Firestore se user ka data fetch karna
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Agar Firestore mein data mojood hai
          setUserProfile({
            name: docSnap.data().name || currentUser.displayName || '',
            email: currentUser.email || '',
            phone: docSnap.data().phone || '',
            address: docSnap.data().address || ''
          });
        } else {
          // Agar Firestore mein data nahi hai toh Auth se uthao
          setUserProfile({
            name: currentUser.displayName || '',
            email: currentUser.email || '',
            phone: currentUser.phoneNumber || '',
            address: ''
          });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Firestore mein user data save/update karna
        const docRef = doc(db, 'users', currentUser.uid);
        await setDoc(docRef, userProfile, { merge: true });

        setSuccessMessage('✨ Profile updated successfully in database!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      setSuccessMessage('❌ Failed to update profile.');
    }
  };

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading profile...</div>;
  }

  return (
    <div className="profile-page-container">
      <Helmet>
        <title>My Profile & Personal Information | Hotel Crown CP Islamabad</title>
        <meta name="description" content="View and update your personal profile, contact details, phone number, and address for your Hotel Crown CP account." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="profile-card">
        <div className="profile-header-section">
          <h2>My Profile</h2>
          <p className="profile-subtitle">Manage your personal information and luxury stay preferences</p>
        </div>

        {successMessage && <div className="profile-success-msg">{successMessage}</div>}

        <form onSubmit={handleSave} className="profile-form">
          <div className="profile-form-grid">
            <div className="profile-input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={userProfile.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="profile-input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
            </div>

            <div className="profile-input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="profile-input-group full-width">
              <label>Address</label>
              <div className="input-wrapper">
                <textarea
                  name="address"
                  value={userProfile.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          <div className="profile-btn-container">
            <button type="submit" className="profile-save-btn">
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}