import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Map from './Components/Map/Map'
// import Chat from './Components/Connect/connect'
import DriverList from './Components/Driver Detail/DriverList'
import TrafficList from './Components/Traffic Detail/TrafficList'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/map" element={<Map/>}/>
            <Route path="/driver" element={<DriverList/>}/>
            <Route path="/traffic" element={<TrafficList/>}/>
            {/* <Route path="/contact" element={<Chat/>}/> */}
        </Routes>
    )
}

export default AppRouter;