'use client';
import React, { useContext } from 'react';
import { StateContext } from '../context/stateContext';

const Getjobs = () => {
  const { jobs } = useContext(StateContext);

  if (!jobs || jobs.length === 0) {
    return <div className="text-center text-gray-500">No jobs available</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4 m-1 bg-gray-200 border-t rounded-lg  max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">
        Available Jobs
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Description:</span> {job.description}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Location:</span> {job.location}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Salary:</span> ₹{job.salary.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Posted on: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getjobs;
