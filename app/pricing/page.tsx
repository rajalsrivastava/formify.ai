import React from "react";

const PricingPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <p className="mb-4">Choose a plan that fits your needs.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold">Free Plan</h2>
          <p className="text-sm">Basic AI forms, limited submissions.</p>
          <p className="text-lg font-bold mt-2">$0 / month</p>
        </div>

        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold">Pro Plan</h2>
          <p className="text-sm">
            Unlimited forms, analytics, and priority support.
          </p>
          <p className="text-lg font-bold mt-2">$10 / month</p>
        </div>

        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold">Enterprise</h2>
          <p className="text-sm">Custom integrations & dedicated support.</p>
          <p className="text-lg font-bold mt-2">Contact us</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
