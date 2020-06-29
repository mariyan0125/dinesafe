import React from 'react';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StarRating = ({rating}) => {
  const totalRating = 5;
  
  const size = rating / 2 / totalRating * 100;
  const sizeRounded = Math.round(size / 10) * 10 +'%';
  
  
  
  return (
    <div>
    <div className="stars-outer">
      <span className="star-grey"><FontAwesomeIcon icon={faStar}  color="#ddd" size="2x"/></span>
      <span className="star-grey"><FontAwesomeIcon icon={faStar}  color="#ddd" size="2x"/></span>
      <span className="star-grey"><FontAwesomeIcon icon={faStar}  color="#ddd" size="2x"/></span>
      <span className="star-grey"><FontAwesomeIcon icon={faStar}  color="#ddd" size="2x"/></span>
      <span className="star-grey"><FontAwesomeIcon icon={faStar}  color="#ddd" size="2x"/></span>
    
      <div className="stars-inner" style={{width:`${sizeRounded}`}}>
        <span className="star-gold"><FontAwesomeIcon icon={faStar} color="#FFD700"  size="2x" /></span>
        <span className="star-gold"><FontAwesomeIcon icon={faStar}  color="#FFD700" size="2x"/></span>
        <span className="star-gold"><FontAwesomeIcon icon={faStar}  color="#FFD700" size="2x"/></span>
        <span className="star-gold"><FontAwesomeIcon icon={faStar}  color="#FFD700" size="2x"/></span>
        <span className="star-gold"><FontAwesomeIcon icon={faStar}  color="#FFD700" size="2x"/></span>
      </div> 
    </div>
    </div>
  )
}

