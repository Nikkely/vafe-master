import React, { useState, useEffect } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';

// function initTrans() {}

function trans(msg: string) {
  const apiKey = process.env.GEMINI_API_KEY ?? '';
  if (!apiKey) return;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async function run() {
    const prompt = `あなたは喫茶店のマスターです。次の文章をSNSに投稿するために編集し、出力してください。「${msg}」`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  run();
  return undefined;
}

export function Translater() {
  const [msg, setMsg] = useState('');

  // initialize
  useEffect(() => {
    // initTrans();
    console.log('Hello world!');
  }, []);

  return (
    <div className="p-2">
      <div className="flex items-center justify-center mb-4">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        ></textarea>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => trans(msg)}
        >
          trans
        </button>
      </div>
    </div>
  );
}
