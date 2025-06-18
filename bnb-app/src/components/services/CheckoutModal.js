import React from 'react';
import './Modals.css'; // Shared CSS

function CheckoutModal({ cart, grandTotal, onClose, onPlaceOrder, onRemoveFromCart }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content checkout-modal-content">
        <h3 className="modal-title">CHECKOUT</h3>
        {cart.length === 0 ? (
          <p>Your order is empty.</p>
        ) : (
          <div className="checkout-items-list">
            {cart.map((cartItem, index) => (
              <div key={index} className="checkout-item">
                <img src={cartItem.item.image || '/assets/menu/placeholder.jpg'} alt={cartItem.item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <p>{cartItem.item.name} (x{cartItem.quantity})</p>
                  {cartItem.selectedSides && cartItem.selectedSides.length > 0 && (
                    <ul className="checkout-item-sides">
                      {cartItem.selectedSides.map(side => (
                        <li key={side.name}>{side.name} (x{side.quantity})</li>
                      ))}
                    </ul>
                  )}
                  <p>Ksh {cartItem.totalPrice}/-</p>
                </div>
                <button className="checkout-item-remove" onClick={() => onRemoveFromCart(index)}>-</button>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="checkout-total">
            <p>TOTAL: Ksh {grandTotal}/=</p>
          </div>
        )}
        <div className="modal-actions">
          <button className="modal-button primary" onClick={onPlaceOrder} disabled={cart.length === 0}>PLACE ORDER</button>
          <button className="modal-button secondary" onClick={onClose}>CANCEL ORDER</button>
        </div>
      </div>
    </div>
  );
}
export default CheckoutModal;