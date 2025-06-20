import React, { useState } from 'react';
import './Modals.css'; // Shared CSS for modals

function FoodItemModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1); // Default quantity for the main item
  const [selectedSides, setSelectedSides] = useState([]); // { name, price, quantity }

  const handleSideSelection = (side, add) => {
    setSelectedSides(prevSides => {
      const existingSideIndex = prevSides.findIndex(s => s.name === side.name);
      if (add) {
        if (existingSideIndex > -1) {
          const updatedSides = [...prevSides];
          updatedSides[existingSideIndex].quantity += 1;
          return updatedSides;
        } else {
          return [...prevSides, { ...side, quantity: 1 }];
        }
      } else { // Remove
        if (existingSideIndex > -1) {
          const updatedSides = [...prevSides];
          if (updatedSides[existingSideIndex].quantity > 1) {
            updatedSides[existingSideIndex].quantity -= 1;
            return updatedSides;
          } else {
            return updatedSides.filter(s => s.name !== side.name);
          }
        }
      }
      return prevSides;
    });
  };
  
  const getSideQuantity = (sideName) => {
    const side = selectedSides.find(s => s.name === sideName);
    return side ? side.quantity : 0;
  };

  const handleFinalAddToCart = () => {
    // Pass the main item quantity and the selected sides (name and price are enough for calculation)
    const sidesForCart = selectedSides.map(s => ({ name: s.name, price: s.price, quantity: s.quantity }));
    onAddToCart(item, quantity, sidesForCart);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content food-item-modal-content">
        <img src={item.image || '/assets/menu/placeholder.jpg'} alt={item.name} className="modal-item-image" />
        <h3 className="modal-item-name">{item.name}</h3>
        <p className="modal-item-price">Ksh {item.price}/-</p>

        {item.sides && item.sides.length > 0 && (
          <div className="sides-selection">
            <h4>Choose your side</h4>
            {item.sides.map(side => (
              <div key={side.name} className="side-item">
                <span>{side.name} (Ksh {side.price}/=)</span>
                <div className="side-controls">
                  <button onClick={() => handleSideSelection(side, false)} disabled={getSideQuantity(side.name) === 0}>-</button>
                  <span>{getSideQuantity(side.name)}</span>
                  <button onClick={() => handleSideSelection(side, true)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button className="modal-button primary" onClick={handleFinalAddToCart}>ADD ORDER</button>
          <button className="modal-button secondary" onClick={onClose}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}
export default FoodItemModal;