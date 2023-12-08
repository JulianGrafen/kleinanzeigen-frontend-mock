"use client";

// Import necessary modules and styles
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles

// Interface definition
interface Listing {
  title: string;
  description?: string;
  price?: string; // Add the price property if it exists in your data structure
}

const Home = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/getlistings');
        const data = await response.json();
        setListings(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Mockanzeigen</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.length === 0 ? (
          <p className="text-center text-gray-500">No listings available.</p>
        ) : (
          listings.map((listing, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">{listing.title}</h2>
              {listing.description && (
                <p className="text-gray-600 mb-2">{listing.description}</p>
              )}
              {listing.price && (
                <p className="text-green-500 font-semibold">{listing.price}</p>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
