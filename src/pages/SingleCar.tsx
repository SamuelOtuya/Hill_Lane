import { Button} from 'flowbite-react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaWhatsapp, FaCheck } from 'react-icons/fa';
import { MdDriveEta, MdLocalOffer } from 'react-icons/md';
import { BsTelephoneForward } from 'react-icons/bs';
import Map from '../components/Map';
// import { VehicleCard } from './VehicleCard';
import { useParams } from 'react-router-dom';
import API from '../api/API';
import { useEffect, useState } from 'react';
import { VehicleType } from '../types/types';
import { Slider } from '../components/About/slider';

export default function CarDetails() {
  const [activeTab, setActiveTab] = useState('specifications');

  
  


  const {id} = useParams();

  const [v_id,make,model] = id?.split("-") || ""
  console.log(v_id)


  const [vehicle,setVehicle] = useState<VehicleType | null>(null)
  const [singleVehicleImages, setSingleVehicleImages] = useState<string[]>([])
  const [vehicleFeatures,setVehicleFeatures ] = useState<string[]>([])
  
 const getSingleVehicle = async ()=>{
  try {
    const res = await API.get("client/vehicle-single",{
      params:{
        vehicle_id:v_id,
        make:make,
        model:model
      }
    })

    setVehicle(res.data.vehicle)
    
    setSingleVehicleImages(res.data.vehicle.images)
    setVehicleFeatures(res.data.vehicle.features)
    console.log("Images:", res.data.vehicle.images)
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(()=>{
  getSingleVehicle()
 },[])

 const specifications = {
  "Fuel Type": vehicle?.fuel_type || "string",
  "Transmission Type": vehicle?.transmission || "Not specified",
  "Seating": vehicle?.doors || "Not specified",
  "Drive Type": vehicle?.drive_type || "Not specified",
  "Exterior Colors": vehicle?.color || "Not specified",
  // "Interior Colors": vehicle?.|| "Not specified",
  "Engine": vehicle?.engine_size|| "Not specified",
  "Mileage": vehicle?.mileage|| "Not specified"
};

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Car Images and Details */}
        <div className="md:col-span-2">
  {/* Vehicle Title and Price */}
  <div className="flex justify-between items-start mb-6">
    <div>
      <h1 className="text-2xl font-bold">{vehicle?.title}</h1>
      <p className="text-xl font-semibold text-orange-500">{vehicle?.price}</p>
    </div>
  </div>

  {/* Image Slider */}
  <div className="mb-6">
    <div className="w-full h-auto">
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
        <Button 
  color="info" 
  className="w-full" 
  onClick={() => window.open('https://example.com/test-drive', '_blank')}
>
  <MdDriveEta className='mr-2' />
  Book a Test Drive
</Button>

<Button 
  color="failure" 
  className="w-full" 
  onClick={() => window.open('https://example.com/make-offer', '_blank')}
>
  <MdLocalOffer className="mr-2" /> 
  Make an Offer
</Button>

<Button 
  color="warning" 
  className="w-full" 
  onClick={() => window.open('https://example.com/request-call', '_blank')}
>
  <BsTelephoneForward className="mr-2" /> 
  Request a Call Back
</Button>

<Button 
  color="success" 
  className="w-full" 
  onClick={() => window.open('https://api.whatsapp.com/send?phone=254770070300', '_blank')}
>
  <FaWhatsapp className="mr-2" /> 
  WhatsApp Message
</Button>


          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-500" />
                <span>info@urbandrive.co.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-500" />
                <span>(+254) 770070300</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <span>KIAMBU ROAD - BYPASS JUNCTION</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Shares</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-600 rounded-full">
                <FaFacebook className="text-white" />
              </button>
              <button className="p-2 bg-blue-400 rounded-full">
                <FaTwitter className="text-white" />
              </button>
              <button className="p-2 bg-green-500 rounded-full">
                <FaWhatsapp href='https://api.whatsapp.com/send?phone=254770070300' className="text-white" />
              </button>
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
      <span className='font-bold text-3xl'>Related Posts</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
  {/* <VehicleCard />
  <VehicleCard />
  <VehicleCard />
  <VehicleCard /> */}
 </div>
    </div>
    
  );
}