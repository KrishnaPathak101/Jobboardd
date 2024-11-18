'use client';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { StateContext } from '../context/stateContext';

const Header = () => {
  const { userId, setUserId } = useContext(StateContext);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return; // Ensure the user exists before proceeding

    const getUserData = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.fullName,
            email: user.emailAddresses[0]?.emailAddress, // Access the first email safely
          }),
        });

        const data = await response.json();
       
          setUserId(data?._id); // Update context with user ID
        console.log(userId);
        console.log('User data:', data?._id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-2 shadow-md flex justify-between items-center bg-white max-w-7xl">
      <Link href={'/'} className="text-lg font-bold text-blue-600">Job Board</Link>
      <div className="flex gap-4 items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link
          href="/jobpost"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post Job
        </Link>
      </div>
    </div>
  );
};

export default Header;
