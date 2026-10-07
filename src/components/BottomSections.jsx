import React, { useState } from 'react';

// FAQ Data
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

// Blog Data
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

// 1. FAQ Section
export function FaqSection() {
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

// 2. Google Reviews Section
export function GoogleReviewsSection() {
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

// 3. Travel Blog Section
export function TravelBlogSection() {
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
}// Isay apni BottomSections.jsx ke bilkul end mein paste kar dein
export default function BottomSections() {
  return (
    <>
      <FaqSection />
      <GoogleReviewsSection />
      <TravelBlogSection />
    </>
  );
}