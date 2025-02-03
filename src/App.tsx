import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage'
import SingleCar from './pages/SingleCar'
import FindCar from './pages/FindCar'
import AboutUs from './pages/AboutUs'

function App() {

  return (
   <DefaultLayout>
<Routes>
<Route path="/" element={<Homepage />} />
<Route path="/single-car/:id"element={<SingleCar/>}/>
<Route path='/find-car'element={<FindCar/>}/>
<Route path='/about'element={<AboutUs/>}/>

  </Routes>
   </DefaultLayout>

  )
}

export default App
