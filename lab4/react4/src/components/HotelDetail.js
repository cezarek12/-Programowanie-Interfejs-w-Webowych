import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import heartFull from '../Assets/heart-full.png';
import heartEmpty from '../Assets/heart-empty.png';
import mail from '../Assets/mail.png';
import '../App.css';
import {fetchData, fetchImageURL} from '../firebaseService.js';

const HotelDetail = () => {
    const { id } = useParams();  
    const [hotel, setHotel] = useState(null);
    const [imageURL, setImageURL] = useState('');

    console.log("HotelDetail component rendered with id:", id);
    useEffect(() => {
        const getHotelData = async () => {
            console.log("Fetching data for hotel id:", id);
            const data = await fetchData("hotels");
            const foundHotel = data.find(h => h.id === parseInt(id, 10));  
            console.log("Found hotel:", foundHotel);
            setHotel(foundHotel);

            if (foundHotel && foundHotel.image) {
                const url = await fetchImageURL(foundHotel.image);
                setImageURL(url);
            }
        };

        getHotelData();
    }, [id]);

    return hotel ? (
        <div>
            <div id='hero' className="hero-hotelDetail">
                <p className="title-large">{hotel.name}</p>
            </div>

            <div className="grid-hotelDetail" style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                <div className="hotel-detail-image-left" style={{ backgroundImage: `url(${imageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <button className='button-primary-detail'>
                        {hotel.favorite ? 'Undo from favorites' : 'Add to favorites'} <img src={hotel.favorite ? heartFull : heartEmpty} alt="favorite" />
                    </button>
                </div>
                <div className='grid-hotelDetail-row-right-column' style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className='hotelDetail-text-row'>
                        <p><strong>Location:</strong> {hotel.location}</p>
                        <p><strong>Local category:</strong> {hotel.rating}</p>
                        <p><strong>Price per night:</strong> {hotel.price}</p>
                        <p><strong>Description:</strong> <div style={{ paddingTop: '32px', paddingBottom: '48px' }}>{hotel.description}</div></p>
                    </div>
                    <div>
                        <button className='button-contact primary-contact'>
                            Contact <img src={mail} alt="contact" />
                        </button>
                    </div>
                    <div className='hotelDetail-image-row' style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '64px' }}>
                        <img src={imageURL} alt={hotel.name} style={{ width: '46%', height: '200px', objectFit: 'cover', borderRadius: '32px' }} />
                        <img src={imageURL} alt={hotel.name} style={{ width: '46%', height: '200px', objectFit: 'cover', borderRadius: '32px' }} />
                    </div>
                </div>
            </div>
        </div>
    ) : <p>Loading...</p>;
};

export default HotelDetail;
