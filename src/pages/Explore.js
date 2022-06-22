import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header pageName="Explore" searchEnabled={ false } />
      <Footer />
    </div>
  );
}

export default Explore;
