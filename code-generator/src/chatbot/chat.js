import React, { useEffect, useState } from 'react';
import { Button, Spinner } from "@material-tailwind/react";

function Chat({ onSubmit, onHistory, darkMode, advancedMode, historyImagePreview }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      displayImage(selectedFile);
    }
  };

  useEffect(() => {
    if (historyImagePreview) {
      setImagePreview(historyImagePreview);
    }
  }, [historyImagePreview]);

  const displayImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFile(null);
    setImagePreview(null);
  };

  const advancedanalyzeCode = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/advancedanalyze/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        onSubmit(data.result);
        onHistory({ image: imagePreview, result: data.result });
      } else {
        setError(data.msg || 'Error analyzing code');
      }
    } catch (err) {
      setError('Something went wrong!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCode = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/analyze/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        onSubmit(data.result);
        onHistory({ image: imagePreview, result: data.result });
      } else {
        setError(data.msg || 'Error analyzing code');
      }
    } catch (err) {
      setError('Something went wrong!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`code-input`} onSubmit={(e) => { e.preventDefault(); advancedMode ? advancedanalyzeCode() : analyzeCode(); }}>
      <div className="max-w-3xl" id="file-input">
        {!imagePreview && (
          <label className="flex justify-center w-full h-16 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline">browse</span>
              </span>
            </span>
            <input 
              type="file" 
              name="file_upload" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
              required 
            />
          </label>
        )}
        {imagePreview && (
          <div className="mt-4" id="image-preview">
            <img src={imagePreview} alt="Uploaded" className="w-auto h-12 object-cover mt-4 rounded-md" />

            <button 
              type="button" 
              className="mt-2 underline" 
              onClick={removeFile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
            {error && <p className="error" style={{marginLeft:"20px"}}>{error}</p>}
          </div>
        )}
      </div>
      
      <Button type="submit" variant="gradient" disabled={loading} className='submit-button'>
        {loading ? <Spinner /> : 'Submit'}
      </Button>
    </form>
  );
}

export default Chat;
