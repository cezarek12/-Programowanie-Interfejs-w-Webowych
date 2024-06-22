import React, { useState } from 'react';
import hotels from '../data';
import HotelCard from './HotelCard';

const HotelList = () => {
    const [search, setSearch] = useState('');

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.location.toLowerCase().includes(search.toLowerCase()) ||
        hotel.description.toLowerCase().includes(search.toLowerCase())
    );

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
