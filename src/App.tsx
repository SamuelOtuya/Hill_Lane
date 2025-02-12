import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage'
import SingleCar from './pages/SingleCar'
import FindCar from './pages/FindCar'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import FAQs from './pages/FAQs'
import Blogs from './pages/Blogs'
import SearchPage from './pages/SearchPage'
// import ErrorPage from './pages/404'

function App() {

  return (
    <DefaultLayout>
      <Routes>
        <Route path="/vehicle-listings" element={<Homepage />} />
        <Route path="/single-car/:id" element={<SingleCar />} />
        <Route path='/find-car' element={<FindCar />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/faqs' element={<FAQs />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='*' element={<Homepage/>} />
      </Routes>
    </DefaultLayout>

  )
}

export default App
