import React from 'react';
import './HomePageHeader.css'; // Import a CSS file for additional styles

const HomePageHeader = ({name}) => {
  return (
    <div className="container mt-4 bg-light p-3">
      {/* Welcome Message */}
      <div className="text-center">
        <h2 className="welcome-title">Welcome, {name}</h2>
        <p className="welcome-description">
          Here's a quick overview of your workspace. Stay organized and manage tasks efficiently!
        </p>
      </div>
    </div>
  );
};

export default HomePageHeader;