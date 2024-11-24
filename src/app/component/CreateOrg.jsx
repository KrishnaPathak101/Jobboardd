import React from 'react'

const CreateOrg = ({ type, orgData, setOrgData, handleOrgSubmit }) => {
  return (
    <div>
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
    </div>
  )
}

export default CreateOrg