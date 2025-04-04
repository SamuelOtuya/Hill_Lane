import { useEffect, useState } from "react";
import API from "../api/API";
import { HomeCouresel } from "../components/HomeCouresel";
import SearchForm from "../components/main/SearchForm";
import VehicleCard from "../components/VehicleCard";
import { VehicleType } from "../types/types";
import Blog from "./Blogs";
import { TbCar } from "react-icons/tb";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [, setLoading] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);

  /// Get car makes
  const getMakesAsync = async () => {
    const res = await API.get("client/search");
    localStorage.setItem("makes", JSON.stringify(res.data.makes));
    console.log(res.data);
  };

  const getHomeData = async () => {
    try {
      setLoading(true);

      const res = await API.get("client/home-listing", {
        params: {
          limit: 12,
        },
      });
      setVehicles(res.data.cars);
      setLoading(false);
      getMakesAsync();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div>
      {/* Find Your Car section for Mobile - Visible only on mobile */}
      <div className="block md:hidden max-w-8xl mx-auto px-6 pt-4">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2 w-full">
            <TbCar className="text-red-600 text-3xl" />
            <h2 className="text-2xl font-bold text-gray-800">
              Find Your <span className="text-red-600">Car</span>
            </h2>
          </div>
          
          {/* Search Form Section */}
          <div className="w-full flex justify-center pt-3 pb-4">
            <SearchForm />
          </div>
        </div>
      </div>
      
      {/* HomeCarousel with Full Width */}
      <div className="max-w-full px-6"> 
        <HomeCouresel />
      </div>
  
      {/* Main Content Wrapper */}
      <div className="max-w-8xl mx-auto sm:px-32">
        {/* Header Section - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-row items-center justify-between gap-4 p-4 w-full">
          <div className="flex items-center gap-3 w-auto">
            <TbCar className="text-red-600 text-4xl" />
            <h2 className="text-3xl font-bold text-gray-800">
              Find Your <span className="text-red-600">Car</span>
            </h2>
          </div>
  
          {/* Search Form Section */}
          <div className="w-auto flex justify-end flex-1 pt-5">
            <SearchForm />
          </div>
        </div>
  
        {/* Vehicles Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 md:px-0">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={index} vehicle={vehicle} />
          ))}
        </div>
  
        {/* View All Stock Button */}
        <div className="flex justify-center mb-8 mt-2">
          <Link to='/find-car'>
            <button className="bg-[#fe2a39] text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
              View all our stock
            </button>
          </Link>
        </div>
  
        {/* Blog Section */}
        <Blog />
      </div>
    </div>
  );
}

export default Homepage;