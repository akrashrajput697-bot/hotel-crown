import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../style/Dining.css';

export default function Dining() {
  const [activeMenuTab, setActiveMenuTab] = useState('Breakfast');

  const menuCategories = [
    "Breakfast", "Mid Night", "Salads", "Pakistani", "Starters", 
    "Seafood", "Soup", "Chinese Fish", "Chinese Chicken", "Chinese Beef", 
    "Chowmein", "Continental", "Burgers", "BBQ", "Desserts", 
    "Hot Beverages", "Cold Beverages", "Shawarma"
  ];

  // Complete Menu Data including Cold Beverages
  const menuData = {
    Breakfast: {
      type: "sections",
      sections: [
        {
          title: "BREAKFAST",
          items: [
            { name: "Continental Breakfast", price: "Rs. 1,595/-" },
            { name: "American Breakfast", price: "Rs. 1,999/-" }
          ]
        },
        {
          title: "ALA CARTE SELECTION",
          items: [
            { name: "Omelette of Your Choice (served with toast, Butter & Jam)", price: "Rs. 995/-" },
            { name: "Aloo Bhujia Paratha", price: "Rs. 950/-" },
            { name: "Qeema with Paratha", price: "Rs. 995/-" },
            { name: "Beef Sausages with Hash Browns", price: "Rs. 1,100/-" },
            { name: "French Toast with Maple Syrup", price: "Rs. 900/-" },
            { name: "Cereals (served with Hot Milk)", price: "Rs. 795/-" },
            { name: "Fresh Fruit Platter", price: "Rs. 675/-" },
            { name: "Danish Pastry (2-pcs)", price: "Rs. 799/-" },
            { name: "Croissant (2-pcs)", price: "Rs. 999/-" },
            { name: "Plain Yogurt", price: "Rs. 450/-" }
          ]
        }
      ]
    },
    "Mid Night": {
      type: "single",
      title: "MID NIGHT MENU",
      items: [
        { name: "Soup of the Day", price: "Rs. 495/-" },
        { name: "Mutton Handi Boneless", price: "Rs. 2,050/-" },
        { name: "Chicken Handi Boneless", price: "Rs. 1,700/-" },
        { name: "Chicken Mongolian", price: "Rs. 1,800/-" },
        { name: "Daal of the Day", price: "Rs. 750/-" },
        { name: "Beef Mongolian", price: "Rs. 1,850/-" },
        { name: "Crown Club Sandwich", price: "Rs. 1,299/-" },
        { name: "Chicken Chili Burger", price: "Rs. 1,400/-" },
        { name: "Beef Cheese Burger", price: "Rs. 1,400/-" },
        { name: "Grilled Cheese Burger", price: "Rs. 1,400/-" }
      ]
    },
    "Salads": {
      type: "single",
      title: "SALADS",
      items: [
        { name: "Chef Salad Bowl", price: "Rs. 1,125/-" },
        { name: "Russian Salad", price: "Rs. 1,125/-" },
        { name: "Thai Beef Salad", price: "Rs. 895/-" },
        { name: "Waldorf Salad", price: "Rs. 895/-" },
        { name: "Fresh Green Salad", price: "Rs. 495/-" },
        { name: "Greek Salad with Feta Cheese", price: "Rs. 750/-" }
      ]
    },
    "Pakistani": {
      type: "single",
      title: "PAKISTANI FOOD",
      subtitle: "All Pakistan Food served with Roti/Nan and Green Salad",
      items: [
        { name: "Mutton Handi Boneless", price: "Rs. 2,050/-" },
        { name: "Mutton Mughlai Qorma", price: "Rs. 1,800/-" },
        { name: "Mutton Karahi", price: "Rs. 1,800/-" },
        { name: "Mutton Biryani", price: "Rs. 1,600/-" },
        { name: "Mutton Masala", price: "Rs. 1,800/-" },
        { name: "Shahi Mutton Qorma", price: "Rs. 1,850/-" },
        { name: "Mutton Balti", price: "Rs. 1,850/-" },
        { name: "Chicken Handi Boneless", price: "Rs. 1,700/-" },
        { name: "Chicken Karahi", price: "Rs. 1,550/-" },
        { name: "Chicken Jalfrezi", price: "Rs. 1,695/-" },
        { name: "Chicken Ginger", price: "Rs. 1,595/-" },
        { name: "Chicken Biryani", price: "Rs. 1,100/-" },
        { name: "Vegetable Bhujia", price: "Rs. 750/-" },
        { name: "Daal of the Day", price: "Rs. 750/-" },
        { name: "Chicken Malai Handi", price: "Rs. 1,600/-" },
        { name: "Makhni Handi", price: "Rs. 1,600/-" },
        { name: "Prawn Masala", price: "Rs. 3,500/-" },
        { name: "Shahi Chicken Qorma", price: "Rs. 1,600/-" },
        { name: "Daal Mash Shahi", price: "Rs. 1,050/-" },
        { name: "Steamed Rice", price: "Rs. 850/-" },
        { name: "Raita", price: "Rs. 120/-" }
      ]
    },
    "Starters": {
      type: "single",
      title: "STARTER",
      subtitle: "Served With Walton Sweet Chill Sauce",
      items: [
        { name: "Chicken Wings (6-pcs)", price: "Rs. 750/-" },
        { name: "Golden Chicken Strips (6-pcs)", price: "Rs. 850/-" },
        { name: "Chicken Spring Roll (6-pcs)", price: "Rs. 750/-" },
        { name: "Vegetable Spring Roll (6-pcs)", price: "Rs. 600/-" },
        { name: "Fried Mushrooms (6-pcs)", price: "Rs. 1,000/-" },
        { name: "Chicken Satay with Peanut Butter Sauce (4-pcs)", price: "Rs. 900/-" },
        { name: "Grilled Chicken Shashlik Hot Chili Sauce (4-pcs)", price: "Rs. 1,100/-" },
        { name: "Chef Special Chicken (Deep Fried Chicken with Honey Chili Sauce)", price: "Rs. 1,100/-" },
        { name: "Crumb Fried Chicken (4-pcs)", price: "Rs. 1,199/-" },
        { name: "Tempura Chicken (6-pcs)", price: "Rs. 1,050/-" }
      ]
    },
    "Seafood": {
      type: "single",
      title: "SEA FOOD",
      items: [
        { name: "Prawn Tempura (4-pcs)", price: "Rs. 3,500/-" },
        { name: "Batter Fried Prawn (4-pcs)", price: "Rs. 3,500/-" },
        { name: "B.B.Q Prawn (4-pcs)", price: "Rs. 3,500/-" },
        { name: "Shrimp Toast (4-pcs)", price: "Rs. 2,950/-" },
        { name: "Finger Fish (6-pcs)", price: "Rs. 1,850/-" },
        { name: "Crumb Fried Fish (4-pcs)", price: "Rs. 1,950/-" },
        { name: "Dhaka Fish (6-pcs)", price: "Rs. 1,850/-" },
        { name: "Batter Fried Fish (4-pcs)", price: "Rs. 1,950/-" },
        { name: "Tempura Fish (6-pcs)", price: "Rs. 1,850/-" },
        { name: "Fish Cake (4-pcs)", price: "Rs. 1,950/-" }
      ]
    },
    "Soup": {
      type: "single",
      title: "SOUP",
      subtitle: "All Soups served with Bread Basket and Butter",
      items: [
        { name: "Soup of the Day", price: "Rs. 495/-" },
        { name: "Mulligatawny", price: "Rs. 495/-" },
        { name: "Cream of Tomato", price: "Rs. 775/-" },
        { name: "Cream of Mushrooms", price: "Rs. 775/-" },
        { name: "Chicken Corn Soup", price: "Rs. 549/-" },
        { name: "Hot N Sour", price: "Rs. 595/-" },
        { name: "French Onion Soup", price: "Rs. 650/-" },
        { name: "Cream of Chicken Soup", price: "Rs. 775/-" },
        { name: "Vegetable Clear Soup", price: "Rs. 495/-" }
      ]
    },
    "Chinese Fish": {
      type: "single",
      title: "CHINESE FISH",
      subtitle: "All Chinese Served With Steamed Rice",
      items: [
        { name: "Sweet & Sour Fish", price: "Rs. 1,850/-" },
        { name: "Sichuan Fish", price: "Rs. 1,850/-" },
        { name: "Shashlik Fish", price: "Rs. 1,750/-" },
        { name: "Fish Mongolian", price: "Rs. 1,850/-" },
        { name: "Fish Chili Onion", price: "Rs. 1,750/-" },
        { name: "Fish Hot Sauce", price: "Rs. 1,750/-" },
        { name: "Fish Cashewnuts", price: "Rs. 1,950/-" },
        { name: "Garlic Fish", price: "Rs. 1,850/-" },
        { name: "Fish Onion in Green Pepper", price: "Rs. 1,750/-" },
        { name: "Stir Fried Fish with Almond", price: "Rs. 1,950/-" }
      ]
    },
    "Chinese Chicken": {
      type: "single",
      title: "CHINESE CHICKEN",
      subtitle: "All Chinese Served With Steamed Rice",
      items: [
        { name: "Chicken Shashlik", price: "Rs. 1,850/-" },
        { name: "Chicken Mongolian", price: "Rs. 1,850/-" },
        { name: "Chicken Manchurian", price: "Rs. 1,850/-" },
        { name: "Chicken Chili Dry", price: "Rs. 1,850/-" },
        { name: "Sweet & Sour Chicken", price: "Rs. 1,850/-" },
        { name: "Chicken Chowmein", price: "Rs. 1,499/-" },
        { name: "Stir Fried Chicken", price: "Rs. 1,850/-" },
        { name: "Garlic Chicken", price: "Rs. 1,850/-" },
        { name: "Chicken Chili Vegetable", price: "Rs. 1,650/-" },
        { name: "Pineapple Chicken", price: "Rs. 1,850/-" },
        { name: "Sichuan Chicken", price: "Rs. 1,750/-" },
        { name: "Chicken Yong Corn", price: "Rs. 1,750/-" },
        { name: "Chicken Chili Onion", price: "Rs. 1,650/-" },
        { name: "Chicken Black Pepper Chili", price: "Rs. 1,550/-" },
        { name: "Chicken Hot Sauce", price: "Rs. 1,650/-" },
        { name: "Chicken Onion in Green Pepper", price: "Rs. 1,550/-" },
        { name: "Tamarind Chicken", price: "Rs. 1,850/-" },
        { name: "Chicken Fried Rice", price: "Rs. 1,350/-" },
        { name: "Egg Fried Rice", price: "Rs. 1,250/-" },
        { name: "Garlic Rice", price: "Rs. 1,250/-" },
        { name: "Vegetable Fried Rice", price: "Rs. 1,250/-" }
      ]
    },
    "Chinese Beef": {
      type: "single",
      title: "CHINESE BEEF",
      subtitle: "All Chinese Served With Steamed Rice",
      items: [
        { name: "Beef Chili Dry", price: "Rs. 1,850/-" },
        { name: "Beef Mongolian", price: "Rs. 1,850/-" },
        { name: "Beef Chili Sauce", price: "Rs. 1,850/-" },
        { name: "Beef Stroganoff", price: "Rs. 1,750/-" },
        { name: "Beef Manchurian", price: "Rs. 1,850/-" },
        { name: "Beef Chili Onion", price: "Rs. 1,750/-" },
        { name: "Beef Onion in Green pepper", price: "Rs. 1,750/-" },
        { name: "Beef Hot Sauce", price: "Rs. 1,650/-" },
        { name: "Beef Black Pepper Chili", price: "Rs. 1,650/-" },
        { name: "Beef Fried Rice", price: "Rs. 1,750/-" },
        { name: "Beef Sichuan", price: "Rs. 1,750/-" }
      ]
    },
    "Chowmein": {
      type: "single",
      title: "CHOWMEIN",
      items: [
        { name: "Chicken Chowmein", price: "Rs. 1,499/-" },
        { name: "Singapuri Chowmein", price: "Rs. 1,699/-" },
        { name: "Chef Special Chowmein", price: "Rs. 2,000/-" },
        { name: "Beef Chili Chowmein", price: "Rs. 1,599/-" },
        { name: "Prawn Chowmein", price: "Rs. 2,000/-" },
        { name: "Fish Chowmein", price: "Rs. 1,850/-" },
        { name: "Vegetable Chowmein", price: "Rs. 1,299/-" },
        { name: "Chicken Masala Chowmein", price: "Rs. 1,499/-" },
        { name: "Alfredo Pasta", price: "Rs. 1,549/-" },
        { name: "Arrabbiata Pasta", price: "Rs. 1,495/-" }
      ]
    },
    "Continental": {
      type: "single",
      title: "CONTINENTAL",
      subtitle: "All Steaks Served With Saute Vegetable & French Fries",
      items: [
        { name: "New York Steak", price: "Rs. 1,990/-" },
        { name: "Beef Steak", price: "Rs. 1,990/-" },
        { name: "Chicken Steak", price: "Rs. 1,695/-" },
        { name: "Grilled Lebanese Chicken", price: "Rs. 1,695/-" },
        { name: "Golden Fried Fish (served with tartar sauce)", price: "Rs. 1,950/-" },
        { name: "Grilled Fish (served with Lemon Butter sauce)", price: "Rs. 1,950/-" },
        { name: "Lahori Fried Fish", price: "Rs. 1,950/-" },
        { name: "Arrabbiata Pasta", price: "Rs. 1,495/-" },
        { name: "Spaghetti Bolognese", price: "Rs. 1,280/-" },
        { name: "Chicken Lasagna", price: "Rs. 1,800/-" }
      ]
    },
    "Burgers": {
      type: "single",
      title: "BURGER & SANDWICHES",
      subtitle: "All Burger & Sandwiches served with Col Slaw and French Fries",
      items: [
        { name: "Crown Special Burger", price: "Rs. 1,400/-" },
        { name: "Beef Cheese Burger", price: "Rs. 1,400/-" },
        { name: "Chicken Cheese Burger", price: "Rs. 1,400/-" },
        { name: "Chicken Chili Burger", price: "Rs. 1,400/-" },
        { name: "Chicken Breast Burger", price: "Rs. 1,400/-" },
        { name: "Crown Club Sandwich", price: "Rs. 1,299/-" },
        { name: "Crown Breast Sandwich", price: "Rs. 1,299/-" },
        { name: "Grilled Chicken Panini", price: "Rs. 1,299/-" },
        { name: "Roasted Beef Panini", price: "Rs. 1,499/-" },
        { name: "French Fries", price: "Rs. 500/-" }
      ]
    },
    "BBQ": {
      type: "single",
      title: "BBQ",
      subtitle: "B.B.Q served with Nan/Roti and Chutney",
      items: [
        { name: "Chicken Tikka", price: "Rs. 900/-" },
        { name: "Crown Mixed Grill Platter", price: "Rs. 2,000/-" },
        { name: "Chicken Malai Boti (8-pcs)", price: "Rs. 1,600/-" },
        { name: "Chicken Boti (8-pcs)", price: "Rs. 1,299/-" },
        { name: "Reshmi Seekh Kabab (4-pcs)", price: "Rs. 1,500/-" },
        { name: "Beef Seekh Kabab (4-pcs)", price: "Rs. 1,600/-" },
        { name: "Fish Tikka (4-pcs)", price: "Rs. 1,750/-" },
        { name: "Anari Boti (8-pcs)", price: "Rs. 1,600/-" },
        { name: "Kastori Boti (8-pcs)", price: "Rs. 1,750/-" },
        { name: "Pizza Kabab (8-pcs)", price: "Rs. 1,650/-" },
        { name: "Pineapple Kabab (8-pcs)", price: "Rs. 1,700/-" },
        { name: "Cheese Gola Kabab (6-pcs)", price: "Rs. 1,650/-" },
        { name: "Chicken Behari Boti (6-pcs)", price: "Rs. 1,599/-" }
      ]
    },
    "Desserts": {
      type: "single",
      title: "DESSERT",
      items: [
        { name: "Fruit Trifle", price: "Rs. 599/-" },
        { name: "Shahi Kheer", price: "Rs. 550/-" },
        { name: "Gulab Jaman", price: "Rs. 575/-" },
        { name: "Cream Caramel", price: "Rs. 599/-" },
        { name: "Chocolate Mousse", price: "Rs. 599/-" },
        { name: "Chocolate Cake", price: "Rs. 789/-" },
        { name: "Baked Cheese Cake", price: "Rs. 850/-" },
        { name: "Black Forest Pastries (2-pcs)", price: "Rs. 550/-" },
        { name: "Pineapple Pastries (2-pcs)", price: "Rs. 550/-" },
        { name: "Bread Pudding", price: "Rs. 575/-" }
      ]
    },
    "Hot Beverages": {
      type: "single",
      title: "HOT BEVERAGES",
      subtitle: "All Hot Beverages Served With Cookies",
      items: [
        { name: "Hot Chocolate", price: "Rs. 725/-" },
        { name: "Ovaltine", price: "Rs. 725/-" },
        { name: "Cappuccino", price: "Rs. 595/-" },
        { name: "Latte", price: "Rs. 595/-" },
        { name: "Cardamom Tea", price: "Rs. 595/-" },
        { name: "Espresso", price: "Rs. 695/-" },
        { name: "Black Coffee", price: "Rs. 595/-" },
        { name: "Tea", price: "Rs. 295/-" },
        { name: "Green Tea", price: "Rs. 250/-" },
        { name: "Hot Milk", price: "Rs. 299/-" }
      ]
    },
    "Cold Beverages": {
      type: "single",
      title: "COLD BEVERAGES",
      items: [
        { name: "Choice of Juice", price: "Rs. 350/-" },
        { name: "Fresh Juice (Seasonal)", price: "Rs. 799/-" },
        { name: "Lassi (Sweet & Saltish)", price: "Rs. 450/-" },
        { name: "Mineral Water (Large)", price: "Rs. 225/-" },
        { name: "Mineral Water (Small)", price: "Rs. 140/-" },
        { name: "Soft Drink Can", price: "Rs. 299/-" },
        { name: "Mint Margarita", price: "Rs. 425/-" }
      ]
    },
    "Shawarma": {
      type: "single",
      title: "BURGER",
      items: [
        { name: "Zinger Burger", price: "Rs. 350/-" },
        { name: "Fresh Juice (Seasonal)", price: "Rs. 799/-" },
        { name: "Lassi (Sweet & Saltish)", price: "Rs. 450/-" },
        { name: "Mineral Water (Large)", price: "Rs. 225/-" },
        { name: "Mineral Water (Small)", price: "Rs. 140/-" },
        { name: "Soft Drink Can", price: "Rs. 299/-" },
        { name: "Mint Margarita", price: "Rs. 425/-" }
      ]
    }
  };

  const currentCategoryData = menuData[activeMenuTab] || {
    type: "single",
    title: `${activeMenuTab.toUpperCase()} MENU`,
    items: [
      { name: `${activeMenuTab} Special Item 1`, price: "Rs. 1,200/-" },
      { name: `${activeMenuTab} Special Item 2`, price: "Rs. 1,500/-" }
    ]
  };

  return (
    <div className="dining-page">
      <Helmet>
        <title>Restaurant & Dining Menu | Hotel Crown CP Islamabad</title>
        <meta 
          name="description" 
          content="Discover exceptional dining at Hotel Crown CP Islamabad. Browse our extensive restaurant menu featuring Pakistani cuisine, Chinese dishes, BBQ, continental food, and beverages." 
        />
        <link rel="canonical" href="https://hotelcrowncp.com/dining" />
        <meta name="keywords" content="hotel dining Islamabad, Crown Plaza restaurants, best food in Islamabad hotel, fine dining buffet Islamabad, cafe and grill" />
      </Helmet>

      {/* Hero Section */}
      <section className="dining-hero">
        <div className="dining-hero-overlay">
          <div className="dining-hero-content">
            <span className="dining-hero-subtitle">A CULINARY JOURNEY OF FLAVOUR & AMBIANCE</span>
            <h1>Exquisite Restaurant in Islamabad</h1>
            <p>
              Experience exceptional dining at our restaurant in Islamabad, offering breakfast to elegant evening meals with flavours, ambiance, and hospitality perfect for families and business travellers.
            </p>
          </div>
        </div>
      </section>

      {/* Premier Dining Section */}
      <section className="premier-dining-section">
        <div className="dining-container">
          <div className="dining-grid-row">
            <div className="dining-image-content">
              <img 
                src="https://api.hotelcrowncp.com/uploads/gallery/3d9b2606-50f9-40cc-abde-d73edbf40d23.webp" 
                alt="Hotel Crown CP Restaurant" 
              />
            </div>

            <div className="dining-text-content">
              <span className="dining-small-tag">HOTEL CROWN CP RESTAURANT</span>
              <h2>Enjoy Premier Dining in Islamabad</h2>
              <p>
                Savour every meal at Hotel Crown CP’s premier restaurant in Islamabad. From a refined breakfast to elegant evening dining, enjoy international and local flavours in a calm, sophisticated ambiance, perfect for business travellers, families, and visitors exploring the city.
              </p>

              <div className="dining-timing-grid">
                <div className="timing-card">
                  <span className="timing-title">BREAKFAST</span>
                  <span className="timing-hours">6:30 AM - 10:30 AM</span>
                </div>
                <div className="timing-card">
                  <span className="timing-title">LUNCH & DINNER</span>
                  <span className="timing-hours">12:00 PM - 11:00 PM</span>
                </div>
                <div className="timing-card">
                  <span className="timing-title">ROOM SERVICE</span>
                  <span className="timing-hours">Available 24 / 7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Menu Section */}
      <section className="restaurant-menu-section">
        <div className="dining-container">
          <div className="menu-header-center">
            <span className="menu-small-tag">OUR MENU</span>
            <h2>Taste the Best of Islamabad's Cuisine</h2>
            <p>From hearty breakfasts to refined dinners, our restaurant in Blue Area, Islamabad offers a menu designed to delight every guest with exceptional taste and presentation.</p>
          </div>

          {/* Menu Category Filter Buttons */}
          <div className="menu-tabs-grid">
            {menuCategories.map((cat, index) => (
              <button
                key={index}
                className={`menu-tab-btn ${activeMenuTab === cat ? 'active-menu-tab' : ''}`}
                onClick={() => setActiveMenuTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Green Menu Card Box */}
          <div className="menu-card-box">
            {currentCategoryData.type === "sections" ? (
              currentCategoryData.sections.map((section, sIndex) => (
                <div key={sIndex} className={sIndex > 0 ? "menu-section-block" : ""}>
                  <div className={sIndex === 0 ? "menu-card-title-bar" : "menu-subheading-bar"}>
                    <span>✦ {section.title} ✦</span>
                  </div>
                  <div className="menu-items-list" style={{ marginBottom: sIndex === 0 ? '30px' : '0' }}>
                    {section.items.map((item, idx) => (
                      <div className="menu-item-row" key={idx}>
                        <span className="menu-item-name">{item.name}</span>
                        <div className="menu-item-dots"></div>
                        <span className="menu-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="menu-card-title-bar">
                  <span>✦ {currentCategoryData.title} ✦</span>
                </div>
                {currentCategoryData.subtitle && (
                  <div className="menu-subheading-bar" style={{ fontSize: '12px', fontStyle: 'italic', color: '#e0dede', marginBottom: '25px' }}>
                    {currentCategoryData.subtitle}
                  </div>
                )}
                <div className="menu-items-list">
                  {currentCategoryData.items.map((item, idx) => (
                    <div className="menu-item-row" key={idx}>
                      <span className="menu-item-name">{item.name}</span>
                      <div className="menu-item-dots"></div>
                      <span className="menu-item-price">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Bottom Note */}
            <div className="menu-bottom-note" style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', color: '#ccc' }}>
              All prices are subject to the applicable GST. Menu items may vary by season and availability.
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}