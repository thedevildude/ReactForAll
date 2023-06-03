import React from "react";

const LazyLoading = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
      </div>
    </div>
  );
};

export default LazyLoading;
