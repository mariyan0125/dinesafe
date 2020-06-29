import React, { useContext } from 'react';
import { FoursquareContext } from '../contexts/FoursquareContext';
import { StarRating } from './StarRating';
import { DineSafeContext } from '../contexts/DineSafeContext';



export const VenueListModal = ({ data, toggleModalState }) => {
  const { details, generateImgUrl } = useContext(FoursquareContext);
  const { getResult } = useContext(DineSafeContext);
  

  let sign = '';   
  if(details.venue.price !== undefined) {
    for(let i = 0; i < details.venue.price.tier; i++) { sign += '$'} 
  }
  const price = (details.venue.price !== undefined) ?  sign : 'No price info available';
  const menu = (details.venue.menu !== undefined) ? <a className="btn-text" href={details.venue.menu.url}>View menu &rarr;</a> : '';
  const url = (details.venue.url !== undefined) ? <a className="btn-text" href={details.venue.url}>Visit website &rarr;</a> : '';
  const photo = (details.venue.bestPhoto !== undefined) ? generateImgUrl(details.venue.bestPhoto.prefix, details.venue.bestPhoto.suffix) : 'img/plate-small.png';
  
  const safety = (details.venue.name !== undefined && details.venue.location.address !== undefined) ? getResult(details.venue.name, details.venue.location.address) : 'Not available';
  
  return (
    <div className='modal'>
      <div className="modal__close-btn" onClick={() => toggleModalState(data.venue.id)}>x</div>
      <div className="modal__img"><img src={photo} alt="The venue"/></div>
      <div><StarRating rating={details.venue.rating} / ></div>
    
      <div className="modal__content">
        <h2 className="modal__content-title heading-tertiary">{data.venue.name}</h2>
        <div className="modal__content-price">Price: <span>{price}</span></div>
        <div className="modal__pass">
          <h3 className="modal__pass-title">Dine Safe status</h3>{safety}
        </div>
        <div className="modal__content-menu">{menu}</div>
        <div className="modal__content-venue">{url}</div>
      </div>
    </div>
  )
}
