import { Button} from 'flowbite-react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaWhatsapp, FaCheck, FaUser } from 'react-icons/fa';
import { MdDriveEta, MdLocalOffer } from 'react-icons/md';
import { BsTelephoneForward } from 'react-icons/bs';
import Map from '../components/Map';
import { VehicleCard } from '../components/VehicleCard';
import { useParams } from 'react-router-dom';
import API from '../api/API';
import { useEffect, useState } from 'react';
import { VehicleType } from '../types/types';
import { Slider } from '../components/About/slider';
import ContactModal from '../components/ContactModal';

export default function CarDetails() {
  const [activeTab, setActiveTab] = useState('specifications');
  const {id} = useParams();
  const [v_id, make, model] = id?.split("-") || "";
  
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [singleVehicleImages, setSingleVehicleImages] = useState<string[]>([]);
  const [vehicleFeatures, setVehicleFeatures] = useState<string[]>([]);
  const [relatedVehicles, setRelatedVehicles] = useState<VehicleType[]>([]);
  const [allVehicles, setAllVehicles] = useState<VehicleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState<'test-drive' | 'make-offer' | 'call-back'>('test-drive');

  const [contacts, setContacts] = useState<{
    email: any;
    phone_number: string; name: string; phone: string 
}[]>([]);
  
  // Function to open modal with specific action type
  const openModal = (actionType: 'test-drive' | 'make-offer' | 'call-back') => {
    setModalActionType(actionType);
    setIsModalOpen(true);
  };
  
  // Function to get all vehicles from home listing API
  const getAllVehicles = async () => {
    try {
      const res = await API.get("client/home-listing", {
        params: {
          limit: 300
        }
      });
      
      console.log("getAllVehicles response:", res.data);
      
      if (res.data && Array.isArray(res.data.cars) && res.data.cars.length > 0) {
        setAllVehicles(res.data.cars);
        return res.data.cars; // Return the vehicles for immediate use
      }
      
      else {
        console.error("Unexpected API response format for home-listing:", res.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching all vehicles:", error);
      return [];
    }
  };
  
  const getSingleVehicle = async () => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    try {
      const res = await API.get("client/vehicle-single", {
        params: {
          vehicle_id: v_id,
          make: make,
          model: model
        }
      });
      
      console.log("getSingleVehicle response:", res.data);
      
      if (res.data && res.data.vehicle) {
        setVehicle(res.data.vehicle);
        setSingleVehicleImages(res.data.vehicle.images || []);
        setVehicleFeatures(res.data.vehicle.features || []);

        if (res.data.vehicle.staff) {
          setContacts(res.data.vehicle.staff);
        }
        
        return res.data.vehicle;
      } else {
        console.error("Unexpected API response format for vehicle-single:", res.data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching single vehicle:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // This function ensures we always have related vehicles, even if our algorithm can't find matches
  const getRelatedVehicles = async () => {
    try {
      // Get the current vehicle
      const currentVehicle = await getSingleVehicle();
      if (!currentVehicle) return;
      
      // Get all vehicles if we don't have them yet
      let vehicles = allVehicles;
      if (vehicles.length === 0) {
        vehicles = await getAllVehicles();
      }
      
      if (vehicles.length === 0) {
        console.error("No vehicles available to filter from");
        setRelatedVehicles([]);
        return;
      }
      
      console.log("Current vehicle for comparison:", currentVehicle);
      console.log("All vehicles count:", vehicles.length);
      
      // Filter out the current vehicle
      const otherVehicles = vehicles.filter(v => v.id !== currentVehicle.id);
      
      // If we don't have at least 4 other vehicles, use whatever we have
      if (otherVehicles.length <= 4) {
        console.log("Not enough other vehicles, showing all available:", otherVehicles.length);
        setRelatedVehicles(otherVehicles);
        return;
      }
      
      // Try to filter by same make first
      let sameManufacturer = otherVehicles.filter(v => 
        v.make && currentVehicle.make && 
        v.make.toLowerCase() === currentVehicle.make.toLowerCase()
      );
      
      // If we have enough from the same manufacturer, use those
      if (sameManufacturer.length >= 4) {
        console.log("Found enough vehicles from same manufacturer:", sameManufacturer.length);
        setRelatedVehicles(sameManufacturer.slice(0, 4));
        return;
      }
      
      // If we don't have enough from same manufacturer, add vehicles with similar price range
      if (sameManufacturer.length > 0 && sameManufacturer.length < 4) {
        console.log("Found some vehicles from same manufacturer, but need more:", sameManufacturer.length);
        
        // Get IDs of vehicles we already selected
        const selectedIds = new Set(sameManufacturer.map(v => v.id));
        
        // Try to calculate current vehicle price
        let currentPrice = 0;
        try {
          currentPrice = parseFloat(String(currentVehicle.price).replace(/[^0-9.]/g, ''));
        } catch (e) {
          console.error("Error parsing current vehicle price:", e);
        }
        
        // If we have a valid price, filter by similar price
        if (currentPrice > 0) {
          const similarPriceVehicles = otherVehicles
            .filter(v => {
              // Skip vehicles we already selected
              if (selectedIds.has(v.id)) return false;
              
              // Try to calculate vehicle price
              let vehiclePrice = 0;
              try {
                vehiclePrice = parseFloat(String(v.price).replace(/[^0-9.]/g, ''));
              } catch (e) {
                return false;
              }
              
              // Include vehicles with price within ±50% of current vehicle
              return vehiclePrice >= currentPrice * 0.5 && vehiclePrice <= currentPrice * 1.5;
            })
            .slice(0, 4 - sameManufacturer.length);
          
          console.log("Found additional similar price vehicles:", similarPriceVehicles.length);
          
          // Combine manufacturers and similar price vehicles
          setRelatedVehicles([...sameManufacturer, ...similarPriceVehicles]);
          return;
        }
      }
      
      // If all else fails, just pick 4 random vehicles
      console.log("Using random vehicles as fallback");
      const randomVehicles = [...otherVehicles]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      
      setRelatedVehicles(randomVehicles);
      
    } catch (error) {
      console.error("Error in getRelatedVehicles:", error);
      
      // Ultimate fallback: show any 4 vehicles that aren't the current one
      if (allVehicles.length > 0 && vehicle) {
        const fallbackVehicles = allVehicles
          .filter(v => v.id !== vehicle.id)
          .slice(0, 4);
          
        console.log("Using ultimate fallback vehicles:", fallbackVehicles.length);
        setRelatedVehicles(fallbackVehicles);
      }
    }
  };

  useEffect(() => {
    // Load all vehicles when component mounts
    getAllVehicles();
  }, []);
  
  useEffect(() => {
    // When ID changes, get the related vehicles
    if (id) {
      getRelatedVehicles();
    }
  }, [id]);

  const specifications = {
    "Fuel Type": vehicle?.fuel_type || "Not specified",
    "Transmission Type": vehicle?.transmission || "Not specified",
    "Seating": vehicle?.doors || "Not specified",
    "Drive Type": vehicle?.drive_type || "Not specified",
    "Exterior Colors": vehicle?.color || "Not specified",
    "Engine": vehicle?.engine_size|| "Not specified",
    "Mileage": vehicle?.mileage|| "Not specified"
  };

  return (
    <div className="max-w-[100vw] sm:px-20">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Car Images and Details */}
        <div className="md:col-span-2">
          {/* Vehicle Title and Price */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">{vehicle?.title}</h1>
              <p className="text-xl font-semibold text-orange-500">
  Ksh {vehicle?.price ? vehicle.price.toLocaleString() : '0'}
</p>

            </div>
          </div>

          {/* Image Slider */}
          <div className="mb-6">
            <div className="max-w-[100vw]">
              <Slider images={singleVehicleImages} />
            </div>
          </div>

          {/* Tabs for Specifications, Features, and Overview */}
          <div className="border-t border-gray-200 mt-4">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('specifications')}
                className={`flex-1 py-2 px-4 rounded-md text-sm sm:text-base
                  ${activeTab === 'specifications'
                    ? 'bg-gray-200 font-medium'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`flex-1 py-2 px-4 rounded-md text-sm sm:text-base
                  ${activeTab === 'features'
                    ? 'bg-gray-200 font-medium'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                Features & Option
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-4 rounded-md text-sm sm:text-base
                  ${activeTab === 'overview'
                    ? 'bg-gray-200 font-medium'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                Overview
              </button>
            </div>

            {/* Content for Active Tab */}
            <div className="mt-4">
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-md">
                      <span className="font-medium text-gray-700">{key}: </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-2">
                  {vehicleFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <span className="text-gray-700">{feature}</span>
                      <FaCheck className="text-green-500 w-5 h-5" />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="text-gray-700">
                    {vehicle?.title} {vehicle?.engine_size} {vehicle?.fuel_type} {vehicle?.year} {vehicle?.model}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          
        <div className="bg-white p-4 rounded-lg shadow mt-6 max-w-md mx-auto">
  <h3 className="text-2xl font-bold mb-4">Contact Info:</h3>

  <div className="space-y-4">
    {contacts.length > 0 ? (
      contacts.slice(0, 2).map((contact, index) => ( // Limit to 2 contacts
        <div key={index} className="border rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gray-200 p-2 rounded-full">
              <FaUser className="text-gray-600 text-xl" />
            </div>
            <div>
              <p className="font-medium">Contact: {contact.name}</p>
              <p className="text-gray-600">{contact.phone_number}</p>
              <p className="text-gray-600">{contact.email}</p> {/* Email added */}
            </div>
          </div>
          <div className="flex gap-2 mt-2 justify-center">
            <a href={`https://wa.me/${contact.phone_number.replace(/\D/g, '')}`} 
               target="_blank" 
               className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
            <a href={`tel:${contact.phone_number}`} 
               className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaPhone />
              <span>Call Us</span>
            </a>
            <a href={`mailto:${contact.email}`} 
               className="bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaEnvelope />
              <span>Email</span>
            </a>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No contact details available.</p>
    )}
  </div>
</div>


    <Button 
            color="info" 
            className="w-full" 
            onClick={() => openModal('test-drive')}
          >
            <MdDriveEta className='mr-2' />
            Book a Test Drive
          </Button>

          <Button 
            color="failure" 
            className="w-full" 
            onClick={() => openModal('make-offer')}
          >
            <MdLocalOffer className="mr-2" /> 
            Make an Offer
          </Button>

          <Button 
            color="warning" 
            className="w-full" 
            onClick={() => openModal('call-back')}
          >
            <BsTelephoneForward className="mr-2" /> 
            Request a Call Back
          </Button>

          <Button 
            color="success" 
            className="w-full" 
            onClick={() => window.open('https://api.whatsapp.com/send?phone=254792254254', '_blank')}
          >
            <FaWhatsapp className="mr-2" />
            WhatsApp Message
          </Button>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Shares</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-600 rounded-full">
                <a href='https://www.facebook.com/hilllaneautoshop/'><FaFacebook className="text-white" /></a>
              </button>
              <button className="p-2 bg-blue-400 rounded-full">
                <FaTwitter className="text-white" />
              </button>
              <button className="p-2 bg-green-500 rounded-full">
                <a href='https://api.whatsapp.com/send?phone=254792254254'><FaWhatsapp className="text-white" /></a>
              </button>
            </div>
             <div className="space-y-3 mt-4">
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-500" />
          <span>info@hilllaneautoshop.co.ke</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <span>Opposite Flamingo Towers, Upperhill, Nairobi, Kenya</span>
        </div>
      </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Map location</h3>
            <div className="h-30 bg-gray-100 rounded-lg">
              <Map/>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Vehicles Section */}
      <div className="mt-10 mb-8">
        <h2 className="font-bold text-3xl mb-4">Related Vehicles</h2>
        
        {isLoading ? (
          <div className="bg-gray-50 p-6 rounded-md text-center">
            <p className="text-gray-600">Loading related vehicles...</p>
          </div>
        ) : relatedVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {relatedVehicles.map((vehicle, index) => (
              <VehicleCard key={index} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-md text-center">
            <p className="text-gray-600">No related vehicles available</p>
          </div>
        )}
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionType={modalActionType}
        vehicleTitle={vehicle?.title}
      />
    </div>
  );
}