import React, { useState } from 'react';
import { MdFileUpload } from 'react-icons/md'; // Import MdFileUpload icon

const DragNDrop = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {files.length === 0 && (
        <div className="flex flex-col items-center space-y-2">
          <MdFileUpload className="text-4xl text-gray-400" />
          <p className="text-gray-700 text-base">Drag & drop your files here</p>
          <p className="text-gray-500 text-sm">or</p>
          <button
            type="button"
            className="text-white py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse Files
          </button>
        </div>
      )}
      {files.length > 0 && (
        <ul className="list-disc space-y-2 pl-4">
          {files.map((file) => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ))}
        </ul>
      )}
      <input type="file" onChange={(e) => setFiles(e.target.files)} multiple hidden />
    </div>
  );
};

export default DragNDrop;
