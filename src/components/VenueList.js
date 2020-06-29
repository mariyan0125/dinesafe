import React, { useContext, useState } from 'react';
import { FoursquareContext } from '../contexts/FoursquareContext';
import { VenueListModal } from './VenueListModal';



export const VenueList = () => {
 
  const { data, isLoading, isError, getDetails } = useContext(FoursquareContext);

  const [modalState, setModalState] = useState({});
  const toggleModalState = (id) => {
      setModalState(prevModalState => ({
        ...prevModalState,
        [id]: !prevModalState[id]
      }));
    }
  
  const handleClick = (e) => {
    e.preventDefault(); 
    toggleModalState(e.target.value);
    getDetails(e.target.value);
      
  }
 


  return !data ? null : (
    isLoading ? (<div>... loading</div>) :
    (<div className='venue-items'>
      <div>{isError ? '...something went wrong' : ''}</div>
     
      { data[0].items.map(data => {
        return (
          <div className='venue-items__container' key={data.venue.id}>
            <div className='venue-items__item'>
              <div className='container'>
                  <h2 className='venue-items__title heading-tertiary'>{data.venue.name}</h2>
                  <p className='venue-items__category'><span>{data.venue.categories[0].name}</span></p>
                  <h3 className='venue-items__location'>{data.venue.location.address}</h3>
                  <button className='form__btn venue-items__btn' value={data.venue.id} onClick={(e) => handleClick(e)}>Check</button>
              </div>
            </div>
            <div>
            {modalState[data.venue.id] ? <div className={`modal-background modal-showing-true`} ><VenueListModal data={data}  toggleModalState={toggleModalState} /></div> : null }
            </div>
          </div>
        );
      })}
    </div>)
  )
}
