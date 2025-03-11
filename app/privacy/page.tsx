import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This policy explains how we collect,
        use, and protect your data.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Data Collection</h2>
      <p>We collect user input data for form generation purposes only.</p>

      <h2 className="text-2xl font-semibold mt-6">2. Security</h2>
      <p>Your data is securely stored and never shared with third parties.</p>

      <h2 className="text-2xl font-semibold mt-6">3. Contact</h2>
      <p>
        If you have any questions, reach out at{" "}
        <strong>support@formify.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
