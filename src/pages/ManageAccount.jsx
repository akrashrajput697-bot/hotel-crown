import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faShieldHalved, faUserShield, faTriangleExclamation, faCheckCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { getAuth, deleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword, PhoneAuthProvider, multiFactor, RecaptchaVerifier, onAuthStateChanged } from 'firebase/auth';
import '../style/ManageAccount.css';

export default function ManageAccount() {
  const [userInfo, setUserInfo] = useState({
    name: 'Akra Rajput',
    email: 'akrashrajput697@gmail.com'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const auth = getAuth();
    
    // Fetch logged-in user details dynamically
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || user.email.split('@')[0] || 'User',
          email: user.email || 'No Email'
        });
      }
    });

    // Initialize invisible reCAPTCHA verifier for phone auth/MFA
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {}
      });
    }

    return () => unsubscribe();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ text: 'New passwords do not match!', type: 'error' });
      return;
    }
    if (passwords.newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' });
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, passwords.currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, passwords.newPassword);

        setMessage({ text: 'Password updated successfully!', type: 'success' });
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ text: 'No active user found. Please sign in again.', type: 'error' });
      }
    } catch (error) {
      console.error("Password update error:", error);
      setMessage({ text: 'Failed to update password. Check your current password.', type: 'error' });
    }

    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleEnable2FA = async () => {
    const phoneNumber = window.prompt("Enter your phone number for 2FA (e.g., +923001234567):");
    if (!phoneNumber) return;

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Please sign in first.");
        return;
      }

      const session = await multiFactor(user).getSession();
      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const recaptchaVerifier = window.recaptchaVerifier;

      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        { phoneNumber, session },
        recaptchaVerifier
      );

      const verificationCode = window.prompt("Enter the 6-digit verification code:");
      if (!verificationCode) return;

      const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
      const multiFactorAssertion = PhoneAuthProvider.credential(cred);

      await multiFactor(user).enroll(multiFactorAssertion, "Primary Phone");
      alert("Two-Factor Authentication enabled successfully!");

    } catch (error) {
      console.error("2FA Error:", error);
      alert("Failed to enable 2FA. Make sure the test phone number and code match Firebase Console settings.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          await deleteUser(user);
        }
        
        localStorage.clear();
        alert('Account deleted successfully.');
        window.location.href = '/';
      } catch (error) {
        console.error("Error deleting user:", error);
        alert('For security reasons, please sign out and sign back in before deleting your account.');
      }
    }
  };

  return (
    <div className="manage-account-container">
      <Helmet>
        <title>Manage Account & Security | Hotel Crown CP Islamabad</title>
        <meta name="description" content="Manage your Hotel Crown CP account security, update your password, enable two-factor authentication (2FA), and control sign-in methods." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div id="recaptcha-container"></div>

      {/* Dynamic Top Banner */}
      <div className="account-top-banner">
        <div className="banner-avatar">{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}</div>
        <div className="banner-info">
          <h2>{userInfo.name}</h2>
          <p>{userInfo.email}</p>
        </div>
      </div>

      <div className="manage-account-header">
        <h1>Manage Account & Security</h1>
        <p>Control your password, sign-in methods, and account security preferences.</p>
      </div>

      {message.text && (
        <div className={`account-alert ${message.type}`}>
          <FontAwesomeIcon icon={message.type === 'success' ? faCheckCircle : faTriangleExclamation} />
          <span>{message.text}</span>
        </div>
      )}

      <div className="account-sections-grid">
        <div className="account-card">
          <div className="card-title-flex">
            <FontAwesomeIcon icon={faLock} className="card-icon" />
            <h3>Change Password</h3>
          </div>
          <p className="card-desc">Choose a strong, unique password to secure your account.</p>
          
          <form onSubmit={handlePasswordSubmit} className="account-form">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  name="currentPassword"
                  placeholder="••••••••"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="eye-icon-btn" onClick={() => toggleVisibility('current')}>
                  <FontAwesomeIcon icon={showPassword.current ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="At least 6 characters"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="eye-icon-btn" onClick={() => toggleVisibility('new')}>
                  <FontAwesomeIcon icon={showPassword.new ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <span className="eye-icon-btn" onClick={() => toggleVisibility('confirm')}>
                  <FontAwesomeIcon icon={showPassword.confirm ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            <button type="submit" className="account-primary-btn">
              Update Password
            </button>
          </form>
        </div>

        <div className="account-card-right">
          <div className="account-card">
            <div className="card-title-flex">
              <FontAwesomeIcon icon={faShieldHalved} className="card-icon" />
              <h3>Security & Sign-In</h3>
            </div>
            <p className="card-desc">Manage your connected apps and authentication methods.</p>
            
            <div className="security-item">
              <div className="security-item-left">
                <FontAwesomeIcon icon={faGoogle} className="sec-brand-icon" />
                <div>
                  <h4>Google Sign-In</h4>
                  <p>{userInfo.email}</p>
                </div>
              </div>
              <span className="status-badge active">Connected</span>
            </div>

            <div className="security-item">
              <div className="security-item-left">
                <FontAwesomeIcon icon={faUserShield} className="sec-brand-icon secondary" />
                <div>
                  <h4>Two-Factor Authentication</h4>
                  <p>Protect your account with an extra verification step.</p>
                </div>
              </div>
              <button type="button" className="account-outline-btn" onClick={handleEnable2FA}>
                Enable
              </button>
            </div>
          </div>

          <div className="account-card danger-zone">
            <div className="card-title-flex danger-title">
              <FontAwesomeIcon icon={faTriangleExclamation} className="card-icon danger" />
              <h3>Delete Account</h3>
            </div>
            <p className="card-desc">Permanently remove your profile and all associated booking history from Hotel Crown CP.</p>
            <button 
              type="button" 
              className="account-danger-btn"
              onClick={handleDeleteAccount}
            >
              Delete Account Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}