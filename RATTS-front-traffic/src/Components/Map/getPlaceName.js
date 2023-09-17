import { OpenStreetMapProvider } from 'leaflet-geosearch';

// Initialize the geocoder provider
const provider = new OpenStreetMapProvider();

// Function to get place name from latitude and longitude
const getPlaceName = async (latitude, longitude) => {
    const lat= parseFloat(latitude);
    const long = parseFloat(longitude);
    console.log(`print ${lat} and ${long}`);
  try {
    const query = `${lat}, ${long}`;
    const results = await provider.search({ query: query });
    console.log(`show ${results}`);
    if (results.length > 0) {
      // Return the first result's label (place name)
      return results[0].label;
      
    } else {
      console.error('No results found for coordinates');
      return null;
    }
  } catch (error) {
    console.error('Error fetching place name:', error);
    return null;
  }
};

export default getPlaceName;
