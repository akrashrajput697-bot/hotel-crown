import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../style/Blog.css';

export default function Blog() {
  const latestArticles = [
    {
      image: "https://api.hotelcrowncp.com/Uploads/Blogs/59a504d1-08d6-4918-ac18-f5589d45e984.jpg",
      date: "Sep 7, 2026",
      tag: "TRAVEL TIPS",
      title: "Best Hotel Near Centaurus Mall Islamabad: Why Crown CP Is a Smart Choice for Your Stay",
      description: "Looking for a hotel near Centaurus Mall Islamabad? Discover Crown CP Hotel with premium rooms, breakfast, parking and easy access to Centaurus Mall.",
      link: "#" // Yeh untouched hai
    },
    {
      image: "https://api.hotelcrowncp.com/Uploads/Blogs/05a4765a-44f5-4dd4-9c07-a609c4e12517.jpg",
      date: "Aug 25, 2026",
      tag: "TRAVEL TIPS",
      title: "Hotel Near PIMS Islamabad: Stay Guide for Medical Visits",
      description: "A medical trip to Islamabad needs different planning from a normal city stay. You may be visiting for an outpatient appointment, diagnostic tests, a procedure, or to support a family member who has been admitted.",
      link: "/blog/hotel-near-pims-islamabad" // Yeh untouched hai
    },
    {
      image: "https://api.hotelcrowncp.com/Uploads/Blogs/44bab444-9d92-44cc-9c85-49a1816648c8.jpg",
      date: "Aug 20, 2026",
      tag: "TRAVEL TIPS",
      title: "Two Days in Islamabad: A Practical Weekend Itinerary for First-Time Visitors",
      description: "Follow a route-efficient two-day Islamabad itinerary covering Faisal Mosque, Pakistan Monument, Lok Virsa, the Margalla Hills and central shopping.",
      link: "/blog/islamabad-weekend-trip-from-lahore" // Yeh untouched hai
    },
    {
      image: "https://api.hotelcrowncp.com/Uploads/Blogs/14078ea1-9d33-46e7-ad59-3a672e98a585.png",
      date: "Aug 15, 2026",
      tag: "STAYING IN BLUE AREA",
      title: "Why Staying in Blue Area, Islamabad is Ideal for Business & Leisure",
      description: "Discover why Blue Area is the prime location to stay in Islamabad, offering close proximity to corporate offices, dining, and prime city attractions.",
      link: "/blog/staying-in-blue-area-islamabad" // Yeh untouched hai
    },
    {
      image: "https://api.hotelcrowncp.com/Uploads/Blogs/0b0c58ff-057a-47e2-99e4-99ae48fd0ea2.jpg",
      date: "Aug 10, 2026",
      tag: "FAMILY TRAVEL",
      title: "How to Choose a Family Hotel in Islamabad: Essential Tips & Amenities",
      description: "Planning a family trip? Learn what essential amenities, security features, and spacious room options to look for when booking a family-friendly hotel.",
      link: "#" // Yeh untouched hai
    },
    {
      image: "https://api.hotelcrowncp.com/Uploads/Blogs/e4b305ac-5b5b-43a5-b9db-1ae8447b15d2.jpg",
      date: "Aug 5, 2026",
      tag: "VISITORS GUIDE",
      title: "Visiting Islamabad for US Embassy Appointment? Best Hotel Options",
      description: "Heading to Islamabad for visa interviews? Find out the most convenient hotels near the diplomatic enclave and US Embassy with comfortable amenities.",
      link: "#" // Yeh untouched hai
    }
  ];

  return (
    <div className="blog-page">
      <Helmet>
        <title>Travel Guides & Hotel Blog | Hotel Crown CP Islamabad</title>
        <meta 
          name="description" 
          content="Read travel guides, tips for visiting Islamabad, weekend itineraries, and stay updates from Hotel Crown CP located in Blue Area, Islamabad." 
        />
        <link rel="canonical" href="https://hotelcrowncp.com/blog" />
        <meta name="keywords" content="Crown Plaza blog, Islamabad travel guide, hotel news Pakistan, tourism tips Islamabad, hospitality blog" />
      </Helmet>

      {/* Blog Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-overlay">
          <div className="blog-hero-content">
            <h5>Hotel Crown CP Islamabad</h5>
            <h1>Our Blog</h1>
            <p>Stories, travel guides, and inspiration for your next stay in Islamabad.</p>
          </div>
        </div>
      </section>

      {/* Featured Blog Section (Main Card Linked to BlogPostDetail) */}
      <section className="featured-blog-section">
        <div className="blog-container">
          <div className="featured-blog-card">
            
            <Link to="/blog/islamabad-weekend-trip-from-lahore" className="featured-blog-img">
              <img 
                src="https://api.hotelcrowncp.com/Uploads/Blogs/47779dfd-351e-4314-be93-64a03029d4fa.jpg" 
                alt="Islamabad Weekend Trip From Lahore" 
              />
            </Link>

            <div className="featured-blog-content">
              <span className="blog-tag">FEATURED • TRAVEL TIPS</span>
              
              <h2>
                <Link to="/blog/islamabad-weekend-trip-from-lahore" className="featured-title-link">
                  Islamabad Weekend Trip From Lahore: Complete Travel Guide, Itinerary & Where to Stay
                </Link>
              </h2>

              <p>
                Planning an Islamabad weekend trip from Lahore? Explore travel time, route, 2-day itinerary, places to visit and where to stay in Islamabad.
              </p>
              
              <div className="blog-card-footer">
                <span className="blog-date">Sep 8, 2026</span>
                <Link to="/blog/islamabad-weekend-trip-from-lahore" className="read-article-btn">
                  Read Article <span className="arrow">↗</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Latest from Crowne Plaza Section */}
      <section className="latest-articles-section">
        <div className="blog-container">
          
          <div className="latest-header-row">
            <div className="latest-titles">
              <span className="small-sub-title">ALL ARTICLES</span>
              <h2>Latest from Crowne Plaza</h2>
            </div>
            <span className="stories-count">6 stories</span>
          </div>

          <div className="articles-grid">
            {latestArticles.map((article, index) => (
              <div className="article-card" key={index}>
                <Link to={article.link} className="article-img-box">
                  <img src={article.image} alt={article.title} />
                  <span className="article-date-badge">{article.date}</span>
                </Link>
                <div className="article-content">
                  <span className="article-tag">{article.tag}</span>
                  <h3>
                    <Link to={article.link} className="article-title-link">
                      {article.title}
                    </Link>
                  </h3>
                  <p>{article.description}</p>
                  
                  <div className="article-footer">
                    <Link to={article.link} className="read-more-link">
                      Read More
                    </Link>
                    <Link to={article.link} className="read-more-icon-btn">
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}