import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../style/Notification.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged lagane se humein pakka pata chal jata hai ke user logged-in hai ya nahi
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setNotifications([]);
        setLoading(false);
        return;
      }

      console.log("Logged in User UID:", user.uid); // Console mein check karne ke liye

      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', user.uid)
      );

      const unsubscribeNotifs = onSnapshot(q, (snapshot) => {
        const notifsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotifications(notifsList);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching notifications: ", error);
        setLoading(false);
      });

      return () => unsubscribeNotifs();
    });

    return () => unsubscribeAuth();
  }, []);

  const markAsRead = async (id) => {
    try {
      const notifRef = doc(db, 'notifications', id);
      await updateDoc(notifRef, {
        read: true
      });
    } catch (error) {
      console.error("Error updating notification: ", error);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Your Notifications</h2>
        <p>Stay updated with your latest bookings and exclusive hotel rewards.</p>
      </div>

      <div className="notifications-list">
        {loading ? (
          <p className="no-notifs">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="no-notifs">No notifications right now.</p>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`notification-card ${notif.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="notif-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </div>
              <div className="notif-content">
                <div className="notif-title-row">
                  <h4>{notif.title}</h4>
                  <span className="notif-date">
                    {notif.date?.toDate ? notif.date.toDate().toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <p>{notif.message}</p>
              </div>
              {!notif.read && <span className="unread-dot"></span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;