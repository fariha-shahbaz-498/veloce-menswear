import React, { useState, useMemo } from 'react';

// Premium minimalist luxury styles with pink-and-white accents
const systemStyles = `
  @keyframes luxuryFadeFloat {
    0% { transform: translateY(0px); opacity: 0.95; }
    50% { transform: translateY(-4px); opacity: 1; }
    100% { transform: translateY(0px); opacity: 0.95; }
  }
  @keyframes softCanvasPulse {
    0% { filter: brightness(1); }\r
    50% { filter: brightness(1.02); }\r
    100% { filter: brightness(1); }\r
  }
 .media-aspect-ratio-box {
    width: 100%;
    /* 1. Sets a beautiful portrait layout ratio */
    aspect-ratio: 3 / 4; 
    /* 2. Soft neutral background color so columns look perfectly aligned even with different image dimensions */
    background-color: #faf8f9; 
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .media-aspect-ratio-box video, .media-aspect-ratio-box img {
    width: 100%;
    height: 100%;
    /* 3. 'contain' forces the complete product photo to stay 100% visible inside the box without clipping heads or details */
    object-fit: contain; 
    object-position: center; 
    transition: transform 0.4s ease;
  }
  .typing-text {
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    width: 0;
    border-right: 2px solid white;
    animation: typing 8s steps(62, end) infinite, blink .8s step-end infinite;
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 85ch; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
  .luxury-hero-title {
    animation: luxuryFadeFloat 4.5s ease-in-out infinite;
  }
  .luxury-hero-banner {
    animation: softCanvasPulse 6s ease-in-out infinite;
  }
  .sticky-filter-panel {
    position: sticky;
    top: 80px;
    z-index: 850;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255, 182, 193, 0.6);
    padding: 1rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.luxury-responsive-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 2.5rem;
  }
  .luxury-item-card {
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    border: 1px solid rgba(255, 182, 193, 0.3);
    transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.25s ease;
  }
  .luxury-item-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(255, 105, 180, 0.1);
  }
  .luxury-item-card:hover .media-aspect-ratio-box img {
    transform: scale(1.03);
  }
  .luxury-input-element {
    width: 100%;
    padding: 0.85rem;
    border: 1px solid #ffb6c1;
    border-radius: 4px;
    outline: none;
    font-size: 0.9rem;
    transition: border-color 0.2s;
  }
  .luxury-input-element:focus {
    border-color: #ff69b4;
  }
`;

