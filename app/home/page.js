"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported correctly

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold my-6 text-gray-800 text-center">Local Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div key={business.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition duration-300">
            <div className="relative overflow-hidden">
              <img
                src={business.imageURL}
                alt={`Image of ${business.businessName}`}
                className="w-full h-40 object-cover transition duration-300 transform hover:scale-105 rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 px-4 py-2 text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-bold mb-1">{business.businessName}</h2>
                <p className="text-gray-100 mb-2">{business.description}</p>
                <address className="not-italic text-gray-100 mb-1">{business.address}</address>
                <p className="text-gray-100">{business.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
