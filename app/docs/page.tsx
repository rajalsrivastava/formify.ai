import React from "react";

const DocsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Documentation</h1>
      <p className="mb-4">
        Welcome to the documentation for AI Form Generator.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Getting Started</h2>
      <p className="mb-2">
        1. Install dependencies: <code>npm install</code>
      </p>
      <p className="mb-2">
        2. Run the development server: <code>npm run dev</code>
      </p>

      <h2 className="text-2xl font-semibold mt-6">Features</h2>
      <ul className="list-disc pl-5">
        <li>AI-powered form generation</li>
        <li>Customizable form fields</li>
        <li>Real-time data validation</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">FAQs</h2>
      <p className="mb-2">
        <strong>Q: How do I deploy this?</strong>
      </p>
      <p className="mb-4">A: Use Vercel, Netlify, or a custom server.</p>
    </div>
  );
};

export default DocsPage;
