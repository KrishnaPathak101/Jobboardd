'use client';
import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../context/stateContext.js';

const AdminPanel = () => {
    const { userId, userJobs, setUserJobs } = useContext(StateContext);
    const [type, setType] = useState('dashboard');
    const [orgData, setOrgData] = useState([]);
    const [applicationData, setApplicationData] = useState([]);
    const [jobData, setJobData] = useState({
        jobTitle: '',
        jobDescription: '',
        jobLocation: '',
        jobSalary: '',
        orgId: '',
    });

    // Fetch Organization Data
    useEffect(() => {
        if (type === 'create-job' && userId) {
            const fetchOrgData = async () => {
                try {
                    const response = await fetch('/api/organization', {
                        method: 'POST',
                        body: JSON.stringify({ userId }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const data = await response.json();
                    setOrgData(data);
                    console.log(orgData)
                } catch (error) {
                    console.error('Error fetching organizations:', error);
                }
            };
            fetchOrgData();
        }

        if(type === 'view-applications' && userId) {
            const fetchApplicationData = async () => {
                try {
                   
                    const response = await fetch('api/applications' , {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body:JSON.stringify({jobPoster: userId})
                    })
                    const data = await response.json();
                    console.log(data.applications);
                    setApplicationData(data.applications);
                    console.log(applicationData)
                } catch (error) {
                    console.error('Error fetching applications:', error);
                }
                

            }
            fetchApplicationData();
        }
    }, [type, userId]);

    // Fetch Job Data
    useEffect(() => {
        if (userId) {
            const fetchJobs = async () => {
                try {
                    const response = await fetch('/api/job', {
                        method: 'POST',
                        body: JSON.stringify({ userId }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const data = await response.json();
                    setUserJobs(data);
                } catch (error) {
                    console.error('Error fetching jobs:', error);
                }
            };
            fetchJobs();
        }
    }, [userId, setUserJobs]);

    // Handle Create Job
    const handleJobSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/job', {
                method: 'POST',
                body: JSON.stringify({ ...jobData, userId }),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            alert('Job created successfully!');
            setJobData({
                jobTitle: '',
                jobDescription: '',
                jobLocation: '',
                jobSalary: '',
                orgId: '',
            });
            setUserJobs((prevJobs) => [...prevJobs, result]);
            setType('');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    // handle org submit 
    const handleOrgSubmit = async (e) => {
        e.preventDefault();
        try {
          await fetch("/api/organization", {
            method: "POST",
            body: JSON.stringify({
              orgName: orgData.orgName,
              orgEmail: orgData.orgEmail,
              userId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              alert("Organization created successfully");
              window.location.reload("/");
            });
        } catch (error) {
          console.log(error);
        }
      };

    // Handle Delete Job
    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this job?');
            if (confirmDelete) {
                await fetch('/api/job', {
                    method: 'DELETE',
                    body: JSON.stringify({ id }),
                    headers: { 'Content-Type': 'application/json' },
                });
                setUserJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
                alert('Job deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white fixed h-screen">
                <div className="p-5 text-xl font-bold">Admin Panel</div>
                <ul className="mt-10">
                    <li
                        onClick={() => setType('dashboard')}
                        className="px-5 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                        Dashboard
                    </li>
                    <li
                        onClick={() => setType('view-jobs')}
                        className="px-5 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                        View Jobs
                    </li>
                    <li
                        onClick={() => setType('view-applications')}
                        className="px-5 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                        Applications
                    </li>
                    <li
                        onClick={() => setType('create-job')}
                        className="px-5 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                        Create Job
                    </li>
                    <li
                        onClick={() => setType('create-org')}
                        className="px-5 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                        Create Organization
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 overflow-y-auto p-6">
                {type === 'view-jobs' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Job Posts</h2>
                        {userJobs.length > 0 ? (
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {userJobs.map((job) => (
                                    <div
                                        key={job._id}
                                        className="bg-white border-l-4 border-blue-500 rounded-lg shadow-md p-6 hover:shadow-lg"
                                    >
                                        <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                            {job.title}
                                        </h3>
                                        <p className="text-gray-700">{job.description}</p>
                                        <p className="text-gray-700">{job.location}</p>
                                        <p className="text-gray-700">Salary: {job.salary}</p>
                                        <button
                                            onClick={() => handleDelete(job._id)}
                                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No jobs available</p>
                        )}
                    </div>
                )}

                {type === 'create-job' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Create a Job Post</h2>
                        <form onSubmit={handleJobSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={jobData.jobTitle}
                                    onChange={(e) =>
                                        setJobData({ ...jobData, jobTitle: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Job Description
                                </label>
                                <textarea
                                    value={jobData.jobDescription}
                                    onChange={(e) =>
                                        setJobData({
                                            ...jobData,
                                            jobDescription: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={jobData.jobLocation}
                                    onChange={(e) =>
                                        setJobData({ ...jobData, jobLocation: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Salary
                                </label>
                                <input
                                    type="text"
                                    value={jobData.jobSalary}
                                    onChange={(e) =>
                                        setJobData({ ...jobData, jobSalary: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Select Organization
                                </label>
                                {orgData?.map((org) => (
                                    <div key={org._id} className="flex items-center gap-2 mt-2">
                                        <input
                                            type="radio"
                                            id={org._id}
                                            name="org"
                                            value={org._id}
                                            onChange={(e) =>
                                                setJobData({ ...jobData, orgId: e.target.value })
                                            }
                                            className="focus:ring-blue-500"
                                        />
                                        <label htmlFor={org._id} className="text-gray-700">
                                            {org.name}
                                        </label>
                                        
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}

                {type === 'dashboard' && <div>Welcome to the Admin Dashboard</div>}
                {type === 'create-org'  && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Organization</h1>
          <form onSubmit={handleOrgSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Organization Name</label>
              <input
                onChange={(e) => setOrgData({ ...orgData, orgName: e.target.value })}
                value={orgData.orgName}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                onChange={(e) => setOrgData({ ...orgData, orgEmail: e.target.value })}
                value={orgData.orgEmail}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                onChange={(e) => setOrgData({ ...orgData, orgPassword: e.target.value })}
                value={orgData.orgPassword}
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 shadow-md transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}
       {type === "view-applications" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Applications</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Applicant Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Job Title</th>
                  <th className="px-4 py-2 border">Application Date</th>
                  <th className="px-4 py-2 border">Cover Letter</th>
                </tr>
              </thead>
              <tbody>
                {applicationData?.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{application.fullName}</td>
                    <td className="px-4 py-2 border">{application.email}</td>
                    <td className="px-4 py-2 border">{application?.jobId?.title}</td>
                    <td className="px-4 py-2 border">
                      {new Date(application.createdAt).toLocaleDateString()}{" "}
                      {new Date(application.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2 border">{application.coverLetter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
            </div>
        </div>
    );
};

export default AdminPanel;
