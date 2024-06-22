import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard.js';
import { fetchData, fetchImageURL } from '../firebaseService.js';

const HotelList = () => {
  const [search, setSearch] = useState('');
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    fetchData("hotels").then(async data => {
      const hotelsWithImageURLs = await Promise.all(data.map(async hotel => {
        if (hotel.image) {
          hotel.imageURL = await fetchImageURL(hotel.image);
        }
        return hotel;
      }));
      setHotels(hotelsWithImageURLs);
      setFilteredHotels(hotelsWithImageURLs);
    });
  }, []);

  useEffect(() => {
    setFilteredHotels(
      hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.location.toLowerCase().includes(search.toLowerCase()) ||
        hotel.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, hotels]);

  return (
    <section id="findoffers" className="browse-section">
      <p className="title-middle">Explore the hotels</p>
      <input
        className="searchbar"
        placeholder="Search by hotel name, place etc."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <section className="grid hotel-cards">
        {filteredHotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </section>
    </section>
  );
};

export default HotelList;
