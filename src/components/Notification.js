import React from 'react';

const Notification = ({ text }) => {
  return (
    <div role="region" lang="en" className="notification">
      <p aria-live="assertive" aria-atomic="true">{ text }</p>
    </div>
  );  
}

export default Notification;
