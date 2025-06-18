import React, { useState } from 'react';
import './StayEasyServiceSection.css';

// Placeholder icons
const IconForkKnife = () => <span className="ses-icon">🍴</span>;
const IconCart = () => <span className="ses-icon">🛒</span>;
const IconPerson = () => <span className="ses-icon">💁</span>; // Example: Person Tipping Hand
const IconWashingMachine = () => <span className="ses-icon">🧺</span>;


function StayEasyServiceSection() {
  const [items, setItems] = useState([
    { id: 1, name: '1kg sugar', text: '1kg sugar', isEditing: false },
    { id: 2, name: 'Brown bread (400gm)', text: 'Brown bread (400gm)', isEditing: false },
    { id: 3, name: '', text: '', isEditing: true }, // Start with one empty, editable field
  ]);

  const handleItemChange = (id, newText) => {
    setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, text: newText } : item));
  };
  
  const handleItemBlur = (id) => {
     setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, isEditing: false, name: item.text } : item));
  };

  const handleAddItem = () => {
    // Make current last item non-editable if it was empty
     setItems(prevItems => {
        const lastItem = prevItems[prevItems.length -1];
        if (lastItem && lastItem.isEditing && lastItem.text === ''){
            // if last item is empty and being edited, don't add new, or remove it
            // for this case, let's just focus it or do nothing special
            return prevItems;
        }
        // make last item non-editable
        const updatedItems = prevItems.map((item, index) => index === prevItems.length -1 ? {...item, isEditing: false, name: item.text || `Item ${item.id}`} : item);
        return [...updatedItems, {id: Date.now(), name:'', text:'', isEditing: true}];
     })
  };

  const handleRemoveItem = (idToRemove) => {
    if (items.length === 1 && items[0].id === idToRemove) { // Don't remove the last item, just clear it
        setItems([{ id: 1, name: '', text: '', isEditing: true }]);
        return;
    }
    setItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
  };

  return (
    <div className="stay-easy-service-section">
      <div className="ses-icon-bar">
        <IconForkKnife />
        <IconCart />
        <IconPerson />
        <IconWashingMachine />
      </div>
      <h2 className="ses-title">Stay Easy Service</h2>
      <p className="ses-description">
        You can ask for equipment you need but is lacking from the house and we will try our best
        to provide it. You can also use this space to create a shopping list.
      </p>

      <div className="ses-item-list">
        {items.map((item, index) => (
          <div key={item.id} className="ses-item">
            <span className="ses-item-number">{index + 1}.</span>
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleItemChange(item.id, e.target.value)}
              onFocus={() => setItems(prev => prev.map(i => i.id === item.id ? {...i, isEditing: true} : i))}
              onBlur={() => handleItemBlur(item.id)}
              placeholder="Enter item name"
              className="ses-item-input"
            />
            <div className="ses-item-actions">
              { (index === items.length - 1 && item.isEditing) || items.length > 1 ? // Show minus for all but the only item if it's not the add button focus
                <button className="ses-action-button minus" onClick={() => handleRemoveItem(item.id)}>-</button>
                : <div className="ses-action-placeholder"></div> /* Placeholder to keep alignment */
              }
              {index === items.length - 1 && ( // Only show plus on the last item
                <button className="ses-action-button plus" onClick={handleAddItem}>+</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="ses-request-button">REQUEST</button>
    </div>
  );
}
export default StayEasyServiceSection;