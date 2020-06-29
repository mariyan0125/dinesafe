import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FoursquareContext = createContext();


export const FoursquareContextProvider = (props) => {

  const [isError, setIsError] = useState(false);
  const [isLoading , setIsLoading] =useState(false);
  const [data, setData] = useState(null);
  const [category, setCategory] = useState('Food');
  const [location, setLocation] = useState('Toronto');
  const [details, setDetails] = useState(null);
  
  

  const getCategory = (category, location) => {
    setCategory(category);
    setLocation(location);
  }
  
  const generateImgUrl = (prefix, suffix) => { 
    return (prefix + '500x300' + suffix);
  }

  const getDate = () => {
    let today = new Date();
    const DD = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const MM =  (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : (today.getMonth() + 1);
    const YYYY = today.getFullYear();

    return today = `${YYYY}${MM}${DD}`;
  }

  useEffect(()=> {

    let isCancelled = false;
    const getData = async () => {
      setIsError(false);
      setIsLoading(true);
      // &section=food || &query=Sushi
      
      try {
        const result = await axios(`https://api.foursquare.com/v2/venues/explore?near=${location},ON&radius=5000&query=${category}&limit=12&sortByPopularity=1&client_id=${process.env.REACT_APP_ID}&client_secret=${process.env.REACT_APP_SECRET}&v=${getDate()}`);
        
        if (!isCancelled) {
        setData(result.data.response.groups);
        setIsLoading(false);
        }
  
      } catch(err) {
        if (!isCancelled) {
        setIsError(true);
        }
        console.log(err.message);
      }
    };
    getData();
    return () => {
      isCancelled = true;
    };
  }, [category]);

  

  const getDetails = async (venueId) => {
    setIsError(false);
    setIsLoading(true);
    
    try {
      const result = await axios(` https://api.foursquare.com/v2/venues/${venueId}?client_id=${process.env.REACT_APP_ID}&client_secret=${process.env.REACT_APP_SECRET}&v=${getDate()}`);
      
      setDetails(result.data.response);
      setIsLoading(false);

    } catch(err) {
      setIsError(true);
      console.log(err.message);
    }
    
  };
  
 
// console.log(data);
// console.log(details, 'DETAILS');

  return (
    <FoursquareContext.Provider value={{ data, isError, isLoading, getCategory, getDetails, details, generateImgUrl }}>
      {props.children}
    </FoursquareContext.Provider>
  )
}
