"use client";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/stateContext";

const Page = () => {
  const [type, setType] = useState("");
  const [orgData, setOrgData] = useState({
    orgName: "",
    orgEmail: "",
    orgPassword: "",
  });
  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    jobSalary: "",
  });
  const [job, setJob] = useState([]);
  const { userId , userJobs, setUserJobs } = useContext(StateContext);

  useEffect(() => {
   

    if (type === "job") {
      const getOrgData = async () => {
        try {
          const response = await fetch("/api/organization", {
            method: "POST",
            body: JSON.stringify({
              userId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setOrgData(data);
          console.log(data.existingOrg);
        } catch (error) {
          console.error(error);
        }
      };
      getOrgData();
    }
    if(userId) {
      const getJobData = async () => {
        const response = await fetch('/api/job', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId}),
        })
        const data = await response.json();
        setJob(data);
        setUserJobs(data);
        console.log(data);
      }
      getJobData();
    }
    
  }, [type, userId]);

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

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify({
          ...jobData,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
        .then((data) => {
          console.log( "Job created successfully",data);
          alert("Job created successfully");
          window.location.reload("/jobpost");
          setType("");
        });
        
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      fetch('/api/job', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})

  }).then((res) => res.json())
  .then((data) => {
    console.log(data);
    alert("Job deleted successfully");
    window.location.reload("/jobpost");
  });
    }
    } catch (error) {
      console.log(error);

    }
}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="flex justify-center items-center gap-5 mb-10">
        <button
          onClick={() => setType("job")}
          className="text-white px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 shadow-md transition duration-300"
        >
          Job Post
        </button>
        <button
          onClick={() => setType("org")}
          className="text-white px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 shadow-md transition duration-300"
        >
          Create Organization
        </button>
      </div>

      {type === "job" && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Job Post</h1>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Job Title</label>
              <input
                onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })}
                value={jobData.jobTitle}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Select Organization</label>
              {orgData?.existingOrg &&
                orgData.existingOrg.map((org) => (
                  <div key={org._id} className="flex items-center gap-2 mt-2">
                    <input
                      type="radio"
                      id={org._id}
                      name="org"
                      value={org._id}
                      onChange={(e) => setJobData({ ...jobData, orgId: e.target.value })}
                      className="focus:ring-blue-500"
                    />
                    <label htmlFor={org._id} className="text-gray-700">
                      {org.name}
                    </label>
                  </div>
                ))}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Job Description</label>
              <input
                onChange={(e) =>
                  setJobData({ ...jobData, jobDescription: e.target.value })
                }
                value={jobData.jobDescription}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                onChange={(e) =>
                  setJobData({ ...jobData, jobLocation: e.target.value })
                }
                value={jobData.jobLocation}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Salary</label>
              <input
                onChange={(e) =>
                  setJobData({ ...jobData, jobSalary: e.target.value })
                }
                value={jobData.jobSalary}
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 shadow-md transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {type === "org" && (
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

      {type === '' && (
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">Jobs Posted By You</h1>
          {job?.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-medium">{job.title}</h2>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-gray-700">{job.location}</p>
              <p className="text-gray-700">{job.salary}</p>
              <button onClick={() => handleDelete(job._id)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Page;
