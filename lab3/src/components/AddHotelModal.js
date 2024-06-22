import React, { useState } from 'react';
import './AddHotelModal.css';

const AddHotelModal = ({ isOpen, onClose, onAdd }) => {
  const [hotelName, setHotelName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (hotelName && description && location && price && category) {
      onAdd({ hotelName, description, location, price, category });
      onClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  if (!isOpen) return null;

  return (
    
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Add new offer</h2>
          <button className="close-button" onClick={onClose} style={{fontSize: 72, fontFamily:'Roboto'}} >&times;</button>
          </div>

          <div className="modal-content">
            <div className="form-group full-width">
              <label htmlFor="hotelName">Hotel name</label>
              <input
                id="hotelName"
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                placeholder="Provide the hotel name"
              />
            </div>

            <div className="form-group full-width description-part">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description of your hotel"
              />
            </div>

            <div className="form-group inline-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City"
                />
                
                
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Cost per room per night"
                />
                

                <label htmlFor="category">Local category</label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Max 5 stars, min 1 star"
                />
                
            </div>

          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={onClose}>Cancel</button>
            <button className="buttonAdd primaryAdd" onClick={handleAdd}>Add</button>
          </div>
        </div>
      </div>
  );
};

export default AddHotelModal;