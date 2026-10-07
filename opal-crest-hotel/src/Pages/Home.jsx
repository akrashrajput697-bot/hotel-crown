import React from 'react';
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

function Home() {
  return (
    <>
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
              <div className="feature-item">
                <span className="feature-icon">
                  <FeatureIcon type="suite" />
                </span>
                <h3>Luxury Suites</h3>
              </div>

              <div className="feature-item">
                <span className="feature-icon">
                  <FeatureIcon type="dining" />
                </span>
                <h3>Fine Dining</h3>
              </div>

              <div className="feature-item">
                <span className="feature-icon">
                  <FeatureIcon type="wellness" />
                </span>
                <h3>Wellness &amp; Spa</h3>
              </div>
            </div>

            <a className="about-btn" href="#about-details">
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
            </a>
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
                  src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000"
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
                    <span>From</span> $350<small> / night</small>
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

            <article className="room-card">
              <a className="room-image-link" href="#booking" aria-label="Explore the Executive Suite">
                <img
                  className="room-image"
                  src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Elegant executive suite with a separate lounge area"
                  loading="lazy"
                />
                <span className="room-image-shade" />
                <span className="room-badge">More room to unwind</span>
                <span className="room-image-action">
                  Discover room <span aria-hidden="true">↗</span>
                </span>
              </a>

              <div className="room-info">
                <div className="room-price-row">
                  <span className="room-category">Extra space</span>
                  <span className="room-price">
                    <span>From</span> $550<small> / night</small>
                  </span>
                </div>

                <h3 className="room-name">Executive Suite</h3>
                <p className="room-details">
                  A separate living area, considered amenities, and panoramic
                  skyline views.
                </p>

                <ul className="room-perks" aria-label="Executive Suite highlights">
                  <li><span aria-hidden="true" />Separate lounge</li>
                  <li><span aria-hidden="true" />Panoramic views</li>
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

            <article className="room-card">
              <a className="room-image-link" href="#booking" aria-label="Explore the Presidential Penthouse">
                <img
                  className="room-image"
                  src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Refined penthouse bedroom with warm natural light"
                  loading="lazy"
                />
                <span className="room-image-shade" />
                <span className="room-badge">The signature stay</span>
                <span className="room-image-action">
                  Discover room <span aria-hidden="true">↗</span>
                </span>
              </a>

              <div className="room-info">
                <div className="room-price-row">
                  <span className="room-category">The finest stay</span>
                  <span className="room-price">
                    <span>From</span> $1,200<small> / night</small>
                  </span>
                </div>

                <h3 className="room-name">Presidential Penthouse</h3>
                <p className="room-details">
                  Our most private escape, with a terrace, personal butler service,
                  and lavish interiors.
                </p>

                <ul className="room-perks" aria-label="Presidential Penthouse highlights">
                  <li><span aria-hidden="true" />Private terrace</li>
                  <li><span aria-hidden="true" />Butler service</li>
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

      {/* Facilities / Amenities Zig-Zag Section */}
      <section className="regal-amenities-section" id="amenities" aria-labelledby="amenities-title">
        <div className="amenities-container">
          <div className="amenities-header text-center">
            <span className="amenities-kicker">
              What You Will Enjoy
            </span>
            <h2 className="amenities-title" id="amenities-title">
              Facilities at <em>The Regal</em>
            </h2>
            <p className="amenities-desc">
              Experience more than just a stay at The Regal. From fine dining and soothing spa treatments to fitness, leisure, and pool facilities designed for your ultimate comfort.
            </p>
          </div>

          <div className="amenities-zigzag-list">
            <div className="zigzag-row">
              <div className="zigzag-image">
                <img 
                  src="https://images.pexels.com/photos/32981891/pexels-photo-32981891.jpeg" 
                  alt="Fine Dining Restaurant" 
                  loading="lazy" 
                />
              </div>
              <div className="zigzag-content">
                <h3>Kublais Den Restaurant</h3>
                <p>
                  Enjoy a rich dining experience at Kublais Den Restaurant, where fresh ingredients, warm hospitality, and scenic surroundings come together. From traditional dishes to continental favourites, our restaurant is perfect for family dinners, group meals, romantic evenings, and relaxing food experiences.
                </p>
                <a href="#dining" className="zigzag-btn">Dine With Us</a>
              </div>
            </div>

            <div className="zigzag-row reverse">
              <div className="zigzag-image">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=870&auto=format&fit=crop" 
                  alt="Fitness & Gym" 
                  loading="lazy" 
                />
              </div>
              <div className="zigzag-content">
                <h3>Fitness &amp; Gym</h3>
                <p>
                  Stay active during your trip with our modern gym facility, designed for guests who want to maintain their fitness routine while enjoying the views. Equipped for light workouts and daily exercise, our fitness area adds comfort, convenience, and wellness to your stay.
                </p>
                <a href="#fitness" className="zigzag-btn">Stay Fit With Us</a>
              </div>
            </div>

            <div className="zigzag-row">
              <div className="zigzag-image">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1723489360240-e1896c1af32a?q=80&w=870&auto=format&fit=crop" 
                  alt="Spa & Wellness" 
                  loading="lazy" 
                />
              </div>
              <div className="zigzag-content">
                <h3>Spa &amp; Wellness</h3>
                <p>
                  Rejuvenate your mind, body, and soul with our signature therapies and holistic wellness treatments. Let our expert therapists melt away your stress in a tranquil environment designed for complete relaxation and peace.
                </p>
                <a href="#spa" className="zigzag-btn">Book a Treatment</a>
              </div>
            </div>

            <div className="zigzag-row reverse">
              <div className="zigzag-image">
                <img 
                  src="https://images.unsplash.com/photo-1774284498049-eee34f796ce7?q=80&w=871&auto=format&fit=crop" 
                  alt="Infinity Pool" 
                  loading="lazy" 
                />
              </div>
              <div className="zigzag-content">
                <h3>Infinity Pool</h3>
                <p>
                  Take a refreshing dip in our stunning rooftop infinity pool. Whether you want to swim laps in the morning or watch the sunset over the horizon, our pool area offers an unforgettable, luxurious experience.
                </p>
                <a href="#pool" className="zigzag-btn">Explore Pool</a>
              </div>
            </div>

            <div className="zigzag-row">
              <div className="zigzag-image">
                <img 
                  src="https://images.unsplash.com/photo-1642376826232-3d2f86692bb5?w=500&auto=format&fit=crop" 
                  alt="Snooker & Indoor Entertainment" 
                  loading="lazy" 
                />
              </div>
              <div className="zigzag-content">
                <h3>Snooker &amp; Indoor Entertainment</h3>
                <p>
                  Add fun to your stay with our indoor snooker facility, perfect for friends, families, and guests looking to relax after a day of sightseeing. Enjoy a friendly game, unwind in a comfortable setting, and make your getaway more entertaining.
                </p>
                <a href="#entertainment" className="zigzag-btn">Play &amp; Relax</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;