import { useEffect, useState } from "react";
import API from "../api/API";
import { HomeCouresel } from "../components/HomeCouresel";
import SearchForm from "../components/main/SearchForm";
import VehicleCard from "../components/VehicleCard";
import { VehicleType } from "../types/types";
import Blog from "./Blogs";
import { TbCar } from "react-icons/tb";

const Homepage = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
          limit: 8,
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
      <HomeCouresel />

      <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 p-4 w-full">
  {/* Icon & Text Section */}
  <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto pb-5">
    <TbCar className="text-red-600 text-3xl md:text-4xl" />
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
      Find Your <span className="text-red-600">Car</span>
    </h2>
  </div>

  {/* Search Form Section */}
  <div className="w-full md:w-auto flex justify-center md:justify-end md:flex-1 pt-5">
    <SearchForm />
  </div>
</div>


      {/* Vehicles Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {vehicles.map((vehicle, index) => (
          <VehicleCard key={index} vehicle={vehicle} />
        ))}
      </div>

      {/* Blog Section */}
      <Blog />
    </div>
  );
};

export default Homepage;
