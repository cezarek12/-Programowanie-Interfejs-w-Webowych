import React from 'react';
import { Link } from 'react-router-dom';
import heartFull from '../Assets/heart-full.png';
import heartEmpty from '../Assets/heart-empty.png';
import arrow from '../Assets/Arrow.svg';


const HotelCard = ({ hotel }) => {
    return (

        <article className="hotel-card " style={{padding:"24px"}} >
            <div className="card-image" style={{ backgroundImage: `url(${hotel.image})` }}>
                <div className="chip-heart-container">
                    <p className="chip">{hotel.location}</p>
                    <div className="heart">
                        <img src={hotel.favorite ? heartFull : heartEmpty} alt="favorite" />
                    </div>
                </div>
            </div>
            <p className="text-middle">{hotel.name}</p>
            <p className="text-small">{hotel.description}</p>
            <div className="hotel-card-footer">
                <p className="text-middle">{hotel.rating}</p>
                <p className="text-middle">{hotel.price}</p>
            </div>
            <Link to={`/hotel/${hotel.id}`} className='link-to-button'>
                <button className="button primary">
                    Find more <img src={arrow} alt="arrow" />
                </button>
            </Link>
        </article>
    );
};

export default HotelCard;
