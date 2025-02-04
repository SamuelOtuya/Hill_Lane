import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage'
import SingleCar from './pages/SingleCar'
import FindCar from './pages/FindCar'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import FAQs from './pages/FAQs'
import Blogs from './pages/Blogs'

function App() {

  return (
   <DefaultLayout>
<Routes>
<Route path="/" element={<Homepage />} />
<Route path="/single-car/:id"element={<SingleCar/>}/>
<Route path='/find-car'element={<FindCar/>}/>
<Route path='/about'element={<AboutUs/>}/>
<Route path='/contact'element={<ContactUs/>}/>
<Route path='/faqs'element={<FAQs/>}/>
<Route path='/blog'element={<Blogs/>}/>

  </Routes>
   </DefaultLayout>

  )
}

export default App
