import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../Style/Home.css';

const FeatureIcon = ({ type }) => {
  const sharedProps = {
    'aria-hidden': true,
    fill: 'none',
    height: 25,
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.6,
    viewBox: '0 0 24 24',
    width: 25,
  };

  if (type === 'suite') {
    return (
      <svg {...sharedProps}>
        <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
        <path d="M3 14h18M5 18v2m14-2v2M7 9V6a2 2 0 0 1 2-2h4v5" />
      </svg>
    );
  }

  if (type === 'dining') {
    return (
      <svg {...sharedProps}>
        <path d="M7 3v7M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 9.5V21" />
        <path d="M16 3v18m0-18c2.2 2 3.2 4.6 3.2 7.5H16" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M20.5 3.5C12 3.5 6 6.3 5 12c-.6 3.5 1.7 6 4.7 6 5.8 0 9.8-6.2 10.8-14.5Z" />
      <path d="M3.5 21c3.1-5.3 6.5-8.5 12-11.5" />
    </svg>
  );
};

/* Links ko aik jagah rakha hai, taake route badalna ho to sirf yahan badalna pare */
const featureLinkStyle = { textDecoration: 'none', color: 'inherit' };

function Home() {
  return (
    <>
      <Helmet>
        <title>The Regal | Luxury Suites & Modern Comfort</title>
        <meta name="description" content="Welcome to The Regal - A sanctuary of timeless elegance and modern luxury. Book luxury suites, fine dining, and wellness treatments." />
        <meta name="keywords" content="The Regal, luxury hotel, hotel booking, luxury suites, fine dining, spa and wellness, infinity pool, deluxe rooms, gym and fitness" />
      </Helmet>

      {/* About / Welcome Section */}
      <section className="regal-about-section" aria-labelledby="regal-about-title">
        <div className="about-container">
          <div className="about-content">
            <span className="about-subtitle">Welcome to The Regal</span>

            <h2 className="about-title" id="regal-about-title">
              A sanctuary of timeless elegance <em>&amp;</em> modern luxury
            </h2>

            <p className="about-description">
              Step through our doors and leave the city&apos;s pace behind.
              Attentive hospitality, beautifully appointed rooms, and unmatched
              comfort come together to create a serene retreat at the heart of
              it all — whether you stay for a night or a season.
            </p>

            <div className="about-features" aria-label="Hotel highlights">
              <Link className="feature-item" to="/rooms" style={featureLinkStyle}>
                <span className="feature-icon">
                  <FeatureIcon type="suite" />
                </span>
                <h3>Luxury Suites</h3>
              </Link>

              <Link className="feature-item" to="/restaurant" style={featureLinkStyle}>
                <span className="feature-icon">
                  <FeatureIcon type="dining" />
                </span>
                <h3>Fine Dining</h3>
              </Link>

              <Link className="feature-item" to="/activities#spa" style={featureLinkStyle}>
                <span className="feature-icon">
                  <FeatureIcon type="wellness" />
                </span>
                <h3>Wellness &amp; Spa</h3>
              </Link>
            </div>

            <Link className="about-btn" to="/about">
              <span>Discover more</span>
              <svg
                aria-hidden="true"
                fill="none"
                height="16"
                viewBox="0 0 20 20"
                width="16"
              >
                <path
                  d="M3.5 10h12m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </Link>
          </div>

          <div className="about-images" aria-label="A look inside The Regal">
            <figure className="img-box main-img">
              <img
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Elegant, sunlit guest room at The Regal"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="image-caption">A more restful stay</figcaption>
            </figure>

            <figure className="img-box sub-img-1">
              <img
                src="https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Thoughtful details prepared for a relaxing stay"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="image-caption">Thoughtful details</figcaption>
            </figure>

            <figure className="img-box sub-img-2">
              <img
                src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Warmly lit fine-dining restaurant"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="image-caption">Evenings to savour</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Featured Rooms & Accommodations Section */}
      <section className="regal-rooms-section" id="rooms" aria-labelledby="rooms-title">
        <div className="rooms-container">
          <div className="rooms-header">
            <div className="rooms-heading-copy">
              <span className="rooms-kicker">
                <span className="rooms-kicker-line" />
                Rooms &amp; Suites
              </span>

              <h2 className="rooms-title" id="rooms-title">
                A stay that feels <em>like your own.</em>
              </h2>

              <p className="rooms-desc">
                From peaceful rooms to generous suites, find the space that makes
                getting away feel effortless.
              </p>
            </div>

            <a className="rooms-all-link" href="#all-rooms">
              Explore all stays
              <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none">
                <path
                  d="M3.5 10h12m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="rooms-grid">
            <article className="room-card">
              <a className="room-image-link" href="#booking" aria-label="Explore the Deluxe King Room">
                <img
                  className="room-image"
                  src="https://api.envoyhotel.com/uploads/1779192349166-Executive_King_Room_(3).jpg"
                  alt="Bright deluxe king room with a comfortable sitting area"
                  loading="lazy"
                />
                <span className="room-image-shade" />
                <span className="room-badge">Guest favourite</span>
                <span className="room-image-action">
                  Discover room <span aria-hidden="true">↗</span>
                </span>
              </a>

              <div className="room-info">
                <div className="room-price-row">
                  <span className="room-category">Classic comfort</span>
                  <span className="room-price">
                    <span>From</span>80000 PRK<small> / night</small>
                  </span>
                </div>

                <h3 className="room-name">Deluxe King Room</h3>
                <p className="room-details">
                  A generous king bed, calming interiors, city views, and a modern
                  marble bathroom.
                </p>

                <ul className="room-perks" aria-label="Deluxe King Room highlights">
                  <li><span aria-hidden="true" />King bed</li>
                  <li><span aria-hidden="true" />City views</li>
                </ul>

                <a className="room-btn" href="#booking">
                  Reserve this room
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none">
                    <path
                      d="M3.5 10h12m-5-5 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;