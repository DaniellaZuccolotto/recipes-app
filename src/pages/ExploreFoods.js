import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <div>
      <Header pageName="Explore Foods" searchEnabled={ false } />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
