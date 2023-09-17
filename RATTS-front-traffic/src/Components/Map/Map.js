import LocationMap from "./LocationMap";
import LocationRoute from "./locationRoute";


const Map = () => {
    // const driverLocation = [YOUR_DRIVER_LATITUDE, YOUR_DRIVER_LONGITUDE];
    // const destination = [YOUR_DESTINATION_LATITUDE, YOUR_DESTINATION_LONGITUDE];
    
    return (
        <div>
            <LocationRoute />
            {/* <LocationMap driverLocation={driverLocation} destination={destination} /> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg> */}

        </div>
    )
}

export default Map;