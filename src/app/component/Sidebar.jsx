const Sidebar = ({ setType }) => {
    const menuItems = [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'View Jobs', value: 'view-jobs' },
        { label: 'Create Job', value: 'create-job' },
        { label: 'View Applications', value: 'view-applications' },
        { label: 'Create Organization', value: 'create-org' },
    ];

    return (
        <div className="w-64 bg-gray-800 shadow-right shadow-md text-white fixed h-screen">
        <div className="p-5 text-xl text-white  font-bold">Admin Panel</div>
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
    );
};

export default Sidebar;