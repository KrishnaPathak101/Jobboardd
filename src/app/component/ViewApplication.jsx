import React from 'react'

const ViewApplication = ( { type, applicationData }) => {
  return (
    <div>
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
  )
}

export default ViewApplication