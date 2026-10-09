import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Password ghalat hai ya yeh email mojood nahi. Neeche "Forgot password" try karein.');
      } else {
        setError(err.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Pehle upar box mein apni email likhein, phir Forgot Password dabayein.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg('Password reset link aapki email par bhej diya gaya hai!');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        maxWidth: '420px',
        width: '90%',
        background: '#fff',
        padding: '35px',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        position: 'relative'
      }}>
        <Link to="/" style={{
          position: 'absolute',
          top: '15px',
          right: '20px',
          fontSize: '22px',
          color: '#666',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>&times;</Link>

        <h2 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', color: '#111' }}>
          Log in to your account
        </h2>
        
        {error && <p style={{ color: 'red', fontSize: '13px', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
        {successMsg && <p style={{ color: 'green', fontSize: '13px', textAlign: 'center', marginBottom: '15px' }}>{successMsg}</p>}
        
        <form onSubmit={handleLogin} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            required
            autoComplete="off"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', outline: 'none' }}
          />

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px 45px 12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', outline: 'none' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          <div style={{ textAlign: 'right', marginTop: '-8px' }}>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '13px', cursor: 'pointer', padding: 0 }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            style={{ padding: '12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Sign in
          </button>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/signup" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}