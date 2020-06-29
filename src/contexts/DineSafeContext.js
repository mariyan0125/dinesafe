import React, { createContext, useState, useEffect} from 'react';



export const DineSafeContext = createContext();


const DineSafeContextProvider = (props) => {

  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const [results, setResults] = useState(null);
  

  

  const getResult = (venue, address) => {
    if(data) {
      const term = data
      .filter(data => data.NAME[0].toLowerCase().includes(venue.toLowerCase()))
      .filter(data => data.ADDRESS[0].toLowerCase().includes(address.toLowerCase()));
      //console.log(term, 'TERM');
      return term.length ? (
      <div className="modal__pass-details">
        <div className="modal__pass-item"><span>Current status:</span><span> {term[0].STATUS ? term[0].STATUS : 'Not available'}</span></div>
        <div className="modal__pass-item"><span>Last inspected:</span><span>{term[0].INSPECTION ? term[0].INSPECTION[0].DATE : 'Not available'}</span></div>
        <div className="modal__pass-item"><span>Infractions:</span><span> {term[0].INSPECTION[0].INFRACTION ? term[0].INSPECTION[0].INFRACTION[0].SEVERITY : 'Not available'}</span></div>
      </div>
      ) : (<div>Not available</div>) ;
    }
  }

  

  useEffect(() => {
    let isCancelled = false;
    const getData = async () => {
      setIsLoading(true);
      setIsError(false);

      const parseString = require('xml2js').parseString;

      fetch(` https://secure.toronto.ca/opendata/ds/od_xml.xml?v=2.0&format=file`)
        .then(response => response.text())
        .then((response) => {
            parseString(response, function (err, result) {
                //console.log(result);
                if (!isCancelled) {
                setData(result.DINESAFE_DATA.ESTABLISHMENT);
                console.log(result.DINESAFE_DATA.ESTABLISHMENT[0]);
                console.log(err);
                setIsLoading(false);
                }
            });
        }).catch((err) => {
            console.log('fetch', err);
            if (!isCancelled) {
            setIsError(true);
            }
        });
      }
    getData();
    return () => {
      isCancelled = true;
    };
  }, []);

  

  console.log(data);
  //console.log(results, 'RESULTS');
 

  return (
    <DineSafeContext.Provider value={{ getResult, isError, isLoading }}>
      {props.children}
    </DineSafeContext.Provider>
  )
}
export default DineSafeContextProvider;