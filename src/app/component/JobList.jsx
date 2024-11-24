const JobList = ({ type, userJobs, handleDelete  }) => {
    return (
        <div>
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
        </div>
    );
};

export default JobList;