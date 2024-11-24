import React from 'react'

const CreateJob = ( {type , jobData, setJobData, handleJobSubmit, orgData}) => {
  return (
    <div>
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
    </div>
  )
}

export default CreateJob