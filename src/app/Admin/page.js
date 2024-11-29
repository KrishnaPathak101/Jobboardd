'use client';
import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../context/stateContext.js';
import Sidebar from '../component/Sidebar';
import JobList from '../component/JobList';
import CreateJob from '../component/CreateJob.jsx';
import Dashboard from '../component/Dashboard.jsx';
import CreateOrg from '../component/CreateOrg.jsx';
import ViewApplication from '../component/ViewApplication.jsx';
import { Protect } from '@clerk/nextjs';

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

        if (type === 'view-applications' && userId) {
            const fetchApplicationData = async () => {
                try {

                    const response = await fetch('api/applications', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ jobPoster: userId })
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
        <Protect>
        <div className="flex h-screen ">
            {/* Sidebar */}
            <Sidebar setType={setType} />

            {/* Main Content */}
            <div className="flex-1 ml-64 overflow-y-auto p-6">
                <JobList type={type} userJobs={userJobs} handleDelete={handleDelete} />

                <CreateJob type={type} jobData={jobData} setJobData={setJobData} handleJobSubmit={handleJobSubmit} orgData={orgData} />

                <Dashboard type={type} userJobs={userJobs} orgData={orgData} applicationData={applicationData} />
                <CreateOrg type={type} orgData={orgData} setOrgData={setOrgData} handleOrgSubmit={handleOrgSubmit} />
                <ViewApplication type={type} applicationData={applicationData} />
            </div>
        </div>
        </Protect>
    );
};

export default AdminPanel;
