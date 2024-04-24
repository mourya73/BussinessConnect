import React, { useState, useEffect } from 'react';

const Businesses = ({ initialBusinesses }) => {
  const [businesses, setBusinesses] = useState(initialBusinesses);

  // If you need to fetch businesses again on the client side or subscribe to updates,
  // you can do so in this useEffect hook.
  // useEffect(() => {
  //   // Client-side fetch or subscription logic
  // }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-4">Local Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map((business) => (
          <div key={business.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-800">{business.businessName}</h2>
            <p className="text-gray-600">{business.description}</p>
            <address className="not-italic">{business.address}</address>
            <p className="text-gray-600">{business.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Businesses;
