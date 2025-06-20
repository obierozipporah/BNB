import React, { useState } from 'react';
import './OrderFoodSection.css';
import FoodItemModal from './FoodItemModal';
import CheckoutModal from './CheckoutModal';

// Mock Data (replace with API data)
const initialMenuData = {
  foods: [
    { id: 'f1', name: 'Beef burger with chips', price: 250, image: '/assets/menu/burger-chips.jpg', sides: [{ name: 'Coleslaw', price: 50 }, { name: 'Large chips', price: 200 }] },
    { id: 'f2', name: 'Chicken sandwich', price: 220, image: '/assets/menu/chicken-sandwich.jpg', sides: [{ name: 'Salad', price: 40 }] },
    { id: 'f3', name: 'Veggie Pizza', price: 300, image: '/assets/menu/veggie-pizza.jpg', sides: [] },
    // Add more food items, ensure image paths are relative to public or use full URLs
  ],
  drinks: [
    { id: 'd1', name: 'Soda', price: 50, image: '/assets/menu/soda.jpg' },
    { id: 'd2', name: 'Fresh Juice', price: 100, image: '/assets/menu/juice.jpg' },
  ],
};
// Ensure you have images in public/assets/menu/ or update paths

function OrderFoodSection() {
  const [activeTab, setActiveTab] = useState('foods'); // 'foods' or 'drinks'
  const [menuData, setMenuData] = useState(initialMenuData);
  const [cart, setCart] = useState([]); // { item, quantity, selectedSides, totalPrice }
  
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleOpenItemModal = (item) => {
    setSelectedItemForModal(item);
    setIsItemModalOpen(true);
  };

  const handleAddItemToCart = (item, quantity, selectedSides = []) => {
    // Basic add to cart logic, can be improved for updates, etc.
    const itemPrice = item.price;
    const sidesPrice = selectedSides.reduce((sum, side) => sum + side.price, 0);
    const totalItemPrice = (itemPrice + sidesPrice) * quantity;

    setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(cartItem => cartItem.item.id === item.id && JSON.stringify(cartItem.selectedSides) === JSON.stringify(selectedSides) ); // Simple check
        if (existingItemIndex > -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity += quantity;
            updatedCart[existingItemIndex].totalPrice += totalItemPrice;
            return updatedCart;
        } else {
            return [...prevCart, { item, quantity, selectedSides, totalPrice: totalItemPrice }];
        }
    });
    setIsItemModalOpen(false);
  };

  const handleRemoveFromCart = (itemIndex) => {
    setCart(prevCart => prevCart.filter((_, index) => index !== itemIndex));
  };
  
  const calculateGrandTotal = () => {
    return cart.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);
  };

  const itemsToDisplay = activeTab === 'foods' ? menuData.foods : menuData.drinks;

  return (
    <div className="order-food-section">
      <div className="menu-header">
        <h2 className="section-main-title">OUR MENU</h2>
        <div className="menu-tabs">
          <button className={activeTab === 'foods' ? 'active' : ''} onClick={() => setActiveTab('foods')}>FOODS</button>
          <button className={activeTab === 'drinks' ? 'active' : ''} onClick={() => setActiveTab('drinks')}>DRINKS</button>
        </div>
      </div>

      <div className="menu-item-list">
        {itemsToDisplay.map(item => (
          <div key={item.id} className="menu-item-card">
            <img src={item.image || '/assets/menu/placeholder.jpg'} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <p className="menu-item-name">{item.name}</p>
              <p className="menu-item-price">Ksh {item.price}/-</p>
            </div>
            <button className="menu-item-add-button" onClick={() => handleOpenItemModal(item)}>+</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <button className="view-order-button" onClick={() => setIsCheckoutModalOpen(true)}>
          VIEW ORDER ({cart.reduce((acc, curr) => acc + curr.quantity, 0)})
        </button>
      )}

      {isItemModalOpen && selectedItemForModal && (
        <FoodItemModal
          item={selectedItemForModal}
          onClose={() => setIsItemModalOpen(false)}
          onAddToCart={handleAddItemToCart}
        />
      )}

      {isCheckoutModalOpen && (
        <CheckoutModal
          cart={cart}
          grandTotal={calculateGrandTotal()}
          onClose={() => setIsCheckoutModalOpen(false)}
          onPlaceOrder={() => { alert('Order Placed!'); setCart([]); setIsCheckoutModalOpen(false);}}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )}
    </div>
  );
}
export default OrderFoodSection;