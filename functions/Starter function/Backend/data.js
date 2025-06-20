// This file acts as our in-memory database.

// Note on Images: These paths assume your frontend's `public` folder has this structure:
// public/assets/hero-image.jpg
// public/assets/listings/tsavo-apartment-exterior.jpg
// public/assets/menu/burger-chips.jpg
// etc.
// The frontend will prepend `process.env.PUBLIC_URL` to these paths.

const homePageData = {
  featuredListing: {
    id: 'tsavo-01',
    title: 'One Bedroom apartment at Tsavo apartments Ongata Rongai, Kenya.',
    location: 'Ongata Rongai, Kenya.',
    description: "Birne's is a charming getaway nestled in the peaceful Tsavo apartment locted in Rongai. This cozy retreat features a serene swimming pool, a spacious sundeck, and a delight gazibo, perfect for families and travelers seeking relaxation and comfort.",
    mainImage: '/assets/listing-main.jpg',
    thumbnails: ['/assets/thumb1.jpg', '/assets/thumb2.jpg', '/assets/thumb3.jpg', '/assets/thumb4.jpg'],
    price: 'KES 2800/-',
  },
  amenitiesList: [
    { icon: 'wifi', text: 'High-Speed Wifi' }, { icon: 'tv', text: 'Large Screen Television' },
    { icon: 'kitchen', text: 'Fully Equipped Kitchen' }, { icon: 'sofa', text: 'Comfortable Living Area' },
    { icon: 'bed', text: 'Cozy Queen Bedroom' }, { icon: 'bath', text: 'Fresh Linens & Towels' },
    { icon: 'shower', text: 'Reliable Hot Shower' }, { icon: 'water', text: 'Clean Running Water' },
    { icon: 'parking', text: 'Secure Ample Parking' }, { icon: 'pool', text: 'Refreshing Outdoor Pool' },
    { icon: 'tree', text: 'Beautiful Scenic Views' }, { icon: 'security', text: '24/7 On-site Security' },
  ],
  hostInfo: {
    name: "Marvin O. (Your Host)",
    image: '/assets/host-image-detailed.jpg',
    quote: "Welcome to Birne's BNB! My goal is to ensure you have a memorable and comfortable stay. Feel free to reach out for anything you need.",
  },
  houseRules: {
    checkIn: 'Check-in: After 2:00 PM',
    checkOut: 'Check-out: Before 11:00 AM',
    note: 'Early check-in or late check-out may be available upon request, subject to availability. Please inquire in advance.',
  },
  stayGuidelines: [{ icon: 'camera', text: 'Photography is welcome!' }],
  departureGuidelines: [
    { icon: 'gather-items', text: 'Gather all used towels and linens.' },
    { icon: 'trash', text: 'Kindly dispose of any trash in the provided bins.' },
    { icon: 'power-off', text: 'Turn off all lights, AC, and appliances.' },
    { icon: 'lock', text: 'Ensure all windows and doors are securely locked.' },
    { icon: 'key', text: 'Return keys as per instructions.' },
  ],
  departureNote: "We hope you had a wonderful stay! Please leave the apartment in a tidy condition. Safe travels!",
  heroImage: '/assets/hero-image.jpg',
};

const allListingsData = [
  {
    id: 'tsavo-01',
    title: 'Tsavo Apartment - Ongata Rongai (1BR)',
    location: 'Ongata Rongai, Kajiado County',
    pricePerNight: 2800,
    image: '/assets/listings/tsavo-apartment-exterior.jpg',
    rating: 4.7, reviews: 102,
    shortDescription: 'Charming 1BR with pool, sundeck, and delightful gazebo.',
    bedrooms: 1, beds: 1, baths: 1, guests: 2,
  },
  {
    id: 'karen-02',
    title: 'Serene Studio in Karen with Garden',
    location: 'Karen, Nairobi',
    pricePerNight: 3500,
    image: '/assets/listings/serene-studio-karen.jpg',
    rating: 4.9, reviews: 75,
    shortDescription: 'Peaceful getaway with modern amenities and lush garden surroundings.',
    bedrooms: 0, beds: 1, baths: 1, guests: 2,
  },
  {
    id: 'city-03',
    title: 'City View Penthouse, Upper Hill (2BR)',
    location: 'Upper Hill, Nairobi',
    pricePerNight: 7200,
    image: '/assets/listings/city-penthouse.jpg',
    rating: 4.8, reviews: 40,
    shortDescription: 'Luxurious stay with breathtaking city views and premium comforts.',
    bedrooms: 2, beds: 2, baths: 2, guests: 4,
  },
  {
    id: 'diani-04',
    title: 'Diani Beachfront Villa (3BR)',
    location: 'Diani Beach, Kwale County',
    pricePerNight: 12500,
    image: '/assets/listings/diani-villa.jpg',
    rating: 5.0, reviews: 98,
    shortDescription: 'Stunning villa right on the beach, private pool, and dedicated staff.',
    bedrooms: 3, beds: 4, baths: 3, guests: 6,
  },
];

const menuData = {
  foods: [
    { id: 'f1', name: 'Signature Beef Burger & Chips', price: 650, image: '/assets/menu/burger-chips.jpg', description: 'Juicy beef patty, cheddar, lettuce, tomato, signature sauce, with crispy golden fries.', sides: [{ name: 'Coleslaw', price: 100 }, { name: 'Extra Large Chips', price: 250 }, {name: 'Onion Rings', price: 150}] },
    { id: 'f2', name: 'Grilled Chicken Sandwich Supreme', price: 580, image: '/assets/menu/chicken-sandwich.jpg', description: 'Tender grilled chicken breast, crispy bacon, avocado, lettuce, and tomato on toasted artisan bread.', sides: [{ name: 'Side Salad', price: 120 }, {name: 'Fruit Platter', price: 200}] },
    { id: 'f3', name: 'Artisan Veggie Pizza (Medium)', price: 900, image: '/assets/menu/veggie-pizza.jpg', description: 'A colorful medley of fresh seasonal vegetables on a thin crispy crust with rich tomato sauce and mozzarella.', sides: [] }
  ],
  drinks: [
    { id: 'd1', name: 'Coca-Cola/Fanta/Sprite', price: 100, image: '/assets/menu/soda.jpg', description: 'Chilled 300ml soda.' },
    { id: 'd2', name: 'Fresh Passion Juice', price: 250, image: '/assets/menu/juice.jpg', description: 'Refreshing, freshly squeezed passion fruit juice.' }
  ],
};

const stayEasyServiceItems = [
  { id: 'item1', name: 'Extra Sugar Sachet (10g)', price: 10 },
  { id: 'item2', name: 'Brown Bread (Loaf, 400gm)', price: 150 },
  { id: 'item3', name: 'Fresh Milk (500ml)', price: 100 }
];

module.exports = {
  homePageData,
  allListingsData,
  menuData,
  stayEasyServiceItems,
};