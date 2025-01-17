import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage'

function App() {

  return (
   <DefaultLayout>
<Routes>
<Route path="/" element={<Homepage />} />
  </Routes>
   </DefaultLayout>

  )
}

export default App
