import { useEffect, useState } from "react";
import API from "../api/API";
import { HomeCouresel } from "../components/HomeCouresel"
import SearchForm from "../components/main/SearchForm"
import VehicleCard from "../components/VehicleCard";
import { VehicleType } from "../types/types";

const Homepage = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const [vehicles,setVehicles] = useState<VehicleType[]>([])

   ///getcar makes
   const getMakesAsync = async () => {
    const res = await API.get("client/search")
    localStorage.setItem("makes",JSON.stringify(res.data.makes))
    console.log(res.data)
  }

  const getHomeData = async ()=>{
    try {
        setLoading(true);

        const res = await API.get("client/home-listing",{
            params:{
                limit:8
            }
        })
        setVehicles(res.data.cars)
        setLoading(false)
        getMakesAsync()
    } catch (error) {
      console.log(error) 
      setLoading(false)
    }  
}

  useEffect(()=>{
    getHomeData()
  },[])

 
  return (
    <div>
        <HomeCouresel/>
        <div className="m-5">
     <div className="m-5 justify-center flex text-2xl font-bold">
      Find a Car
      </div>
     {/* <div className="border-t border-orange-600 md:col-span-2"></div> */}
     
     <div className="pt-5"><SearchForm/></div>

     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
      {
        vehicles.map((vehicle,index)=>{
          return(
            <VehicleCard key={index} vehicle={vehicle} />
          )
        })
      }
</div>

    </div>
  )
}

export default Homepage