// Unified inventory database normalized strictly to Mens/Womens and their targeted categories
const completeInventoryData = [
  {
    id: 305,
    name: "Runcati Mens Kaftan Thobe Button Down Casual Henley Shirts Long Sleeve Kurta Cotton Linen Muslim Gown Robe",
    department: "Mens Wear",
    category: "Shirts",
    price: 20,
    image: "https://m.media-amazon.com/images/I/61oFsO63SJL._AC_SY879_.jpg",
    description: "Fabric type70% Cotton, 30% Linen. Men's Muslim kaftan thobe robe features henley collar with delicate stitch detailing, hidden placket, knee length, long sleeve, solid color and regular fit style."
  },
  {
    id: 306,
    name: "Runcati Mens Kaftan Thobe Button Down Casual Henley Shirts Long Sleeve Robe Cotton Linen Muslim Gown Shirt",
    department: "Mens Wear",
    category: "Shirts",
    price: 31,
    image: "https://m.media-amazon.com/images/I/51CApHVF6jL._AC_SY445_SX342_QL70_FMwebp_.jpg",
    description: "Mens vintage kaftan thobe robe features henley button up collar with embroidery design, knee length, long sleeve, solid color, side split and classic fit. Made of high-quality cotton linen material."
  },
  {
    id: 307,
    name: "Runcati Mens Kaftan Thobe Button Down Henley Shirts Robe Long Sleeve Casual Cotton Pleated Muslim Gown Shirt",
    department: "Mens Wear",
    category: "Dresses",
    price: 35,
    image: "https://m.media-amazon.com/images/I/61-GUuhPRUL._AC_SY445_SX342_QL70_FMwebp_.jpg",
    description: "Mens vintage kaftan thobe robe featuring a high-neck button up collar, vertical pleated design, long sleeve, solid color, side split and a modern comfort silhouette."
  },
  {
    id: 308,
    name: "KISAH Men's Jacket - Embroidered Cotton Blend - Indian Wedding Outfit for Men",
    department: "Mens Wear",
    category: "Dresses",
    price: 42,
    image: "https://m.media-amazon.com/images/I/618BEE4IVfL._AC_SY741_.jpg",
    description: "PREMIUM FABRIC – This Waistcoat for man is tailored from a silk blend with embroidered design, offering day-long comfort for festive and formal wedding occasions."
  },
  {
    id: 309,
    name: "Runcati Mens Kurta Sherwani Coats Kaftan Indian Ethnic Royal Suits Mandarin Collar Wedding Festive Party Blazer",
    department: "Mens Wear",
    category: "Shirts",
    price: 64,
    image: "https://m.media-amazon.com/images/I/714tDH-imML._AC_SY879_.jpg",
    description: "These mens modern Kurta Sherwani blazers feature a mandarin collar, button closure, long sleeve layout, two side pockets, fake chest pocket and a premium detailed paisley pattern."
  },
  {
    id: 310,
    name: "KISAH Men's Jacket - Textured Silk Blend - Indian Wedding Outfit for Men",
    department: "Mens Wear",
    category: "Dresses",
    price: 52,
    image: "https://m.media-amazon.com/images/I/617QlBCYwGL._AC_SX342_SY445_QL70_FMwebp_.jpg",
    description: "Timeless design with a Mandarin collar, making it ideal for festive weddings and formal occasions. Tailored regular fit ensures a sharp aesthetic frame."
  },
  {
    id: 311,
    name: "Maple Clothing Men's Indian Waistcoat Nehru Jacket Bandhgala Guest Wedding Vest Outfit",
    department: "Mens Wear",
    category: "Dresses",
    price: 26,
    image: "https://m.media-amazon.com/images/I/61K5wIocSlL._AC_SY879_.jpg",
    description: "Designed with a rich brocade pattern on a navy blue base, it’s the perfect layering piece for weddings, cultural festivals, and elegant social parties."
  },
  {
    id: 312,
    name: "Maple Clothing Men's Nehru Jacket Indian Vest Sequins Waistcoat Guest Bandhgala Wedding Outfit",
    department: "Mens Wear",
    category: "Dresses",
    price: 58,
    image: "https://m.media-amazon.com/images/I/71m+cvoIChL._AC_SY741_.jpg",
    description: "Features intricate embroidery and subtle sequin detailing on premium printed fabric, excellent choice for formal evening ceremonies and traditional gatherings."
  },
  {
    id: 314,
    name: "Runcati Mens Kurta Sherwani Coats Premium Classic Edition Mandarin Collar Wedding Festive Party Blazer",
    department: "Mens Wear",
    category: "Shirts",
    price: 34,
    image: "https://m.media-amazon.com/images/I/71cdaIFvY-L._AC_SY741_.jpg",
    description: "Optimized modern jacket layout styling soft interior lining panels combined with elegant traditional mandarin outerwear buttons."
  },
  {
    id: 315,
    name: "Mens African 2 Piece Set Half Zipper Nigerian Dashiki Metallic Shirt and Pants Outfit Gold Stamp Traditional Suit",
    department: "Mens Wear",
    category: "Shirts",
    price: 36,
    image: "https://m.media-amazon.com/images/I/61Pfy61lMCL._AC_SX569_.jpg",
    description: "Bold design detailing high-impact gold stamp lining accents over premium traditional coordination garments matching shirts with premium luxury active pants."
  },
  
  /* ─── NEWLY ADDED LUXURY WATCHES FOR MEN ─── */
  {
    id: 801,
    name: "Chronos Premium Obsidian Automatic Men's Watch",
    department: "Mens Wear",
    category: "Luxury Watches",
    price: 240,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
    description: "Sleek obsidian black dial paired with a signature mechanical perpetual movement configuration and transparent sapphire architecture."
  },
  {
    id: 802,
    name: "Aethelgard Classic Rose Gold Mesh Men's Watch",
    department: "Mens Wear",
    category: "Luxury Watches",
    price: 185,
    image: "https://m.media-amazon.com/images/I/71MgMmwPB7L._AC_SL1500_.jpg",
    description: "Elegant minimalist profile featuring a 40mm rose gold brushed chassis frame coupled with water-resistant mesh link deployment."
  },
  {
    id: 104,
    name: "SOUYIE Military Rugged Smart Watch for Men, AMOLED 1.43 HD Screen, Bluetooth Call Answer/Make, Blood Oxygen/Heart Rate/Sleep Tracker, 7-30 Day Battery, Waterproof Fitness Tracker for iOS Android",
    department: "Mens Wear",
    category: "Luxury Watches",
    price: 310,
    image: "https://m.media-amazon.com/images/I/71Z6OiyUBUL._AC_SL1500_.jpg",
    description: "【Luxury Men's Smart Watch, 2 Straps, 2 Style】Stylish design with a full metal body, luxury, sophistication, and elegance. Smart watch for men android with two styles straps flexibility to match your outfit. The metal strap adds a touch of luxury suitable for business settings, while the silicone strap complements an active lifestyle. The package includes a watchband tool, easy strap change in 1 minute.【Bluetooth Calling, Voice Assistant, and Notifications】Equipped with an integrated microphone and high-fidelity speaker, SOUYIE Smart watch for men allows you to make/receive/reject calls, view call logs, and add contacts. Android smart watches for men also receives reminder notifications (including SMS, Facebook, WhatsApp, Twitter, Instagram, Facebook Messenger, and more) Ensuring you never miss crucial alerts."
  },
  {
    id: 803,
    name: "Zephyrus Marine Chronograph Luxury Men's Watch",
    department: "Mens Wear",
    category: "Luxury Watches",
    price: 310,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600",
    description: "High-tier marine grade deep-sea tachymeter functionality matched seamlessly to genuine tanned alligator hide straps."
  },

  /* ─── WOMENS WEAR COLLECTION ─── */
  {
    id: 316,
    name: "TRENDMALLS Women's Net Embroidery Sharara Suit Set Indian Pakistani Wedding Ethnic",
    department: "Womens Wear",
    category: "Dresses",
    price: 39,
    image: "https://m.media-amazon.com/images/I/81UFrYE9AmL._AC_SY879_.jpg",
    description: "Suit Fabric: Kurta: Net|| Sharara: Net|| Inner: Santoon || Work Type: Floral Design Sequence Embroidery Work Style: Straight Kurta with Sharara Suit."
  },
  {
    id: 317,
    name: "Ready to Wear Indian Party/Wedding Wear Designer Palazzo Salwar Suit for Womens Radha",
    department: "Womens Wear",
    category: "Dresses",
    price: 41,
    image: "https://m.media-amazon.com/images/I/71ejOA0Hn+L._AC_SY741_.jpg",
    description: "Beautiful Ready to Wear elegant collection. High-tier embroidery work built beautifully atop premium lightweight georgette base fabrics."
  },
  {
    id: 318,
    name: "DREAMANGEL FASHION Womens Causal Summer Wear Salwar Suit Floral Printed Kurta",
    department: "Womens Wear",
    category: "Dresses",
    price: 29,
    image: "https://m.media-amazon.com/images/I/716sgtfLULL._AC_SY741_.jpg",
    description: "Made from 100% pure cotton fabric that is soft, breathable, and gentle on the skin. Ideal for everyday routines or formal daytime socials."
  },
  {
    id: 319,
    name: "TRENDMALLS Women’s Jaquard Silk Embroidery sequence Work Kurta Palazzo With Dupatta",
    department: "Womens Wear",
    category: "Dresses",
    price: 89,
    image: "https://m.media-amazon.com/images/I/81h5lyeDo+L._AC_SY741_.jpg",
    description: "Suit Fabric: Kurta: Jaquard Silk | Salwar: Viscose Silk | Dupatta: Art Silk | Work: Detailed Luxury Embroidery With Premium Sequence Work."
  },
  {
    id: 320,
    name: "TRENDMALLS Women’s Georgette Embroidery Sequence Work Kurta Pant Dupatta Salwar Suit Set",
    department: "Womens Wear",
    category: "Dresses",
    price: 94,
    image: "https://m.media-amazon.com/images/I/71QXyU8vKtL._AC_SY879_.jpg",
    description: "Premium Cotton Silk base layer complemented perfectly by a flowing embroidered organza overlay shawl wrap accessory."
  },
  {
    id: 321,
    name: "Plus Size Designer Dress for Indian Pakistani Women Stitched Shalwar Kameez Suits",
    department: "Womens Wear",
    category: "Dresses",
    price: 110,
    image: "https://m.media-amazon.com/images/I/713gk0E5CYS._AC_SX679_.jpg",
    description: "Exquisite multi-piece formal suite incorporating custom-tier artisan threading coordinates built to order."
  },
  {
    id: 323,
    name: "TRENDMALLS Women's Georgette Heavy Embroidery sequence Work Anarkali Kurta Pant With Dupatta",
    department: "Womens Wear",
    category: "Dresses",
    price: 48,
    image: "https://m.media-amazon.com/images/I/81oGYwQvEGL._AC_SY879_.jpg",
    description: "Stunning sweeping flared structure featuring luxury round neckline configurations and complete inner comfortable lining profiles."
  },
  {
    id: 324,
    name: "TRENDMALLS Women's Georgette Anarkali Front Slit Indian Pakistani Kurta Lehenga Suit Set",
    department: "Womens Wear",
    category: "Dresses",
    price: 125,
    image: "https://m.media-amazon.com/images/I/81fHFOM6ijL._AC_SY741_.jpg",
    description: "Features sequence embroidery, anarkali front slit layout styling over premium flowing lehenga layered foundation arrays."
  },
  {
    id: 401,
    name: "TRENDMALLS Women's Cotton Embroidery Salwar Suit Set Ready To Wear Collection",
    department: "Womens Wear",
    category: "Dresses",
    price: 145,
    image: "https://m.media-amazon.com/images/I/81sTSy8MD2L._AC_SY879_.jpg",
    description: "Mirror, sequence embroidery with beads border work dupatta elements paired smoothly to tailored flow coordinates."
  },
  {
    id: 402,
    name: "TRENDMALLS Women's Art Silk Sequins Embroidery Salwar Suit Set Kurta Palazzo",
    department: "Womens Wear",
    category: "Dresses",
    price: 115,
    image: "https://m.media-amazon.com/images/I/81cFP-gWGfL._AC_SY741_.jpg",
    description: "Straight luxury silhouette styling crafted seamlessly out of authentic textured art silk base elements."
  },
  
  /* ─── BEAUTY PRODUCTS FOR WOMEN ─── */
  {
    id: 403,
    name: "Julep Eyeshadow 101 Cream-to-Powder Waterproof Eyeshadow Stick – Champagne Shimmer",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 180,
    image: "https://m.media-amazon.com/images/I/81P-k2IHyiL._SL1500_.jpg",
    description: "Starts as a silky, pigment-rich cream and sets to a luminous shimmer powder that stays crease-free and fallout-free all day."
  },
  {
    id: 501,
    name: "Morphe ChromaPlus 12-Pan Eyeshadow Palette - High Pigment Eye Makeup",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 85,
    image: "https://m.media-amazon.com/images/I/416PLF-gYZL._SY300_SX300_QL70_FMwebp_.jpg",
    description: "This eyeshadow palette delivers single-swipe pigment and crease-resistant wear. Features silky mattes and metallic finishes."
  },
  {
    id: 502,
    name: "SHEGLAM Color Bloom Liquid Blush Makeup for Cheeks Matte Finish-Love Cake",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 72,
    image: "https://images-na.ssl-images-amazon.com/images/I/51INVV9sgzL._AC_UL232_SR232,232_.jpg",
    description: "Provides a natural, matte finish blush for a light coverage look. Infused with moisturizing ingredients to hydrate."
  },
  {
    id: 503,
    name: "Liquid Blush #227 Dolly Peach 7.5g – Glass Skin Glow Hydrating Serum Formula",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 58,
    image: "https://m.media-amazon.com/images/I/51RblcLbfVL._SL1500_.jpg",
    description: "Formulated with 70% skincare ingredients to deliver a fresh, dewy glow and radiant flush that looks lit from within."
  },
  {
    id: 504,
    name: "Nature Republic HONEY MELTING LIP (02 FIG) SOFT LIP STICK Hydrating Gloss",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 49,
    image: "https://m.media-amazon.com/images/I/61JhBWhr1jL._SL1500_.jpg",
    description: "A premium lipstick with a soft and smooth texture that can be used as both an elegant lip gloss and a deep hydrating lip balm."
  },
  {
    id: 601,
    name: "Abib PDRN Retinal Eye Patches for Rejuvenating & Puffy Eyes with Glow Jelly",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 42,
    image: "https://m.media-amazon.com/images/I/41z1B+GqlQL._SY300_SX300_QL70_FMwebp_.jpg",
    description: "High-performance blend of PDRN and Retinal, creating a restorative synergy for damaged skin and reducing puffiness."
  },
  {
    id: 602,
    name: "Abib Collagen Overnight Wrapping Mask Jericho Rose Pore Tightening Lifting",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 48,
    image: "https://m.media-amazon.com/images/I/61T10WMJjIL._SL1500_.jpg",
    description: "Ultra-low molecular collagen firms and volumizes for a visibly lifted look. Peptides reinforce skin elasticity seamlessly."
  },
  {
    id: 603,
    name: "MAKI YIKA Moisture Nude Lipstick for Women Hydrate Tinted Lip Balm Glossy Finish",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 38,
    image: "https://m.media-amazon.com/images/I/41lEJEKBhYL._SY300_SX300_QL70_FMwebp_.jpg",
    description: "Formulated with sodium hyaluronate, a powerful hydrator that locks in moisture and keeps your lips healthy and shining."
  },
  {
    id: 604,
    name: "Dusty Pink Honey Tinted Lip Stain Lip Balm Lip Gloss Lipstick Natural Shine",
    department: "Womens Wear",
    category: "Beauty Essentials",
    price: 34,
    image: "https://m.media-amazon.com/images/I/41rpPg5THeL._SY300_SX300_QL70_FMwebp_.jpg",
    description: "Infused with natural honey essence and plant-based oils, this tinted lip balm provides deep nourishment with natural luster."
  }
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [chosenDept, setChosenDept] = useState('All');
  const [chosenCategory, setChosenCategory] = useState('All');
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [actionModalItem, setActionModalItem] = useState(null);

  // Orders Log Database State
  const [placedOrders, setPlacedOrders] = useState([
    { id: "ORD-9942", date: "2026-06-18", total: 145, itemsCount: 2, status: "Delivered" },
    { id: "ORD-8711", date: "2026-07-02", total: 72, itemsCount: 1, status: "In Transit" }
  ]);

  const [shippingForm, setShippingForm] = useState({
    name: '', email: '', street: '', city: '', zip: ''
  });

  // Dynamic category resolution based on the structural catalog ruleset
  const availableCategories = useMemo(() => {
    const filteringSet = new Set();
    completeInventoryData.forEach(item => {
      if (chosenDept === 'All' || item.department === chosenDept) {
        filteringSet.add(item.category);
      }
    });
    return Array.from(filteringSet);
  }, [chosenDept]);

  // Clean subset routing filter algorithm
  const sortedAndFilteredCatalog = useMemo(() => {
    let result = completeInventoryData;
    if (chosenDept !== 'All') result = result.filter(x => x.department === chosenDept);
    if (chosenCategory !== 'All') result = result.filter(x => x.category === chosenCategory);
    return result;
  }, [chosenDept, chosenCategory]);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleModifyQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const targetQty = item.quantity + delta;
        return targetQty > 0 ? { ...item, quantity: targetQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleFormSubmitOrder = (e) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDayString = new Date().toISOString().split('T')[0];
    
    const newOrderRecord = {
      id: newOrderId,
      date: currentDayString,
      total: globalCartPriceSum,
      itemsCount: globalCartItemTotal,
      status: "Processing"
    };

    setPlacedOrders(prev => [newOrderRecord, ...prev]);
    alert(`Success! Order ${newOrderId} generated cleanly for ${shippingForm.name}. خوش تہوار has dispatched your items.`);
    setCart([]);
    setShippingForm({ name: '', email: '', street: '', city: '', zip: '' });
    setCurrentView('orders');
  };

  const globalCartItemTotal = cart.reduce((acc, item) => acc + item.quantity, 0);
  const globalCartPriceSum = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div style={{ backgroundColor: '#fff5f7', minHeight: '100vh', color: '#111827', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <style>{systemStyles}</style>

      {/* ─── BRAND HEADER NAVIGATION ─── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '80px', backgroundColor: '#ffffff', borderBottom: '1px solid #ffb6c1', display: 'flex', justifyContent: 'space-between', padding: '0 4rem', alignItems: 'center', zIndex: 1000, boxShadow: '0 2px 10px rgba(255,182,193,0.15)' }}>
        <div onClick={() => setCurrentView('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
          <div style={{ backgroundColor: '#111827', color: '#ffffff', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px' }}>AA</div>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '4px' }}>خوش تہوار</span>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <span onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', fontWeight: currentView === 'home' ? 'bold' : '500', color: currentView === 'home' ? '#ff69b4' : '#4b5563' }}>Home</span>
          <span onClick={() => { setCurrentView('catalog'); setChosenDept('All'); setChosenCategory('All'); }} style={{ cursor: 'pointer', fontWeight: currentView === 'catalog' ? 'bold' : '500', color: currentView === 'catalog' ? '#ff69b4' : '#4b5563' }}>Collections</span>
          <span onClick={() => setCurrentView('orders')} style={{ cursor: 'pointer', fontWeight: currentView === 'orders' ? 'bold' : '500', color: currentView === 'orders' ? '#ff69b4' : '#4b5563' }}>Track Orders</span>
          <span onClick={() => setCurrentView('account')} style={{ cursor: 'pointer', fontWeight: currentView === 'account' ? 'bold' : '500', color: currentView === 'account' ? '#ff69b4' : '#4b5563' }}>Profile</span>
        </div>

        <div style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsCartOpen(true)}>
          <span>🛍️ Bag ({globalCartItemTotal})</span>
        </div>
      </nav>

      {/* ─── DYNAMIC DISPLAY INTERFACE CANVAS ─── */}
      <div style={{ paddingTop: '80px', flex: '1 0 auto' }}>

        {/* VIEW 1: HOME PRESETS */}
        {currentView === 'home' && (
          <div>
            <header style={{ backgroundColor: '#ffffff', padding: '5.5rem 4rem 3.5rem 4rem', textAlign: 'center' }}>
              <h1 className="luxury-hero-title" style={{ fontSize: '3rem', fontWeight: '900', color: '#111827', margin: 0 }}>
                WELCOME TO <span style={{ color: '#ff69b4' }}>خوش تہوار</span>
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.05rem', margin: '1.25rem auto 2.25rem auto', maxWidth: '640px', lineHeight: '1.6' }}>
                Your Style Comfort and Essentials. Explore curated premium clothing, luxury watches, and fine cosmetics crafted to be loved and remembered.
              </p>
              <button onClick={() => { setCurrentView('catalog'); setChosenDept('All'); setChosenCategory('All'); }} style={{ backgroundColor: '#111827', color: '#ffffff', border: 'none', padding: '1rem 2.5rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
                Browse Premium Storefront →
              </button>
            </header>
            
            {/* DYNAMIC HERO IMAGE FRAME */}
            <section style={{ maxWidth: '1200px', margin: '0 auto 2rem auto', padding: '0 2rem' }}>
              <div className="luxury-hero-banner" style={{ width: '100%', aspectRatio: '16/9', maxHeight: '600px', borderRadius: '8px', overflow: 'hidden', position: 'relative', backgroundColor: '#ffffff' }}>
                <video 
                  src="a.mp4" 
                  autoPlay 
                  loop 
                  playsInline 
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(255, 255, 255, 0.95))', padding: '2rem 3rem' }}>
                  <h2 style={{ color: '#111827', fontSize: '20px', margin: 0, fontWeight: '500', letterSpacing: '0.5px', textAlign: 'center' }}>
                    Classic styles that stay relevant beyond seasons and trends.
                  </h2>
                </div>
              </div>
            </section>

            {/* SEGMENT ROUTING GRID */}
            <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
              <h3
                className="typing-text"
                style={{
                  fontSize: '1.35rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  color: '#ff69b4'
                }}
              >
                Modern clothing crafted with comfort, quality, and confidence in mind.
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                  { name: 'men wears', img: 'ME.png' ,desc: 'Premium Suits, Casual Shirts, and Luxury Watches'},
                  { name: 'Womens Wear', img: 'WO.png',desc: 'Embroidered Shararas, Suits, and Luxury Beauty Essentials' },
                  { name: 'luxury watches', img: 'WAT.png',desc:'premium and luxury watches' },
                  { name: 'beauty products', img: 'Y.png',desc:'shining and beauty' }
                ].map((dept, index) => (
                  <div key={index} onClick={() => { setChosenDept(dept.name); setChosenCategory('All'); setCurrentView('catalog'); }} className="luxury-item-card">
                    <div className="media-aspect-ratio-box" style={{ height: '750px' }}>
                      <img src={dept.img} alt={dept.name} />
                    </div>
                    <div style={{ padding: '1.25rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 'bold' }}>{dept.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: STOREFRONT CATALOG GRID */}
        {currentView === 'catalog' && (
          <div>
            <div className="sticky-filter-panel">
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563' }}>Department:</span>
                {['All', 'Mens Wear', 'Womens Wear'].map(tab => (
                  <button key={tab} onClick={() => { setChosenDept(tab); setChosenCategory('All'); }} style={{ border: 'none', background: chosenDept === tab ? '#111827' : '#ffffff', color: chosenDept === tab ? '#ffffff' : '#4b5563', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', border: '1px solid #ffb6c1', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {tab}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563' }}>Category Focus:</span>
                <select value={chosenCategory} onChange={(e) => setChosenCategory(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ffb6c1', backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <option value="All">All Categories</option>
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <main style={{ padding: '3rem 4rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>Display Grid: <span style={{ color: '#ff69b4' }}>{chosenDept}</span> / {chosenCategory}</h2>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>Showing {sortedAndFilteredCatalog.length} distinct items</p>
              </div>

              <div className="luxury-responsive-grid">
                {sortedAndFilteredCatalog.map(product => (
                  <div 
                    key={product.id} 
                    className="luxury-item-card" 
                    onClick={() => {
                      setActionModalItem(product);
                      setCurrentView('product-detail'); // Redirects cleanly to the new page
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="media-aspect-ratio-box">
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </div>
                    <div style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff69b4', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                        <span>{product.department}</span>
                        <span style={{ color: '#9ca3af' }}>{product.category}</span>
                      </div>
                      <h3 style={{ fontSize: '0.9rem', margin: '0 0 1rem 0', fontWeight: 'bold', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '0.8rem' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>${product.price}.00</span>
                        <span style={{ color: '#ff69b4', fontSize: '0.8rem', fontWeight: 'bold' }}>View Product →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        )}

        {/* VIEW 6: DEDICATED FULL-SCREEN PRODUCT DETAILS PAGE */}
        {currentView === 'product-detail' && actionModalItem && (
          <main style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Navigation Breadcrumb */}
            <div style={{ marginBottom: '2rem' }}>
              <span 
                onClick={() => setCurrentView('catalog')} 
                style={{ cursor: 'pointer', color: '#ff69b4', fontWeight: 'bold', fontSize: '0.9rem' }}
              >
                &larr; Back to Catalog Collection
              </span>
            </div>

            {/* Two-Column Clean Layout */}
            <div style={{ display: 'flex', gap: '4rem', backgroundColor: '#ffffff', padding: '3.5rem', borderRadius: '8px', border: '1px solid #ffb6c1', alignItems: 'flex-start' }}>
              
              {/* Left Column: Full Frame Image View */}
              <div style={{ width: '45%', aspectRatio: '3 / 4', backgroundColor: '#faf8f9', borderRadius: '6px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #f3f4f6' }}>
                <img 
                  src={actionModalItem.image} 
                  alt={actionModalItem.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              </div>

              {/* Right Column: Highlighted Details & Action Block */}
              <div style={{ width: '55%', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ backgroundColor: '#fff5f7', color: '#ff69b4', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(255,105,180,0.2)' }}>
                    {actionModalItem.department}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: '500' }}>
                    {actionModalItem.category}
                  </span>
                </div>

                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: '0 0 1.5rem 0', lineHeight: '1.25' }}>
                  {actionModalItem.name}
                </h1>

                {/* Pricing Panel Box */}
                <div style={{ backgroundColor: '#fff5f7', padding: '1.5rem', borderRadius: '6px', borderLeft: '4px solid #ff69b4', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#6b7280', display: 'block', marginBottom: '0.2rem' }}>Premium Retail Price</span>
                  <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#ff69b4' }}>
                    ${actionModalItem.price}.00
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#065f46', display: 'block', marginTop: '0.4rem', fontWeight: 'bold' }}>
                    ✓ In Stock & Ready to Dispatch
                  </span>
                </div>

                {/* Highlighted Description Section */}
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: '0 0 0.75rem 0' }}>
                    Product Presentation & Details
                  </h3>
                  <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                    {actionModalItem.description}
                  </p>
                </div>

                {/* Order Call-To-Action Controls */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '1.5rem' }}>
                  <button 
                    onClick={() => { handleAddToCart(actionModalItem); setIsCartOpen(true); }} 
                    style={{ flex: 1, backgroundColor: '#ffffff', border: '2px solid #ff69b4', color: '#ff69b4', padding: '1.1rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s' }}
                  >
                    👜 Add Item To Shopping Bag
                  </button>
                  
                  <button 
                    onClick={() => { handleAddToCart(actionModalItem); setCurrentView('checkout'); }} 
                    style={{ flex: 1, backgroundColor: '#111827', color: '#ffffff', border: 'none', padding: '1.1rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '0.95rem' }}
                  >
                    ⚡ Instant Order Checkout
                  </button>
                </div>
              </div>

            </div>
          </main>
        )}

        {/* VIEW 3: CHECKOUT TERMINAL */}
        {currentView === 'checkout' && (
          <main style={{ padding: '4rem', maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: '6px', border: '1px solid #ffb6c1' }}>
              <h2 style={{ margin: '0 0 1.5rem 0', fontWeight: 'bold', fontSize: '1.4rem' }}>Secure Order Settlement Terminal</h2>
              <form onSubmit={handleFormSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <input required placeholder="Your Full Shipping Name" value={shippingForm.name} onChange={e => setShippingForm({...shippingForm, name: e.target.value})} className="luxury-input-element" />
                <input required type="email" placeholder="Billing Email Address" value={shippingForm.email} onChange={e => setShippingForm({...shippingForm, email: e.target.value})} className="luxury-input-element" />
                <input required placeholder="Destination Delivery Physical Address Line" value={shippingForm.street} onChange={e => setShippingForm({...shippingForm, street: e.target.value})} className="luxury-input-element" />
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input required placeholder="City Location" value={shippingForm.city} onChange={e => setShippingForm({...shippingForm, city: e.target.value})} className="luxury-input-element" />
                  <input required placeholder="Postal Zip Code" value={shippingForm.zip} onChange={e => setShippingForm({...shippingForm, zip: e.target.value})} className="luxury-input-element" />
                </div>

                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fff5f7', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Total Cost Balance:</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff69b4' }}>${globalCartPriceSum}.00</span>
                </div>

                <button type="submit" style={{ backgroundColor: '#111827', color: '#ffffff', border: 'none', padding: '1.1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>
                  Authorize Order Securely
                </button>
              </form>
            </div>
          </main>
        )}

        {/* VIEW 4: ORGANIZED ORDERS PAGE */}
        {currentView === 'orders' && (
          <main style={{ padding: '4rem', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '6px', border: '1px solid #ffb6c1' }}>
              <h2 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', fontSize: '1.6rem' }}>Your Transacted Orders</h2>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>Review logs and fulfillment parameters of your purchases.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {placedOrders.map((order) => (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', border: '1px solid #f3f4f6', borderRadius: '4px', backgroundColor: '#faf8f9' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#111827' }}>{order.id}</span>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.2rem' }}>Placed on: {order.date}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{order.itemsCount} Total Item(s)</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#ff69b4', marginRight: '2rem' }}>${order.total}.00</span>
                      <span style={{ display: 'inline-block', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: order.status === 'Delivered' ? '#d1fae5' : '#fef3c7', color: order.status === 'Delivered' ? '#065f46' : '#92400e' }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {/* VIEW 5: USER PROFILE ACCOUNT PAGE */}
        {currentView === 'account' && (
          <main style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: '6px', border: '1px solid #ffb6c1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '2rem', marginBottom: '2rem' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#ff69b4', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 'bold' }}>
                  FS
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>Fariha Shahbaz</h2>
                  <p style={{ margin: '0.2rem 0 0 0', color: '#6b7280', fontSize: '0.85rem' }}>Premium Luxury Tier Member</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Profile Coordinates</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                    <div><strong>Registered Email:</strong> fariha@example.com</div>
                    <div><strong>Prime Phone:</strong> +92 300 2000 89</div>
                    <div><strong>Default Currency:</strong> USD ($)</div>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Account Privileges</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                    <div>✨ Free Express Delivery Active</div>
                    <div>👑 VIP Preview Access Granted</div>
                    <div>🎟️ 15% Seasonal Discount Applicable</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* ─── ACTION OPTIONS OVERLAY WINDOW ─── */}
      {actionModalItem && currentView !== 'product-detail' && (
        <div onClick={() => setActionModalItem(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 4000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#ffffff', borderRadius: '6px', width: '100%', maxWidth: '640px', overflow: 'hidden', display: 'flex', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
            <div style={{ width: '50%', aspectRatio: '3 / 4', overflow: 'hidden' }}>
              <img 
                src={actionModalItem.image} 
                alt={actionModalItem.name} 
                style={{ width: '200px', height: '470px', objectFit: 'cover', objectPosition: 'top center' }} 
              />
            </div>
            <div style={{ width: '50%', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#ff69b4', fontWeight: 'bold' }}>{actionModalItem.department}</span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.4rem 0' }}>{actionModalItem.name}</h2>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ff69b4', marginBottom: '0.8rem' }}>${actionModalItem.price}.00</span>
              <p style={{ color: '#4b5563', fontSize: '0.85rem', lineHeight: '1.45', marginBottom: '1.5rem' }}>{actionModalItem.description}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
                <button onClick={() => { handleAddToCart(actionModalItem); setActionModalItem(null); setIsCartOpen(true); }} style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #ff69b4', color: '#ff69b4', padding: '0.8rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  👜 Add Item To Shopping Bag
                </button>
                <button onClick={() => { handleAddToCart(actionModalItem); setActionModalItem(null); setCurrentView('checkout'); }} style={{ width: '100%', backgroundColor: '#111827', color: '#ffffff', border: 'none', padding: '0.85rem', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ⚡ Instant Direct Order Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SHOPPING BAG DRAWER SLIDE OVERLAY ─── */}
      {isCartOpen && (
        <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Your Bag ({globalCartItemTotal})</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.length === 0 ? (
                <p style={{ color: '#9ca3af', textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem' }}>The selection basket is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.8rem' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 'bold' }}>{item.name}</h4>
                      <span style={{ fontSize: '0.85rem', color: '#ff69b4', fontWeight: 'bold' }}>${item.price}.00</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
                        <button onClick={() => handleModifyQuantity(item.id, -1)} style={{ padding: '1px 7px', border: '1px solid #ffb6c1', background: '#ffffff', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{item.quantity}</span>
                        <button onClick={() => handleModifyQuantity(item.id, 1)} style={{ padding: '1px 7px', border: '1px solid #ffb6c1', background: '#ffffff', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1.2rem' }}>
                  <span>Subtotal Value:</span>
                  <span style={{ color: '#ff69b4' }}>${globalCartPriceSum}.00</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); setCurrentView('checkout'); }} style={{ width: '100%', backgroundColor: '#111827', color: '#ffffff', border: 'none', padding: '1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
                  Proceed To Checkout Terminal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── PERSISTENT SYSTEM FOOTER ─── */}
      <footer style={{ flexShrink: 0, backgroundColor: '#ffffff', borderTop: '1px solid #ffb6c1', padding: '3rem 4rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '3px', color: '#111827' }}>خوش تہوار</span>
            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem', maxWidth: '280px' }}>
              Redefining premium minimalist fashion coordinates across premium Menswear and Womenswear lines.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h5 style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', fontWeight: 'bold', uppercase: 'true' }}>Explore</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: '#4b5563', cursor: 'pointer' }}>
                <span onClick={() => { setChosenDept('Mens Wear'); setChosenCategory('All'); setCurrentView('catalog'); }}>Mens Wear</span>
                <span onClick={() => { setChosenDept('Womens Wear'); setChosenCategory('All'); setCurrentView('catalog'); }}>Womens Wear</span>
              </div>
            </div>
            <div>
              <h5 style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', fontWeight: 'bold' }}>Support</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: '#4b5563' }}>
                <span>Secure Payments</span>
                <span>Fulfillment Policy</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', marginTop: '2.5rem', borderTop: '1px solid #faf8f9', paddingTop: '1.5rem' }}>
          © 2026 خوش تہوار Premium Luxury Collective. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;