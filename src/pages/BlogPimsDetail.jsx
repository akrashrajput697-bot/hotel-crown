import React from 'react';
import { Link } from 'react-router-dom';
import '../style/BlogPimsDetail.css';

export default function BlogPostPims() {
  return (
    <div className="blog-detail-page">
      {/* Hero Section */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-overlay">
          <div className="blog-detail-hero-content">
            <h5>Hotel Crown CP Islamabad</h5>
            <h1>Hotel Near PIMS Islamabad: Stay Guide for Medical Visits</h1>
            <p>A medical trip to Islamabad needs different planning from a normal city stay. You may be visiting for an outpatient appointment, diagnostic tests, a procedure, or to support a family member who has been admitted. In each case, the most useful accommodation is one that reduces unnecessary travel and gives you a comfortable place to rest between hospital visits.</p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="blog-detail-body-section">
        <div className="blog-detail-container">
          
          {/* Left Main Article Content */}
          <div className="blog-main-content">
            <div className="featured-banner-img">
              <img 
                src="https://api.hotelcrowncp.com/Uploads/Blogs/05a4765a-44f5-4dd4-9c07-a609c4e12517.jpg" 
                alt="Hotel Near PIMS Islamabad" 
              />
            </div>

            <div className="blog-text-block">
              <p>
                A medical trip to Islamabad needs different planning from a normal city stay. You may be visiting for an outpatient appointment, diagnostic tests, a procedure, or to support a family member who has been admitted. In each case, the most useful accommodation is one that reduces unnecessary travel and gives you a comfortable place to rest between hospital visits.
              </p>
              <p>
                The Pakistan Institute of Medical Sciences (PIMS) is located on Ibn-e-Sina Road, G-8/3, Islamabad. It is a large hospital complex, so choosing accommodation nearby can be especially helpful when appointments are early, tests are spread across the day, or an attendant needs to move between the hospital and the hotel several times.
              </p>
              <p>
                This blog focuses on the practical questions people usually have when searching for a hotel near PIMS Islamabad: which area to stay in, what facilities matter during a medical visit, how to plan transport, what to confirm before booking, and how to prepare if the visit extends beyond one day.
              </p>

              <h2>What Makes a Good Hotel Near PIMS Islamabad?</h2>
              
              <h3 className="section-sub-heading">Choose Location for Convenience, Not Just Distance</h3>
              <p>
                The closest property on a map is not always the most convenient. Compare the actual road route to PIMS, access to main roads, ease of getting a taxi or ride-hailing service, and nearby pharmacies or food options. A slightly farther hotel with easier access can be more practical than one on a difficult route.
              </p>
              <p>
                If you expect repeated hospital visits, staying in a central area around G-7, G-8 or Blue Area can make it easier to reach PIMS while also giving attendants access to shops, restaurants and transport.
              </p>

              <h3 className="section-sub-heading">Prioritise Quiet, Comfortable Rest</h3>
              <p>
                Patients and attendants may return from the hospital tired, stressed or sleep-deprived. A clean, quiet room with reliable air-conditioning, a private bathroom and comfortable bedding matters more during a medical stay than decorative features. If recovery or rest is a priority, ask about quieter room locations before confirming the booking.
              </p>

              <h3 className="section-sub-heading">Match the Bed Setup to the People Travelling</h3>
              <p>
                A double room may work well for a couple or one guest, but two attendants may be more comfortable in a twin room with separate beds. For a family staying several nights, extra sitting space can also help because the room may be used for resting, eating, making calls and organising medical documents between visits.
              </p>

              <h2>Plan Around the Type of Medical Visit</h2>

              <h3 className="section-sub-heading">For a Same-Day Appointment or Consultation</h3>
              <p>
                If the visit is mainly for one consultation, the priority is straightforward access to the hospital and flexible arrival plans. Confirm the appointment time, doctor or department and the correct hospital building before leaving. Even if the hotel is nearby, allow extra time for traffic, parking, registration and finding the right department.
              </p>

              <h3 className="section-sub-heading">For Tests Spread Across More Than One Day</h3>
              <p>
                Diagnostic visits can become longer than expected. A doctor may request blood tests, imaging or another specialist opinion, and reports may only be available later. Avoid booking return transport too tightly around the first appointment and check whether the hotel stay can be extended if needed.
              </p>

              <h3 className="section-sub-heading">For a Patient Attendant or Family Member</h3>
              <p>
                If someone is admitted to PIMS, the hotel becomes a base for the attendant. Prioritise a proper bed, private bathroom, secure luggage storage, Wi-Fi, meal access and a manageable journey back to the hospital. Twin rooms can be useful when two relatives are sharing responsibilities.
              </p>

              <h2>Useful Facilities During a Medical Stay</h2>

              <h3 className="section-sub-heading">Breakfast and Easy Meal Access</h3>
              <p>
                Hospital days can begin early and finish late. Breakfast or easy meal access saves time for attendants. If the patient has fasting instructions, diabetes, food restrictions or procedure-related dietary advice, follow the medical instructions rather than the hotel meal schedule.
              </p>

              <h3 className="section-sub-heading">Reliable Wi-Fi and Mobile Connectivity</h3>
              <p>
                Reliable internet access helps families share reports, contact relatives, arrange transport and manage essential work. Check that Wi-Fi is available in guest rooms, not only in common areas.
              </p>

              <h3 className="section-sub-heading">Parking or Easy Ride-Hailing Access</h3>
              <p>
                If you are travelling in your own vehicle, ask whether parking is available and whether access is straightforward at different times of day. If you are not driving, choose accommodation where taxis or ride-hailing services can pick up and drop off easily. For early appointments, arrange transport with enough margin for unexpected delays.
              </p>

              <h3 className="section-sub-heading">Flexible Check-In and Check-Out</h3>
              <p>
                Medical schedules rarely fit perfectly around standard hotel timings. An early morning appointment, delayed discharge or late test result can affect when you need the room. Ask about early check-in, late check-out and extension policies before arrival. These requests may depend on availability, so they should be confirmed rather than assumed.
              </p>

              <h2>How to Prepare Before Going to PIMS</h2>

              <h3 className="section-sub-heading">Confirm the Exact Department and Appointment Details</h3>
              <p>
                PIMS is a large medical institution. Before leaving, confirm the doctor's name, department or unit, appointment time and any registration instructions. PIMS states that its hospital operates 24/7, while its published OPD visiting hours are 8:00 AM to 2:00 PM and 3:00 PM to 6:00 PM. Department-specific schedules can still vary, so confirm your appointment rather than relying only on general OPD hours.
              </p>

              <h3 className="section-sub-heading">Keep Medical Records Organised</h3>
              <p>
                Carry the documents you may need in one folder or bag. This can include prescriptions, referral letters, laboratory reports, imaging reports, previous discharge summaries, identification documents, appointment messages and a written list of current medicines. Digital copies on your phone or cloud storage provide a useful backup.
              </p>

              <h3 className="section-sub-heading">Pack for a Possible Extra Night</h3>
              <p>
                Carry essential medicines, a charger, basic toiletries and a change of clothes in case tests, treatment or discharge timing extends the visit. If the patient needs mobility aids, medical equipment or special dietary arrangements, confirm what the hotel can support before booking.
              </p>

              <h2>Why Hotel Crown CP Is the Best Match</h2>
              <p>
                <Link to="/rooms" className="content-highlight-link">Hotel Crown CP</Link> is a strong match for visitors who want to remain near PIMS while staying in central Islamabad. It is located at 99-E, Jinnah Avenue, G-7/2, Blue Area, close to G-8 and the commercial facilities of Blue Area.
              </p>

              <div className="featured-banner-img">
                <img 
                  src="https://api.hotelcrowncp.com/Uploads/Blogs/59a504d1-08d6-4918-ac18-f5589d45e984.jpg" 
                  alt="Crown CP Hotel Room Comfort" 
                />
              </div>

              <h3 className="section-sub-heading">Room Options for Patients, Couples and Attendants</h3>
              <p>
                The hotel offers several room configurations. Twin Standard and Deluxe Twin rooms have two single beds for attendants or relatives sharing. Deluxe Double and Executive Grace Double provide a king-size bed, while Executive Twin Grace combines two single beds with an enhanced sitting area.
              </p>

              <h3 className="section-sub-heading">Facilities That Are Useful for Medical Visitors</h3>
              <p>
                Hotel Crown CP lists complimentary breakfast, free high-speed Wi-Fi, air-conditioning, attached bathrooms and 24/7 front desk support. It also offers free on-site parking, airport pickup and drop-off, an on-site restaurant and 24/7 room service.
              </p>

              <h3 className="section-sub-heading">Flexible Arrival and Departure Requests</h3>
              <p>
                Standard check-in begins at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out can be requested subject to availability. Because medical appointments and discharge times can change, guests should <Link to="/contact" className="content-highlight-link">contact</Link> the hotel in advance if they expect to need a different arrival or departure time.
              </p>
              <p>
                For a medical stay, the main advantage is the combination of a central G-7/2 location, twin and double room choices and practical guest amenities. Confirm current availability, rates and special requirements directly before booking.
              </p>

              {/* FAQ Section */}
              <div className="faq-container">
                <div className="faq-item">
                  <div className="faq-question">
                    <span className="faq-badge">1</span>
                    <span>Where is PIMS Islamabad located?</span>
                  </div>
                  <div className="faq-answer">
                    <p>PIMS is located on Ibn-e-Sina Road, G-8/3, Islamabad.</p>
                  </div>
                </div>

                <div className="faq-item">
                  <div className="faq-question">
                    <span className="faq-badge">2</span>
                    <span>What is the best area to stay near PIMS?</span>
                  </div>
                  <div className="faq-answer">
                    <p>G-8 is the hospital's immediate sector, while nearby central areas such as G-7 and Blue Area can also be practical because they provide road access to PIMS along with restaurants, shops and transport options. Compare the actual route and travel time from the specific hotel before booking.</p>
                  </div>
                </div>

                <div className="faq-item">
                  <div className="faq-question">
                    <span className="faq-badge">3</span>
                    <span>Should I book one night or keep the stay flexible?</span>
                  </div>
                  <div className="faq-answer">
                    <p>If your visit involves tests, a procedure, report collection or possible admission, flexibility is useful. Medical plans can change after the first consultation, so check the hotel's modification and extension policy before booking.</p>
                  </div>
                </div>

                <div className="faq-item">
                  <div className="faq-question">
                    <span className="faq-badge">4</span>
                    <span>What should I take to a PIMS appointment?</span>
                  </div>
                  <div className="faq-answer">
                    <p>Bring your identification, appointment information, referral letter if applicable, previous prescriptions, test and imaging reports, a list of current medicines and any documents the department has requested. Keep copies organised so they are easy to access.</p>
                  </div>
                </div>

                <div className="faq-item">
                  <div className="faq-question">
                    <span className="faq-badge">5</span>
                    <span>How early should I leave for PIMS?</span>
                  </div>
                  <div className="faq-answer">
                    <p>Allow more time than the map estimate. Traffic, parking, registration and locating the correct department can take extra time.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action Section */}
              <div className="bottom-cta-banner">
                <h2>Plan the Stay Around the Medical Visit</h2>
                <p>
                  The best hotel near PIMS Islamabad is not simply the one with the shortest map distance; it should make the medical visit easier: a practical route to the hospital, a comfortable place to rest, the right bed arrangement, dependable connectivity, convenient meals and enough flexibility if plans change. Confirm the exact PIMS department before travelling, keep medical records organised, allow extra time for appointments and avoid making return plans too tight when tests or treatment may continue. These simple steps can reduce unnecessary stress and help patients and attendants focus on the purpose of the visit.
                </p>
              </div>

            </div>
          </div>

          {/* Right Sidebar */}
          <div className="blog-sidebar">
            
            {/* Article Info Card */}
            <div className="article-info-card">
              <h3>Article Info</h3>
              
              <div className="info-group">
                <span className="info-label">CATEGORY</span>
                <span className="info-value">Travel Tips</span>
              </div>

              <div className="info-group">
                <span className="info-label">READ TIME</span>
                <span className="info-value">5 min</span>
              </div>

              <div className="info-group">
                <span className="info-label">AUTHOR</span>
                <span className="info-value">Hassan Zeb</span>
              </div>
            </div>

            {/* Related Articles Card */}
            <div className="article-info-card">
              <h3 className="sidebar-heading-multi">Keep Reading<span>Related Articles</span></h3>
              
              <div className="related-articles-list">
                <div className="related-article-item">
                  <img src="https://api.hotelcrowncp.com/Uploads/Blogs/47779dfd-351e-4314-be93-64a03029d4fa.jpg" alt="hotel" />
                  <div>
                    <span className="related-date">SEP 8, 2026</span>
                    <h4><Link to="/blog">Islamabad Weekend Trip From Lahore: Complete Travel Guide...</Link></h4>
                  </div>
                </div>

                <div className="related-article-item">
                  <img src="https://api.hotelcrowncp.com/Uploads/Blogs/59a504d1-08d6-4918-ac18-f5589d45e984.jpg" alt="hotel" />
                  <div>
                    <span className="related-date">SEP 7, 2026</span>
                    <h4><Link to="/blog">Best Hotel Near Centaurus Mall Islamabad: Why Crown CP Is a...</Link></h4>
                  </div>
                </div>

                <div className="related-article-item">
                  <img src="https://api.hotelcrowncp.com/Uploads/Blogs/44bab444-9d92-44cc-9c85-49a1816648c8.jpg" alt="hotel" />
                  <div>
                    <span className="related-date">AUG 20, 2026</span>
                    <h4><Link to="/blog">Two Days in Islamabad: A Practical Weekend Itinerary for...</Link></h4>
                  </div>
                </div>
              </div>

              <div className="view-all-blogs-wrapper">
                <Link to="/blog">View all blogs →</Link>
              </div>
            </div>

            {/* Book Your Room CTA Card */}
            <div className="cta-room-card">
              <span className="cta-subtitle">PLAN YOUR STAY</span>
              <h3>Book Your Room at Crown CP</h3>
              <p>Enjoy premium comfort in Blue Area, Islamabad with elegant rooms and world-class hospitality.</p>
              <Link to="/rooms" className="cta-btn">Explore Rooms</Link>
            </div>

            {/* Quick Links Card */}
            <div className="article-info-card">
              <h3>Quick Links</h3>
              <ul className="quick-links-list">
                <li><Link to="/rooms">Rooms & Suites</Link></li>
                <li><Link to="/dining">Restaurant</Link></li>
                <li><Link to="/nearby-attractions">Places to Visit</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Need Help? Card */}
            <div className="article-info-card">
              <h3>Need Help?</h3>
              <p className="help-contact-text">+923241118206</p>
              <p className="help-contact-text">info@hotelcrowncp.com</p>
              <a 
                href="https://wa.me/923241118206" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="whatsapp-btn"
              >
                WhatsApp Us
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Separate Full-Width "More Stories" Section (Placed outside main grid, right before page ends) */}
      <section className="more-stories-section">
        <div className="more-stories-container">
          <div className="more-stories-header">
            <span className="stories-subtitle">KEEP READING</span>
            <h2>More Stories</h2>
            <div className="stories-divider"></div>
          </div>

          <div className="stories-grid">
            {/* Story 1 */}
            <div className="story-card">
              <div className="story-img-wrapper">
                <img src="https://api.hotelcrowncp.com/Uploads/Blogs/47779dfd-351e-4314-be93-64a03029d4fa.jpg" alt="Islamabad Weekend Trip" />
                <span className="story-date-badge">SEP 8, 2026</span>
              </div>
              <div className="story-content">
                <span className="story-category">TRAVEL TIPS</span>
                <h3><Link to="/blog">Islamabad Weekend Trip From Lahore: Complete Travel Guide, Itinerary & Where to Stay</Link></h3>
                <div className="story-footer">
                  <Link to="/blog" className="story-read-more">Read More</Link>
                  <span className="story-dot-icon">●</span>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="story-card">
              <div className="story-img-wrapper">
                <img src="https://api.hotelcrowncp.com/Uploads/Blogs/59a504d1-08d6-4918-ac18-f5589d45e984.jpg" alt="Best Hotel Near Centaurus Mall" />
                <span className="story-date-badge">SEP 7, 2026</span>
              </div>
              <div className="story-content">
                <span className="story-category">TRAVEL TIPS</span>
                <h3><Link to="/blog">Best Hotel Near Centaurus Mall Islamabad: Why Crown CP Is a Smart Choice for Your Stay</Link></h3>
                <div className="story-footer">
                  <Link to="/blog" className="story-read-more">Read More</Link>
                  <span className="story-dot-icon">●</span>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="story-card">
              <div className="story-img-wrapper">
                <img src="https://api.hotelcrowncp.com/Uploads/Blogs/44bab444-9d92-44cc-9c85-49a1816648c8.jpg" alt="Two Days in Islamabad" />
                <span className="story-date-badge">AUG 20, 2026</span>
              </div>
              <div className="story-content">
                <span className="story-category">TRAVEL TIPS</span>
                <h3><Link to="/blog">Two Days in Islamabad: A Practical Weekend Itinerary for First-Time Visitors</Link></h3>
                <div className="story-footer">
                  <Link to="/blog" className="story-read-more">Read More</Link>
                  <span className="story-dot-icon">●</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}