import React from "react";

const ContactPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Have a question? Reach out to us!</p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="border p-2 rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
