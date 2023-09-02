import React, { useState } from "react";
import Recording from "./Recording";


function HomePage() {
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {showConfirmation ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg font-medium mb-4">Are you sure you want to start recording?</p>
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirmDelete}
          >
            Yes
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancelDelete}
          >
            No
          </button>
        </div>
      ) : (
        <Recording />
      )}
    </div>
  );
}

export default HomePage;
