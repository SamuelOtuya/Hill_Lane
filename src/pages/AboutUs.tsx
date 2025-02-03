import aboutHL from "../assets/aboutHL.jpg"
import whatsapp from "../assets/whatsapp.png"

const about = () => {
  return (
    <div className="container mx-auto px-4 lg:px-20 py-10">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        N.o 1 <span className="text-red-500">car</span> marketplace.
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Left Section */}
        <div className="space-y-6">
          {/* About Us */}
          <div>
            <h2 className="text-lg font-bold uppercase">About Us</h2>
            <div className="w-16 h-1 bg-red-500 my-2"></div>
            <p className="text-gray-600">
              Dealers in new and used cars in Kenya. <span className="italic">test</span>
            </p>
          </div>

          {/* Our Mission */}
          <div>
            <h2 className="text-lg font-bold uppercase">Our Mission</h2>
            <div className="w-16 h-1 bg-red-500 my-2"></div>
            <p className="text-gray-600">Test</p>
          </div>

          {/* Our Vision */}
          <div>
            <h2 className="text-lg font-bold uppercase ">Our Vision</h2>
            <div className="w-16 h-1 bg-red-500 my-2"></div>
            <p className="text-gray-600">Test</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16 text-center pt-20">
        <div>
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            <span>🚗</span> Best Collection
          </h3>
          <p className="text-gray-600">We have the best collection of cars to select from.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            <span>💰</span> Best Pricing
          </h3>
          <p className="text-gray-600">We offer the best price in town.</p>
        </div>
      </div>

        </div>

        {/* Right Section - Image */}
        <div>
          <img
            src={aboutHL}
            alt="Car marketplace"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
      </div>

      {/* Features Section */}
   

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4">
        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          className=" text-white p-3 rounded-full shadow-lg"
        >
          <img
            src={whatsapp}
            alt="Car marketplace"
            className="w-15 h-12 rounded-lg shadow-lg"
          />
        </a>
      </div>
    </div>
  );
};

export default about;
