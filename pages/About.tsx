
import React from 'react';
import AboutComponent from '../components/About';

interface AboutPageProps {
  setPage: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setPage }) => {
  return (
    <div className="pt-24 min-h-screen flex items-center">
      <AboutComponent setPage={setPage} />
    </div>
  );
};

export default AboutPage;
