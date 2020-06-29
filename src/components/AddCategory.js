import React, { useState, useContext } from 'react';
import { FoursquareContext } from '../contexts/FoursquareContext';

export const AddCategory = () => {
  const { getCategory } = useContext(FoursquareContext);
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getCategory(text, location);
    setText('');
    setLocation('');
  }
//console.log(text)
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input className="form__input" type="text" required placeholder='enter the category, e.g. italian restaurant...' value={text} onChange={(e) => setText(e.target.value)} />
      <input className="form__input" type="text"  placeholder='enter the location, e.g. Toronto...' value={location} onChange={(e) => setLocation(e.target.value)} />
      <input className='form__btn btn' type="submit" value='add'/>
    </form>
  )
}
