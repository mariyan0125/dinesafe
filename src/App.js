import React from 'react';
import { FoursquareContextProvider } from './contexts/FoursquareContext';
import { AddCategory } from './components/AddCategory';
import { Header } from './components/Header';
import { VenueList } from './components/VenueList';
import DineSafeContextProvider from './contexts/DineSafeContext';
import { Footer } from './components/Footer';

function App() {
  return (
    <FoursquareContextProvider>
      <DineSafeContextProvider>
      <div className="App">
        <Header />
        <AddCategory />
        <VenueList />
        <Footer />
      </div>
      </DineSafeContextProvider>
    </FoursquareContextProvider>
  );
}

export default App;
