
import React from 'react';
import Hero from '../components/Hero';
import FeaturedBeverages from '../components/FeaturedBeverages';
import About from '../components/About';

interface HomeProps {
  setPage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <>
      <Hero setPage={setPage} />
      <FeaturedBeverages />
      <About setPage={setPage} />
    </>
  );
};

export default Home;
