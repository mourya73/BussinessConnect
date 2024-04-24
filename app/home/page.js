"use client"

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const businessesCol = collection(db, 'businesses');
        const businessSnapshot = await getDocs(businessesCol);
        const businessList = businessSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBusinesses(businessList);
      } catch (error) {
        console.error("Error fetching businesses: ", error);
      }
      setLoading(false);
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Local Businesses</h1>
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
}
