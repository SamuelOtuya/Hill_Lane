import ContactForm from "../components/contactform";
import Map from "../components/Map";

const ContactInfo = () => {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Location */}
          <div>
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.134 2 5 5.134 5 9c0 3.866 7 13 7 13s7-9.134 7-13c0-3.866-3.134-7-7-7z"></path>
                <circle cx="12" cy="9" r="2.5"></circle>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Location</h3>
            <p className="text-gray-500">Opposite Flamingo Towers, Upperhill, Nairobi, Kenya</p>
          </div>
  
          {/* Contact Number */}
          <div>
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l1 2m2 2l1 2m1 2h6m1-2l1-2m2-2l1-2m-9-6a9 9 0 110 18 9 9 0 010-18z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Contact Number</h3>
            <p className="text-gray-500">+254792254254 (Landline)</p>
            <p className="text-gray-500">+254792254254 (Phone Number)</p>
            <p className="text-gray-500">+254754877376 (WhatsApp)</p>
          </div>
  
          {/* Mail Address */}
          <div>
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0H8m4-8h4m0 0h4m-4 0V4m0 4V4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Mail Address</h3>
            <p className="text-gray-500">info@hilllaneautoshop.co.ke</p>
            <p className="text-gray-500">hilllaneautoshop@gmail.com</p>
          </div>
        </div>

     <div className="pt-10"><Map/></div>   


        <ContactForm/>
        
      </div>
      
    );
  };
  
  export default ContactInfo;
  