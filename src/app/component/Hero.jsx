import React from 'react';

const Hero = () => {
  return (
    <section className="flex mt-10 flex-col sm:flex-row items-center justify-center p-4 my-4 mx-1 rounded-md backdrop-blur-md bg-gray-150">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-6xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
          Find Your Dream Job
        </h1>
        <form className="mt-4 flex justify-center text-center mx-auto max-w-8xl flex-col sm:flex-row items-center">
          <input
            type="text"
            placeholder="Search for jobs"
            className="bg-gray-100  rounded-l sm:rounded-l px-4 py-2 w-full sm:w-3/4"
          />
          <button
            type="submit"
            className="mt-2 sm:mt-0 sm:ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded sm:rounded-r"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
