import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faYoutube, 
  faTiktok, 
  faInstagram, 
  faFacebookF,
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhone 
} from '@fortawesome/free-solid-svg-icons';

// --- 1. FAQ Component ---
const faqData = [
  {
    question: "Do you offer airport pickup?",
    answer: "Yes! Hotel Crown CP Islamabad provides convenient airport pickup and drop-off services from Islamabad International Airport, ensuring a smooth arrival and departure experience."
  },
  {
    question: "What are your check-in and check-out times?",
    answer: "Standard check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in or late check-out can be arranged upon request subject to availability."
  },
  {
    question: "Is breakfast included in the room rate?",
    answer: "Yes, complimentary delicious breakfast is included with all room bookings to start your day fresh."
  },
  {
    question: "Do you provide free Wi-Fi?",
    answer: "Yes, high-speed complimentary Wi-Fi is available in all rooms and public areas throughout the hotel."
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer: "Yes, you can easily cancel or modify your reservation through our website or by contacting our front desk directly, subject to our policy terms."
  },
  {
    question: "Are your rooms suitable for families and children?",
    answer: "Absolutely! We offer spacious family suites and standard double rooms equipped with everything needed for a comfortable family stay."
  },
  {
    question: "Do you offer meeting or business facilities?",
    answer: "Yes, we provide dedicated business workspaces, high-speed connectivity, and facilities tailored for corporate travellers."
  },
  {
    question: "Is parking available at the hotel?",
    answer: "Yes, secure and complimentary on-site parking is available for all our valued guests."
  }
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-top-header">
          <span className="faq-tag">FAQs</span>
          <h2>Everything You Need to Know</h2>
        </div>

        <div className="faq-content-grid">
          <div className="faq-left-column">
            <div className="faq-image-box">
              <img 
                src="https://hotelcrowncp.com/assets/images/Home/faqs.webp" 
                alt="Hotel Amenities" 
              />
            </div>
          </div>

          <div className="faq-right-column">
            {faqData.map((item, index) => (
              <div 
                className={`faq-accordion-item ${openIndex === index ? 'active' : ''}`} 
                key={index}
              >
                <div className="faq-question-bar" onClick={() => toggleFaq(index)}>
                  <h4>{item.question}</h4>
                  <span className="faq-icon-toggle">
                    {openIndex === index ? '▲' : '▼'}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="faq-answer-box">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 2. Google Reviews Component ---
function GoogleReviewsSection() {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div 
          className="reviews-left-card"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://hotelcrowncp.com/assets/images/Home/reviews.webp') center/cover no-repeat`
          }}
        >
          <div className="reviews-left-content">
            <span className="reviews-subtitle">Google Reviews</span>
            <h2 className="reviews-rating-number">4.0</h2>
            <div className="reviews-stars">★★★★★</div>
          </div>
          <div className="reviews-btn-wrapper">
            <a href="https://g.page/r/YOUR_GOOGLE_MAPS_REVIEW_LINK" target="_blank" rel="noopener noreferrer" className="leave-review-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Leave a Review <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        <div className="reviews-right-stack">
          <div className="review-card">
            <div className="review-stars-small">★★★★★</div>
            <p className="review-text">
              "I enjoyed relax clean and calm environment during my stay. It was really nice experience and I will definitely recommend to my colleagues & friends Hotel Crown CP Islamabad."
            </p>
            <h4 className="reviewer-name">Saif Afridi</h4>
          </div>

          <div className="review-card">
            <div className="review-stars-small">★★★★★</div>
            <p className="review-text">
              "The environment of Crown Hotel was fabulous. We really enjoy there. The rooms are peaceful and calm, with full of privacy. The staff was also good and caring. See you soon."
            </p>
            <h4 className="reviewer-name">Abdul Qadir</h4>
          </div>

          <div className="review-card">
            <div className="review-stars-small">★★★★★</div>
            <p className="review-text">
              "I had a chance to stay for 5 days in Crown Plaza. Location is very good in Blue Area — market and well known food chains and other brands are in same street. Centaurus Mall is nearest at almost 15 min walking distance. Rooms are very good, service is very good. Staff is welcoming. Overall very good experience."
            </p>
            <h4 className="reviewer-name">Nausherwan Moiz</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 3. Travel Blog Component ---
const blogData = [
  {
    category: "TRAVEL TIPS",
    title: "Islamabad Weekend Trip From Lahore: Complete Travel Guide, Itinerary & Where to Stay",
    date: "SEP 6, 2026",
    image: "https://api.hotelcrowncp.com/Uploads/Blogs/47779dfd-351e-4314-be93-64a03029d4fa.jpg"
  },
  {
    category: "TRAVEL TIPS",
    title: "Best Hotel Near Centaurus Mall Islamabad: Why Crown CP Is a Smart Choice for Your Stay",
    date: "SEP 7, 2026",
    image: "https://api.hotelcrowncp.com/Uploads/Blogs/59a504d1-08d6-4918-ac18-f5589d45e984.jpg"
  },
  {
    category: "TRAVEL TIPS",
    title: "Hotel Near PIMS Islamabad: Stay Guide for Medical Visits",
    date: "AUG 21, 2026",
    image: "https://api.hotelcrowncp.com/Uploads/Blogs/05a4765a-44f5-4dd4-9c07-a609c4e12517.jpg"
  }
];

function TravelBlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <span className="blog-tag">LATEST BLOG</span>
          <h2>Stories & Travel Inspiration</h2>
          <p>Discover insider tips, travel guides, and dining experiences curated to enhance your stay in Islamabad. Explore engaging stories that inspire your next adventure and help you make the most of your visit.</p>
        </div>

        <div className="blog-grid">
          {blogData.map((blog, idx) => (
            <div className="blog-card" key={idx}>
              <div className="blog-img-box">
                <img src={blog.image} alt={blog.title} />
                <span className="blog-date-badge">📅 {blog.date}</span>
              </div>
              <div className="blog-content">
                <span className="blog-category">{blog.category}</span>
                <h3>{blog.title}</h3>
                <div className="blog-footer">
                  <span className="read-more-text">Read More</span>
                  <button className="blog-arrow-btn">↗</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 4. Floating Widget Component ---
function FloatingActionWidget() {
  return (
    <div className="floating-widget-container">
      <a 
        href="https://wa.me/923241118206?text=Hi,%20I%20would%20like%20to%20inquire%20about%20room%20booking%20at%20Hotel%20Crown%20CP%20Islamabad." 
        className="floating-btn whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>

      <a 
        href="tel:+923241118206" 
        className="floating-btn call-float" 
        title="Call Us Now"
      >
        <FontAwesomeIcon icon={faPhone} />
      </a>
    </div>
  );
}

// --- Main Footer Component Including Everything in Sequence ---
function Footer() {
  return (
    <>
      {/* Sequence Wise Sections Added Above Footer */}
      <FaqSection />
      <GoogleReviewsSection />
      <TravelBlogSection />
      <FloatingActionWidget />

      {/* Asli Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-top-grid">
            {/* Column 1: Logo & Bio */}
            <div className="footer-col-brand">
              <div className="footer-logo">
                <span className="footer-logo-text">🏨 HOTEL</span>
                <h3>CROWN CP</h3>
                <small>Islamabad</small>
              </div>
              <p className="footer-bio">
                Stay at Hotel Crown CP Islamabad, ideally located in Blue Area. Enjoy modern design, luxury rooms, high-speed Wi-Fi, air-conditioning, and 24/7 support for families, business, and leisure travellers.
              </p>
              <div className="footer-social-icons">
                <a href="#" className="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
                <a href="#" className="social-icon"><FontAwesomeIcon icon={faTiktok} /></a>
                <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col-links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Blogs</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: Explore */}
            <div className="footer-col-explore">
              <h4 className="footer-heading">Explore</h4>
              <ul>
                <li><a href="#">Rooms</a></li>
                <li><a href="#">Places</a></li>
                <li><a href="#">Restaurant</a></li>
              </ul>
            </div>

            {/* Column 4: Get In Touch */}
            <div className="footer-col-contact">
              <h4 className="footer-heading">Get In Touch</h4>
              <p className="footer-address">
                99-E, Jinnah Ave, Block I G 7/2 Blue Area, Islamabad, 44000, Pakistan
              </p>
              <p className="footer-email">
                info@hotelcrowncp.com
              </p>
              
              <div className="footer-contact-item">
                <span className="contact-label-small">CALL AND WHATSAPP</span>
                <a href="tel:+923241118206" className="contact-phone">+923241118206</a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label-small">CALL AND WHATSAPP</span>
                <a href="tel:+923251118206" className="contact-phone">+923251118206</a>
              </div>

              <div className="footer-contact-item">
                <span className="contact-label-small">RECEPTION</span>
                <a href="tel:+0512347080" className="contact-phone">+051 (051) 2347080</a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Line */}
          <div className="footer-bottom-bar">
            <p>Copyright © 2026 GrowBiz Tech(Pvt) Ltd. All Rights Reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Terms and Conditions</a>
              <span>•</span>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;