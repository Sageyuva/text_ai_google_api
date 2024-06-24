"use client"
import React, { useState } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleAIResult = async () => {
    try {
      if (prompt.length === 0) {
        alert("Input cannot be empty");
      } else {
        setLoading(true);
        const response = await axios.post('https://google-ai-api-backend.onrender.com/fetchdata', { prompt });
        console.log(response.data);
        setResult(response.data.replace(/\*/g, ''));
        setLoading(false);
      }
    } catch (error) {
      alert("Server failed. Try again later.");
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className='flex flex-col'>
        <div className='w-[100%] fixed bottom-3 h-[80px] px-4 py-2 flex items-center justify-center gap-3'>
          <input
            type="text"
            className='border-none outline-none w-[60%] px-4 font-semibold py-2 rounded-md'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Enter Message'
          />
          <button onClick={handleAIResult} className='bg-green-600 px-4 py-2 rounded-md text-white font-semibold'>
            Generate
          </button>
        </div>
        <div className='w-[100%] h-[100vh] px-4 py-2 font-semibold text-blue-600' style={{ whiteSpace: 'pre-line' }}>
          {result}
        </div>
      </div>
    </>
  );
}

export default App;