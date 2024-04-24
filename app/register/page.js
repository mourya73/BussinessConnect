"use client"

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; // Ensure these are correctly exported from your firebase config

export default function Register() {
  // State for business data and image file
  const [businessData, setBusinessData] = useState({
    businessName: '',
    description: '',
    address: '',
    phone: '',
  });
  const [file, setFile] = useState(null); // State for storing the file
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update state on input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update state on file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    let imageURL = '';

    // First, upload the image if a file has been selected
    if (file) {
      const fileRef = ref(storage, `businesses/${file.name}`);
      try {
        const fileSnapshot = await uploadBytes(fileRef, file);
        imageURL = await getDownloadURL(fileSnapshot.ref);
      } catch (uploadError) {
        setError('Failed to upload image. Please try again.');
        setLoading(false);
        return;
      }
    }

    // Then, create the business record with the image URL
    try {
      const docRef = await addDoc(collection(db, 'businesses'), {
        ...businessData,
        imageURL, // Include the image URL in the document
      });
      setSuccess(`Business registered with ID: ${docRef.id}`);
      // Reset form and file input
      setBusinessData({
        businessName: '',
        description: '',
        address: '',
        phone: '',
      });
      setFile(null);
    } catch (err) {
      setError('Error registering business. Please try again.');
      console.error('Error adding document: ', err);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-4">Register Your Business</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            id="businessName"
            required
            value={businessData.businessName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter business name"
          />
          
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            required
            value={businessData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Describe your business"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            required
            value={businessData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Business address"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            value={businessData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Business phone number"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Business Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Registering...' : 'Register Business'}
        </button>
      </form>
    </div>
  );
}
