import React from 'react';
import '../Style/Footer.css';
import ScrollToTop from './ScrollToTop'; // ScrollToTop component import kiya

function Footer() {
  return (
    <footer className="regal-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Comfort & Convenience Section */}
      <div className="footer-convenience-section">
        <div className="convenience-container">
          <div className="convenience-header">
            <span className="convenience-kicker">COMFORT &amp; CONVENIENCE</span>
            <h3>Why Choose Regal Hotel &amp; Residences?</h3>
            <p>At Regal Hotel &amp; Residences, every facility is thoughtfully designed to make your stay exceptionally comfortable, convenient, and memorable. From secure parking and lightning-fast internet to dedicated room service, gourmet breakfast, and personalized assistance, we offer everything you need for a truly relaxing luxury experience.</p>
          </div>

          <div className="convenience-grid">
            {/* 1. Complimentary Breakfast */}
            <div className="convenience-card">
              <div className="convenience-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a3 3 0 0 1 0 6h-1"></path>
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path>
                  <path d="M7 2v4"></path>
                  <path d="M11 2v4"></path>
                  <path d="M15 2v4"></path>
                </svg>
              </div>
              <h4>Gourmet Breakfast</h4>
              <p>Start your morning with a fresh, satisfying, and chef-prepared breakfast, served with warm hospitality to energize you for a wonderful day ahead.</p>
            </div>

            {/* 2. Fast Internet */}
            <div className="convenience-card">
              <div className="convenience-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h.01"></path>
                  <path d="M8.5 16.4a5 5 0 0 1 7 0"></path>
                  <path d="M5 12.8a10 10 0 0 1 14 0"></path>
                  <path d="M2 9.2a15 15 0 0 1 20 0"></path>
                </svg>
              </div>
              <h4>High-Speed Wi-Fi</h4>
              <p>Stay seamlessly connected with high-speed fiber internet throughout the premises, perfect for business travelers, remote work, and entertainment.</p>
            </div>

            {/* 3. Secure Parking */}
            <div className="convenience-card">
              <div className="convenience-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="18" height="11" rx="2"></rect>
                  <circle cx="6" cy="17" r="2"></circle>
                  <circle cx="16" cy="17" r="2"></circle>
                  <path d="M5 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path>
                </svg>
              </div>
              <h4>Secure Parking</h4>
              <p>Enjoy complete peace of mind with our dedicated, secure parking spaces, ideal for guests arriving with private or rented vehicles.</p>
            </div>

            {/* 4. Room Service */}
            <div className="convenience-card">
              <div className="convenience-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18"></path>
                  <path d="M12 3v9"></path>
                  <path d="M5 12a7 7 0 0 0 14 0"></path>
                  <path d="M19 21H5"></path>
                </svg>
              </div>
              <h4>24/7 Room Service</h4>
              <p>Relax in the absolute comfort of your room with our responsive, round-the-clock room service offering delectable meals, snacks, and refreshments.</p>
            </div>

            {/* 5. Hot Water & Heating */}
            <div className="convenience-card">
              <div className="convenience-icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9a4 4 0 0 0-2 7.5V18a2 2 0 0 0 4 0v-1.5A4 4 0 0 0 12 9z"></path>
                  <path d="M9 5h6"></path>
                  <path d="M10 2h4"></path>
                </svg>
              </div>
              <h4>Climate Control &amp; Heating</h4>
              <p>Experience complete comfort in any weather with advanced climate control and steady hot water supplies, ensuring a cozy ambiance year-round.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Testimonials Section */}
      <section className="regal-testimonials-section" aria-labelledby="testimonials-title">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="testimonials-kicker">
              <span className="testimonials-kicker-line" />
              Guest Experiences
            </span>
            <h2 className="testimonials-title" id="testimonials-title">
              Loved by those who <em>know luxury.</em>
            </h2>
            <p className="testimonials-desc">
              Read authentic feedback from our esteemed guests who experienced our world-class hospitality.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-quote">
                &ldquo;An absolute masterpiece of a hotel. The attention to detail, the warmth of the staff, and the breathtaking views from the penthouse made our anniversary unforgettable.&rdquo;
              </p>
              <div className="testimonial-author">
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Sophia Laurent" loading="lazy" />
                <div>
                  <h4>Sophia Laurent</h4>
                  <span>Verified Guest • Executive Suite</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-quote">
                &ldquo;The finest dining and spa experiences I have ever encountered in a city hotel. Seamless check-in and absolute serenity despite being right in the heart of the town.&rdquo;
              </p>
              <div className="testimonial-author">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Alexander Wright" loading="lazy" />
                <div>
                  <h4>Alexander Wright</h4>
                  <span>Verified Guest • Deluxe King Room</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="testimonial-quote">
                &ldquo;From the private butler service to the stunning infinity pool at sunset, The Regal truly redefines luxury. I cannot wait to return for my next business retreat.&rdquo;
              </p>
              <div className="testimonial-author">
                <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Elena Rostova" loading="lazy" />
                <div>
                  <h4>Elena Rostova</h4>
                  <span>Verified Guest • Presidential Penthouse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Links & Newsletter */}
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <h3 className="footer-logo">REGAL HOTEL</h3>
            <p className="footer-tagline">
              A sanctuary of timeless elegance &amp; modern luxury. Experience uncompromised comfort at Regal Hotel &amp; Residences.
            </p>
          </div>

          <div className="footer-newsletter-col">
            <h4>Stay Connected</h4>
            <p>Subscribe to receive exclusive offers, updates, and news about Regal Hotel &amp; Residences.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required aria-label="Email address for newsletter" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h5>Navigation</h5>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#rooms">Rooms &amp; Suites</a></li>
              <li><a href="#amenities">Facilities</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5>Experiences</h5>
            <ul>
              <li><a href="#dining">Fine Dining</a></li>
              <li><a href="#spa">Spa &amp; Wellness</a></li>
              <li><a href="#pool">Infinity Pool</a></li>
              <li><a href="#entertainment">Recreation</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5>Contact Us</h5>
            <ul className="footer-contact-info">
              <li>123 Luxury Avenue, Metropolis</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Email: info@regalhotelresidences.com</li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5>Follow Us</h5>
            <div className="footer-social-icons">
              <a href="#facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#youtube" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Regal Hotel &amp; Residences. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Yahan ScrollToTop component add kar diya hai taake har page par show ho */}
      <ScrollToTop />
    </footer>
  );
}

export default Footer;