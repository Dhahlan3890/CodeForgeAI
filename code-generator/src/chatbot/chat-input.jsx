import { Textarea, IconButton, Spinner } from "@material-tailwind/react";
import React, { useState } from 'react';

export function ChatTextarea({ onSubmit }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const ModifyCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/modify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, result }),
      });

      const data = await response.json();
      if (response.ok) {
        onSubmit(data.result);
      } else {
        setError(data.msg || 'Error analyzing text');
      }
    } catch (err) {
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); ModifyCode(); }}>
      <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
        <Textarea
          value={text}
          onChange={handleTextChange}
          rows={1}
          resize={true}
          placeholder="Modify Design"
          className="min-h-full !border-0 focus:border-transparent"
          containerProps={{
            className: "grid h-full",
          }}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          disabled={loading}
        />
        <div>
          <IconButton variant="text" className="rounded-full" disabled={loading} type="submit">
            {loading ? <Spinner /> : 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            }
          </IconButton>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </form>
  );
}
