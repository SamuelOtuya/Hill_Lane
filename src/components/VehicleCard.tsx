
import { Card } from "flowbite-react";
import { FaCalendarAlt, FaCar } from "react-icons/fa";
import { GiGasPump } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export function VehicleCard({ vehicle }:any) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() =>
        navigate(`/single-car/${vehicle.id}-${vehicle.make}-${vehicle.model}`)
      }
      className="flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      
      <div className="relative w-full  h-full aspect-[4/3] overflow-hidden rounded-t-lg">
        <img
          src={vehicle.images}
          alt={vehicle.title}
          className="absolute inset-0 w-full h-full object-contain bg-gray-100"
          onError={(_e) => {
             "/api/placeholder/400/300"; // Fallback image
          }}
        />
        
        <div className="absolute top-2 left-2 flex gap-2 z-10 ">
          {/* <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm shadow-md">
            Locally Used
          </span> */}
          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm shadow-md">
            {vehicle.status}
          </span>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-semibold text-[#fe2a39] truncate">
            {vehicle.title}
          </h4>
          <h3 className="text-xl font-bold text-gray-900 mt-1">
            KSH {vehicle.price?.toLocaleString() ?? '0'}
          </h3>
        </div>

        {/* Icons and Specs */}
        <div className="grid grid-cols-3 gap-2 text-gray-600 mt-4">
          <div className="flex items-center gap-1 text-sm">
            <FaCar className="text-[#fe2a39]" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <FaCalendarAlt className="text-[#fe2a39]" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <GiGasPump className="text-[#fe2a39]" />
            <span>{vehicle.fuel_type}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default VehicleCard;