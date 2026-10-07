import React from 'react';
import '../Style/About.css';
import { Sparkles, Compass, Crown, Star, ShieldCheck } from 'lucide-react';

function About() {
  return (
    <div className="about-page">
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-kicker">Welcome To The Regal</span>
          <h1>A Legacy of Timeless Elegance</h1>
          <p>Immerse yourself in a sanctuary where heritage craftsmanship meets contemporary luxury.</p>
          <div className="hero-trust-bar">
            <div className="hero-trust-item"><Crown size={16} /> 5-Star Luxury</div>
            <div className="hero-trust-item"><ShieldCheck size={16} /> Premium Hospitality</div>
            <div className="hero-trust-item"><Star size={16} /> Award Winning</div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="rg-about-wrap">
          <div className="rg-story-layout">
            <div className="rg-story-text">
              <span className="section-subtitle">Our Story</span>
              <h2>Crafting Unforgettable Stays Since Inception</h2>
              <p>
                At <strong>Regal Hotel &amp; Residences</strong>, we believe that hospitality is an art form. From the moment you step through our doors, our dedicated team ensures every detail of your stay is curated to perfection.
              </p>
              <p>
                We blend traditional warmth with contemporary sophistication, giving our esteemed guests an environment of supreme relaxation and effortless elegance.
              </p>

              <div className="about-stats">
                <div className="stat-box">
                  <h3>15+</h3>
                  <p>Years of Legacy</p>
                </div>
                <div className="stat-box">
                  <h3>120+</h3>
                  <p>Luxury Suites</p>
                </div>
                <div className="stat-box">
                  <h3>99%</h3>
                  <p>Happy Guests</p>
                </div>
              </div>
            </div>

            <div className="rg-story-gallery">
              <figure className="rg-story-photo">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Grand Lobby"
                />
                <figcaption>Grand Lobby</figcaption>
              </figure>
              <figure className="rg-story-photo">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Suite"
                />
                <figcaption>Royal Suite</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="about-vision-section">
        <div className="rg-about-wrap">
          <div className="section-header-center">
            <span className="section-subtitle">Our Purpose</span>
            <h2>Driven by Excellence &amp; Vision</h2>
            <p>Discover the core principles that guide our commitment to world-class hospitality.</p>
          </div>
          <div className="vision-grid">
            <div className="vision-card">
              <div className="vision-icon-wrap"><Compass size={24} /></div>
              <h3>Our Vision</h3>
              <p>To redefine global luxury standards by creating personalized sanctuaries where every guest experiences unmatched comfort, privacy, and refinement.</p>
            </div>
            <div className="vision-card">
              <div className="vision-icon-wrap"><Sparkles size={24} /></div>
              <h3>Our Mission</h3>
              <p>To deliver flawless, intuitive service powered by passionate professionals, combining modern architecture with timeless hospitality traditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section">
        <div className="rg-about-wrap">
          <div className="section-header-center">
            <span className="section-subtitle">Core Values</span>
            <h2>The Pillars of Our Service</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div>
                <span className="value-number">01</span>
                <div className="value-icon-box"><Crown size={22} /></div>
                <h3>Uncompromised Quality</h3>
              </div>
              <p>Every element from linens to dining is handpicked to maintain supreme luxury standards.</p>
            </div>
            <div className="value-card">
              <div>
                <span className="value-number">02</span>
                <div className="value-icon-box"><ShieldCheck size={22} /></div>
                <h3>Absolute Privacy</h3>
              </div>
              <p>Your peace and security are safeguarded with discreet, top-tier hospitality management.</p>
            </div>
            <div className="value-card">
              <div>
                <span className="value-number">03</span>
                <div className="value-icon-box"><Star size={22} /></div>
                <h3>Tailored Experiences</h3>
              </div>
              <p>We craft unique itineraries and personalized services tailored to your lifestyle.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;