import React from 'react';
import { Link } from 'react-router-dom';
import '../style/BlogislamabadDetail.css';

export default function BlogDetail() {
  return (
    <div className="blog-detail-page">
      
      {/* Hero Section */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-overlay">
          <div className="blog-detail-hero-content">
            <span className="hero-subtitle">HOTEL CROWN CP ISLAMABAD</span>
            <h1 className="hero-title">Two Days in Islamabad: A Practical Weekend Itinerary for First-Time Visitors</h1>
            <p className="hero-text">
              Follow a route-efficient two-day Islamabad itinerary covering Faisal Mosque, Pakistan Monument, Lok Virsa, the Margalla Hills and central shopping.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="blog-detail-body-section">
        <div className="blog-detail-container">
          
          {/* Left Content Area */}
          <div className="blog-main-content">
            
            {/* Featured Image & Meta Info matching the reference layout */}
            <div className="blog-featured-box">
              <img 
                src="https://api.hotelcrowncp.com/Uploads/Blogs/44bab444-9d92-44cc-9c85-49a1816648c8.jpg" 
                alt="Two Days in Islamabad" 
                className="blog-main-img"
              />
            </div>

            <div className="blog-text-block">
              <p className="content-p lead-text">
                A good two-day Islamabad itinerary should feel spacious, not like a race between landmarks. For a first-time visitor, the most practical approach is to group central and cultural sights on Day One, then keep the Margalla Hills and viewpoint side of the city for Day Two. This reduces repeated cross-city driving and leaves room for meals, prayer-time changes, weather and the slower pace that families or overseas visitors may prefer.
              </p>

              <p className="content-p">
                The plan assumes a central Blue Area base such as <Link to="/contact">Hotel Crown CP</Link> and works for couples, families and weekend visitors, with alternatives for business travellers and rain. Treat the timings as planning ranges: traffic, weather and security arrangements can change. For more ideas, see Crown CP's <Link to="/nearby-attractions">Islamabad attraction guide</Link> and the guide to <Link to="/blog/best-hotel-near-centaurus-mall-islamabad">staying near Centaurus Mall Islamabad</Link>.
              </p>

              {/* DAY 1 Itinerary Flowchart Box */}
              <div className="itinerary-flow-box">
                <h3 className="itinerary-day-title">DAY 1 — CENTRAL + CULTURAL</h3>
                <div className="flow-steps-container">
                  <div className="flow-step">
                    <span className="step-name">Crown CP</span>
                    <span className="step-time">Breakfast</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Faisal Mosque</span>
                    <span className="step-time">60-75 min</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Pakistan Monument</span>
                    <span className="step-time">75-90 min</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Lok Virsa</span>
                    <span className="step-time">60-90 min</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Centaurus / Blue Area</span>
                    <span className="step-time">90-120 min</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Dinner</span>
                    <span className="step-time">60-90 min</span>
                  </div>
                </div>
              </div>

              {/* DAY 2 Itinerary Flowchart Box */}
              <div className="itinerary-flow-box">
                <h3 className="itinerary-day-title">DAY 2 — NATURE + FLEXIBLE AFTERNOON</h3>
                <div className="flow-steps-container">
                  <div className="flow-step">
                    <span className="step-name">Crown CP</span>
                    <span className="step-time">Breakfast</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Trail 3 OR Daman-e-Koh</span>
                    <span className="step-time">90-120 / 60-75 min</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">F-7 / Blue Area</span>
                    <span className="step-time">Lunch</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Family / Shopping Alternative</span>
                    <span className="step-time">90-120 min</span>
                  </div>
                  <span className="flow-arrow">➔</span>
                  <div className="flow-step">
                    <span className="step-name">Hotel / Departure</span>
                    <span className="step-time">Collect bags + buffet</span>
                  </div>
                </div>
              </div>

              <p className="content-note">
                Route logic: keep the Shakarparian cultural stops together on Day 1 and the Margalla Hills / viewpoint segment together on Day 2. Schematic only — not to scale.
              </p>

              <h2 className="content-h2">Before You Start: Keep the Geography Simple</h2>
              <p className="content-p">
                Islamabad is organised into sectors, but first-time visitors often lose time by jumping between opposite sides of the city for individual attractions. On a short weekend, think in clusters. Faisal Mosque sits towards the foothills, Pakistan Monument and Lok Virsa form a natural cultural pairing around Shakarparian. Centaurus and Blue Area are central urban zones and Daman-e-Koh or the hiking trails are up on the ridge.
              </p>

              {/* Day One Detailed Timings */}
              <div className="blog-detailed-itinerary-section">
                <h2 className="content-h2 itinerary-main-title">Day One: Faisal Mosque, Shakarparian Culture and Central Islamabad</h2>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 8:00–9:00 — Breakfast and an Unhurried Start</h3>
                  <p className="content-p">Allow 45-60 minutes for breakfast, getting ready and checking the day's weather. If you are staying at Crown CP, eating before you leave avoids an unnecessary first detour. Keep a light layer in the car outside summer, and carry water, particularly if you expect to spend time outdoors at the mosque or Monument.</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 9:15–10:30 — Faisal Mosque | Allow 60–75 Minutes</h3>
                  <p className="content-p">Begin with Faisal Mosque while the day is still relatively cool and before later traffic builds. The setting at the foot of the Margalla Hills is as important as the architecture, so allow time for the approach, courtyard and photographs rather than treating it as a five-minute photo stop. Dress respectfully, follow on-site directions and remember that this is an active place of worship, not simply a tourist attraction. On Friday, do not schedule a tight sightseeing window around Jumu'ah. Recent Islamabad Police notices show dedicated security arrangements around Faisal Mosque for Friday prayers, and visitor movement can be slower because worshippers, vehicles and security checks increase. If Friday prayer falls in the middle of your planned visit, either go earlier in the morning or move the mosque to a quieter part of the day.</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 10:45–12:15 — Pakistan Monument and Museum | Allow 75–90 Minutes</h3>
                  <p className="content-p">From Faisal Mosque, continue to the Shakarparian area for the Pakistan Monument and its museum. Give yourself roughly 75-90 minutes for the viewpoint, monument grounds and museum rather than rushing through the exhibits. Lok Virsa's official information currently lists the Pakistan Monument Museum from 10:00 to 20:00, Tuesday to Sunday, with Monday closed. Weekend travellers therefore have a useful daytime window, but it is still sensible to check the official page for same-day notices before setting out[cite: 9].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 12:15–1:15 — Lunch | Allow 45–60 Minutes</h3>
                  <p className="content-p">Keep lunch close to the Shakarparian-to-Blue Area route rather than driving across Islamabad for one famous restaurant. The purpose of this itinerary is to protect your limited sightseeing time. A straightforward meal also gives children and older travellers a proper break before the second museum stop[cite: 9].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 1:30–3:00 — Lok Virsa Heritage Museum | Allow 60–90 Minutes</h3>
                  <p className="content-p">Lok Virsa is one of the most useful stops for first-time visitors because it gives context to Pakistan's regional cultures, crafts and living traditions. The official Lok Virsa website currently publishes 10:00-20:00 visitor hours for its museums, and the Heritage Museum is in the same wider Shakarparian area as the Monument. That makes it far more efficient to visit the two on the same day than to return later from the hills or northern sectors[cite: 9].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 3:30–5:30 — Centaurus Mall or Blue Area | Allow 90–120 Minutes</h3>
                  <p className="content-p">Return towards central Islamabad for shopping, coffee or a rest. Centaurus works well for first-time visitors who want recognised brands, food and indoor entertainment in one place. If shopping is not a priority, Blue Area cafes offer a relaxed alternative[cite: 9, 10].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 6:30–8:00 — Dinner in Blue Area or a Nearby Central Sector | Allow 60–90 Minutes</h3>
                  <p className="content-p">Finish Day One without another long drive. Blue Area, F-7 and F-8 all provide central dining choices, while Crown CP also has an in-house restaurant if the group would rather stay in. This is the point to slow the itinerary down: a relaxed dinner will make an early Day Two hills start much easier[cite: 10].</p>
                </div>
              </div>

              {/* Day Two Detailed Timings */}
              <div className="blog-detailed-itinerary-section">
                <h2 className="content-h2 itinerary-main-title">Day Two: Margalla Hills, a Viewpoint and a Flexible Afternoon</h2>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 8:00–8:45 — Breakfast and Weather Check | Allow 45 Minutes</h3>
                  <p className="content-p">Check cloud, rain and visibility before committing to the hills. If the weather is poor, use the rainy-day plan later in this guide. Wear proper shoes if you intend to hike; polished city footwear is not suitable for a trail simply because the first viewpoint is relatively close[cite: 10].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 9:00–11:00 — Choose Your Margalla Hills Option</h3>
                  <p className="content-p"><strong>Active option Trail 3:</strong> CDA describes Trail 3 as one of Islamabad's best-known hiking routes and estimates roughly 30–50 minutes to reach a viewpoint, with further walking required to continue towards Pir Sohawa. For a two-day city break, do not need to complete the whole route. Allow about 90–120 minutes for a controlled out-and-back walk to a viewpoint, including rest and photographs, then turn around while you still have energy for the rest of the day[cite: 10].</p>
                  <p className="content-p" style={{marginTop: '10px'}}><strong>Lower-effort option - Daman-e-Koh:</strong> Drive to the established viewpoint instead of hiking. CDA describes Daman-e-Koh as a recreational and picnic spot with city views and notes that golf carts are used to help visitors move from the parking area towards the viewpoint. Allow around 60–75 minutes for parking, the viewpoint and a relaxed walk. This is usually the better option for young children, older relatives or anyone who wants the scenery without a steep trail[cite: 10, 11].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 11:30–12:30 — Return for Lunch | Allow 60 Minutes</h3>
                  <p className="content-p">Come back towards F-7 or Blue Area for lunch rather than continuing farther into the hills just to add another name to the itinerary. The two-day plan works because it leaves margins. If you completed a longer hike, extend lunch and shorten the afternoon activity[cite: 11].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 1:00–3:00 — Family, Shopping or Rest Alternative | Allow 90–120 Minutes</h3>
                  <p className="content-p">Families can use this window for an indoor activity at Centaurus, a relaxed park stop if the weather is pleasant, or simply hotel rest before the journey home. Couples may prefer coffee and unstructured time in a central sector. If you skipped Centaurus on Day One, this is the cleanest place to add it without disturbing the cultural route[cite: 11].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> 3:00–5:00 — Business-Traveller Alternative</h3>
                  <p className="content-p">Business travellers can replace the flexible afternoon with meetings in Blue Area or another central sector. Keep one signature sight and one cultural stop on Day One, then use Daman-e-Koh early on Day Two before returning for calls or meetings. This keeps the weekend realistic without sacrificing all sightseeing[cite: 11].</p>
                </div>

                <div className="itinerary-step-block">
                  <h3 className="itinerary-time-heading"><span className="time-indicator"></span> From 4:30 — Return, Collect Luggage and Plan Departure</h3>
                  <p className="content-p">Do not place a final attraction immediately before a flight or long road journey north. Return to the hotel, collect luggage, use the washroom, charge devices and check live traffic before leaving. Islamabad International Airport is outside the central city, so airport transfer time should be planned separately from the short journeys in this itinerary. The same applies if you are continuing towards Murree, Naran or other northern destinations: leave margin for city traffic and the conditions on your onward route[cite: 12].</p>
                </div>
              </div>

              {/* Rainy-Day Islamabad Itinerary */}
              <div className="blog-detailed-itinerary-section">
                <h2 className="content-h2 itinerary-main-title">Rainy-Day Islamabad Itinerary</h2>
                <p className="content-p">
                  If steady rain, poor visibility or slippery conditions make the Margalla Hills unattractive, do not force the outdoor plan. Keep Faisal Mosque only if access and weather are comfortable, then prioritise indoor cultural and shopping stops. Pakistan Monument Museum, Lok Virsa and Centaurus can fill most of a wet day without sending you to distant parts of the city. Use Blue Area for meals and hotel breaks, and move the viewpoint to another visit[cite: 12].
                </p>
              </div>

              {/* Friday Prayer and Weekend Crown Considerations */}
              <div className="blog-detailed-itinerary-section">
                <h2 className="content-h2 itinerary-main-title">Friday Prayer and Weekend Crown Considerations</h2>
                <p className="content-p">
                  Friday needs slightly different timing. Faisal Mosque is busiest around congregational prayer, and security arrangements can slow entry or nearby traffic. Cultural venues may also observe prayer-related operational adjustments, so check official same-day information rather than relying on an old screenshot. At Centaurus, weekend evenings can bring heavier crowds and parking queues; visiting earlier in the afternoon is usually easier if shopping is a priority[cite: 13].
                </p>
              </div>

              {/* Where to Stay for This Two-Day Islamabad Itinerary */}
              <div className="blog-detailed-itinerary-section">
                <h2 className="content-h2 itinerary-main-title">Where to Stay for This Two-Day Islamabad Itinerary</h2>
                <p className="content-p">
                  A central base is useful because it lets you move north towards Faisal Mosque and the Margalla Hills, south-east towards Shakarparian, and back to shopping or business areas without changing hotels. Crown CP in Blue Area fits that route logic, particularly for visitors who also have meetings or want convenient Centaurus access[cite: 13].
                </p>
                <p className="content-p">
                  Before booking, compare the room category, bedding, parking and live rates on the <Link to="/rooms">Crown CP rooms page</Link>. Then use live navigation each morning to adjust the order if traffic, weather or security conditions change[cite: 13].
                </p>
              </div>

            </div>
          </div>

          {/* Right Sidebar Area matching the reference layout */}
          <div className="blog-sidebar">
            
            {/* Article Info Card */}
            <div className="sidebar-article-info-card">
              <h3 className="sidebar-box-title">Article Info</h3>
              <div className="article-info-row">
                <span className="info-label">CATEGORY</span>
                <span className="info-value">Travel Tips</span>
              </div>
              <div className="article-info-row">
                <span className="info-label">READ TIME</span>
                <span className="info-value">5 min</span>
              </div>
              <div className="article-info-row">
                <span className="info-label">AUTHOR</span>
                <span className="info-value">Hassan Zeb</span>
              </div>
            </div>

            {/* Keep Reading Related Articles Card */}
            <div className="sidebar-related-articles-card">
              <h3 className="sidebar-box-title">Keep Reading</h3>
              <span className="related-subtitle">Related Articles</span>

              <div className="related-articles-list">
                
                {/* Related Item 1 */}
                <Link to="/blog/islamabad-weekend-trip-from-lahore" className="related-item">
                  <img src="https://api.hotelcrowncp.com/Uploads/Blogs/47779dfd-351e-4314-be93-64a03029d4fa.jpg" alt="Islamabad Weekend Trip" />
                  <div className="related-item-content">
                    <span className="related-date">SEP 8, 2026</span>
                    <h4 className="related-item-title">Islamabad Weekend Trip From Lahore: Complete Travel Guide...</h4>
                  </div>
                </Link>

                {/* Related Item 2 */}
                <Link to="/blog/best-hotel-near-centaurus-mall-islamabad" className="related-item">
                  <img src="https://api.hotelcrowncp.com/Uploads/Blogs/59a504d1-08d6-4918-ac18-f5589d45e984.jpg" alt="Centaurus Mall" />
                  <div className="related-item-content">
                    <span className="related-date">SEP 7, 2026</span>
                    <h4 className="related-item-title">Best Hotel Near Centaurus Mall Islamabad: Why Crown CP Is a...</h4>
                  </div>
                </Link>

                {/* Related Item 3 */}
                <Link to="/blog/two-days-in-islamabad-practical-weekend-itinerary" className="related-item">
                  <img src="https://api.hotelcrowncp.com/Uploads/Blogs/44bab444-9d92-44cc-9c85-49a1816648c8.jpg" alt="Two Days in Islamabad" />
                  <div className="related-item-content">
                    <span className="related-date">AUG 20, 2026</span>
                    <h4 className="related-item-title">Two Days in Islamabad: A Practical Weekend Itinerary for...</h4>
                  </div>
                </Link>

              </div>

              <Link to="/blog" className="view-all-blogs-link">View all blogs →</Link>
            </div>

            {/* Plan Your Stay Card */}
            <div className="plan-stay-sidebar-card">
              <span className="plan-stay-tag">PLAN YOUR STAY</span>
              <h3 className="plan-stay-title">Book Your Room at Crown CP</h3>
              <p className="plan-stay-desc">Enjoy premium comfort in Blue Area, Islamabad with elegant rooms and world-class hospitality.</p>
              <Link to="/rooms" className="plan-stay-btn">Explore Rooms</Link>
            </div>

          </div>

        </div>
      </section>

      {/* MORE STORIES SECTION (Alag Container) */}
      <section className="blog-more-stories-section">
        <div className="more-stories-container">
          <span className="more-stories-tag">KEEP READING</span>
          <h2 className="more-stories-heading">More Stories</h2>
          
          <div className="more-stories-grid">
            <div className="story-card">
              <img src="https://api.hotelcrowncp.com/Uploads/Blogs/47779dfd-351e-4314-be93-64a03029d4fa.jpg" alt="Islamabad Weekend Trip" />
              <div className="story-card-content">
                <span className="story-date">📅 SEP 8, 2026</span>
                <span className="story-tag">TRAVEL TIPS</span>
                <Link to="/blog/islamabad-weekend-trip-from-lahore" className="story-title">
                  Islamabad Weekend Trip From Lahore: Complete Travel Guide, Itinerary & Where to Stay
                </Link>
                <Link to="/blog/islamabad-weekend-trip-from-lahore" className="story-read-more">Read More</Link>
              </div>
            </div>

            <div className="story-card">
              <img src="https://api.hotelcrowncp.com/Uploads/Blogs/59a504d1-08d6-4918-ac18-f5589d45e984.jpg" alt="Best Hotel Near Centaurus Mall" />
              <div className="story-card-content">
                <span className="story-date">📅 SEP 7, 2026</span>
                <span className="story-tag">TRAVEL TIPS</span>
                <Link to="/blog/best-hotel-near-centaurus-mall-islamabad" className="story-title">
                  Best Hotel Near Centaurus Mall Islamabad: Why Crown CP Is a Smart Choice for Your Stay
                </Link>
                <Link to="/blog/best-hotel-near-centaurus-mall-islamabad" className="story-read-more">Read More</Link>
              </div>
            </div>

            <div className="story-card">
              <img src="https://api.hotelcrowncp.com/Uploads/Blogs/05a4765a-44f5-4dd4-9c07-a609c4e12517.jpg" alt="Hotel Near PIMS Islamabad" />
              <div className="story-card-content">
                <span className="story-date">📅 AUG 21, 2026</span>
                <span className="story-tag">TRAVEL TIPS</span>
                <Link to="/blog/hotel-near-pims-islamabad" className="story-title">
                  Hotel Near PIMS Islamabad: Stay Guide for Medical Visits
                </Link>
                <Link to="/blog/hotel-near-pims-islamabad" className="story-read-more">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}