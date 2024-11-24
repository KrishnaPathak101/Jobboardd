import React from 'react'

const Dashboard = ({ type, userJobs, orgData, applicationData }) => {
  return (
    <div>
        {type === 'dashboard' && (
                    <div className=' mt-10'>
                        <h2 className="text-3xl bg-slate-400 px-4 py-2 shadow-md text-white rounded-md font-bold mb-6">Dashboard</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">Total Jobs</h3>
                                <p className="text-3xl font-bold">
                                    {userJobs?.length}
                                </p>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">Total Organizations</h3>
                                <p className="text-3xl font-bold">{orgData?.length}</p>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">Total Applicants</h3>
                                <p className="text-3xl font-bold">{applicationData?.length}</p>
                            </div>
                        </div>
                         {/* recent applicant's list */}
                         <div className="mt-10 rounded-md shadow-md bg-slate-400 p-6">
                            <h1 className="text-2xl font-bold mb-4">Recent Applicants</h1>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 border">Applicant Name</th>
                                            <th className="px-4 py-2 border">Email</th>
                                            <th className="px-4 py-2 border">Cover Letter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicationData?.map((application) => (
                                            <tr key={application._id}>
                                                <td className="px-4 py-2 border">{application.fullName}</td>
                                                <td className="px-4 py-2 border">{application.email}</td>
                                                <td className="px-4 py-2 border">{application.coverLetter}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                         </div>
                    </div>
                )}
    </div>
  )
}

export default Dashboard