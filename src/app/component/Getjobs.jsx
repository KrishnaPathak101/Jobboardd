'use client'
import React, { useState, useContext } from 'react';
import { StateContext } from '../context/stateContext';

const Getjobs = ({ className }) => {
  const { jobs } = useContext(StateContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const { userId } = useContext(StateContext);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedJob(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          coverLetter,
          jobId: selectedJob._id,
          userId, // Replace this with the actual userId
        }),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setShowForm(false);
        setFullName('');
        setEmail('');
        setCoverLetter('');
      } else {
        const { message } = await response.json();
        alert(`Failed to submit application: ${message}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting your application.');
    }
  };

  if (!jobs || jobs.length === 0) {
    return <div className="text-center text-gray-500">No jobs available</div>;
  }

  return (
    <div className={` ${className} flex flex-col gap-6 p-4 m-1 bg-gray-200 border-t rounded-lg max-w-5xl mx-auto`}>
      <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">Available Jobs</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex justify-between bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Company:</span> {job.company || 'Unknown'}
              </p>
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
            <div>
              <button
                onClick={() => handleApplyClick(job)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="cover-letter">
                  Cover Letter
                </label>
                <textarea
                  id="cover-letter"
                  rows="4"
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleFormClose}
                  className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Getjobs;
