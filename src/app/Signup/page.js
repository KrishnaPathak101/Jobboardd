'use client'
import { useSignUp } from '@clerk/nextjs';
import React from 'react'

const page = () => {
  const { signUp } = useSignUp();
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    const role = event.target.role.value;

    await signUp.update({
      publicMetadata: { role },
    });

    await signUp.create({
      emailAddress: event.target.email.value,
      password: event.target.password.value,
    });
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <select name="role" required>
        <option value="poster">Job Poster</option>
        <option value="applicant">Job Applicant</option>
        <option value="both">Both</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default page