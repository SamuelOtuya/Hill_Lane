import { useEffect, useState } from "react";
import API from "../../api/API";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  const makes:{name:string,value:number}[] = JSON.parse(localStorage.getItem("makes") || "[]")
  const [models,setModels] = useState<{name:string,value:number}[]>([]);


  const [selectedMake,setSelectedMake] = useState(0)
  const [selectedModel,setSelectedModel] = useState(0)
  const [max_price,setmax_price] = useState(0)

  //get models when make is chosen
  const getModelsAsync = async (make_value:number)=>{
    const res = await API.patch("client/search",{
      make_id:make_value
    });
    setModels(res.data.models)
  }

  //called when search button is pressed
  const onSearchPress = ()=>{
    const data = {
      make:selectedMake,
      model:selectedModel,
      max_price
    };

    navigate("/search",{state:{...data}})
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <div className={`container mx-auto px-4 transition-all duration-300 ${
      isSticky ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-lg" : "relative -mt-8 mb-8"
    }`}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row gap-4">
        <select onChange={(e)=>{
          setSelectedMake(Number(e.target.value));
          getModelsAsync(Number(e.target.value))
        }} 
        className="flex-1 p-2 border-[#fe2a39]  rounded">
          <option>Choose Make</option>
          {
            makes.map((m,i)=>{
              return(
                <option key={i} value={m.value}>{m.name}</option>
              )
            })
          }
        </select>
        <select onChange={(e)=>{
          setSelectedModel(Number(e.target.value))
        }} className="flex-1 p-2 border-[#fe2a39] rounded">
          <option>Choose Model</option>
          {
            models.map((m,i)=>{
              return(
                <option key={i} value={m.value}>{m.name}</option>
              )
            })
          }
        </select>
        <select onChange={(e)=>setmax_price(Number(e.target.value))} className="flex-1 p-2 border-[#fe2a39] rounded">
          <option>Select Budget</option>
          <option value="600000">KES {(600000).toLocaleString()}</option>
          <option value="700000">KES {(700000).toLocaleString()}</option>
          <option value="800000">KES {(800000).toLocaleString()}</option>
          <option value="1000000">KES {(1000000).toLocaleString()}</option>
          <option value="2000000">KES {(2000000).toLocaleString()}</option>
          <option value="5000000">KES {(5000000).toLocaleString()}</option>
          <option value="10000000">KES {(10000000).toLocaleString()}</option>
          <option value="20000000">KES {(20000000).toLocaleString()}</option>
        </select>
        <button onClick={onSearchPress} className="bg-[#fe2a39] text-white px-6 py-2 rounded w-full sm:w-auto">
          Find a Car
        </button>
      </div>
    </div>
    

    
  );
};

export default SearchForm;
