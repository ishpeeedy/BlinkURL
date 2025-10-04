import React from 'react';
import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className ="p-8 rounded-lg w-full max-w-md">
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
