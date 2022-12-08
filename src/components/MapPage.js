import Map from "./map/Map";
import "../map.css";
import Navbar from "./Navbar";

const MapPage = () => {
  return (
    <div className="map-page">
       <div className="w-full h-full flex flex-col justify-between">
          <Navbar />
            <div>
              <Map />
            </div>
        </div>
       </div>
  );
};

export default MapPage;
