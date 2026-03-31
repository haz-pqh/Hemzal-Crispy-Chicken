
import React from 'react';
import Hero from '../components/Hero';
import FeaturedBeverages from '../components/FeaturedBeverages';
import About from '../components/About';
import SpecialOfferBanner from '../components/SpecialOfferBanner';

interface HomeProps {
  setPage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <>
      <SpecialOfferBanner />
      <Hero setPage={setPage} />
      <FeaturedBeverages />
      <About setPage={setPage} />
    </>
  );
};

export default Home;
