import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const SendMail = (e) => {
    e.preventDefault();
    // You can integrate your backend service or email service here
    console.log("Form Submitted:", formData);
    emailjs.sendForm('service_vnbn1ae','template_9gx484v',e.target,'iiYITmOXLsHkUi_m6')
    alert("Mail sended bro successfully");
    setFormData({name: "", email: "", message: "" });
  };

  return (
    <section className="bg-[#121212] text-white py-10 px-5 flex h-full justify-center items-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Get in Touch</h2>
        <form
          onSubmit={SendMail}
          className="bg-[#340a32] p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:ring focus:ring-purple-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:ring focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:ring focus:ring-purple-500"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
