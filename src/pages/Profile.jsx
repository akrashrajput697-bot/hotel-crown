import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '../style/Profile.css';

function Profile({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); // false = Login mode, true = Register mode
  const [showPassword, setShowPassword] = useState(false);

  // Jab bhi modal band ho, fields aur states ko clear kar dein
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setAgree(false);
      setIsEmailFormOpen(false);
      setIsSignUpMode(false);
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Google Sign-In / Sign-Up Handler
  const handleGoogleSignIn = async () => {
    if (!agree) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google user logged in:", result.user);
      onClose();
    } catch (error) {
      console.error("Google login error:", error.message);
      alert(error.message);
    }
  };

  // Email & Password Auth Handler (Login vs Register)
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    try {
      if (isSignUpMode) {
        // Create New Account
        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Account created:", newUserCredential.user);
        alert("Account created successfully!");
        onClose();
      } else {
        // Login Existing Account
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in:", userCredential.user);
        onClose();
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="signin-overlay" onClick={onClose}>
      <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {/* Top Header Toggle Tabs for Login vs Sign Up */}
        <div className="auth-mode-tabs" style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <button 
            type="button"
            onClick={() => { setIsSignUpMode(false); setIsEmailFormOpen(true); }}
            style={{
              flex: 1,
              padding: '10px',
              background: 'none',
              border: 'none',
              borderBottom: !isSignUpMode ? '2px solid #2563eb' : 'none',
              fontWeight: !isSignUpMode ? 'bold' : 'normal',
              color: !isSignUpMode ? '#2563eb' : '#64748b',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => { setIsSignUpMode(true); setIsEmailFormOpen(true); }}
            style={{
              flex: 1,
              padding: '10px',
              background: 'none',
              border: 'none',
              borderBottom: isSignUpMode ? '2px solid #2563eb' : 'none',
              fontWeight: isSignUpMode ? 'bold' : 'normal',
              color: isSignUpMode ? '#2563eb' : '#64748b',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>

        <h2>{isSignUpMode ? "Create an account" : "Welcome back"}</h2>
        <p className="modal-subtext">Then start booking your favorite rooms!</p>

        {/* Terms Checkbox */}
        <div className="terms-group">
          <input 
            type="checkbox" 
            id="terms" 
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
        </div>

        {/* Google Sign-In Button */}
        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '10px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Continue with Email Button & Form Toggle */}
        {!isEmailFormOpen ? (
          <button 
            onClick={() => setIsEmailFormOpen(true)} 
            className="email-option-btn"
          >
            Continue with email
          </button>
        ) : (
          <form onSubmit={handleEmailAuth} className="signin-form" autoComplete="off">
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required 
              />
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
              <label>Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required 
                style={{ paddingRight: '40px' }}
              />
              {/* Password Eye Toggle Icon */}
              <span 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '36px',
                  cursor: 'pointer',
                  color: '#64748b',
                  userSelect: 'none'
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </span>
            </div>

            <button type="submit" className="signin-submit-btn">
              {isSignUpMode ? "Sign Up" : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;