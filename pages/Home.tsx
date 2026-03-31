
import React from 'react';
import Hero from '../components/Hero';
import FeaturedChickens from '../components/FeaturedChickens';
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
      <FeaturedChickens />
      <About setPage={setPage} />
    </>
  );
};

export default Home;
