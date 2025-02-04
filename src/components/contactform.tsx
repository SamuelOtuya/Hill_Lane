import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here, you can send the data to an API
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Contact us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name, Phone, Email Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Message Field */}
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none h-32"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition"
        >
          SEND NOW
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
