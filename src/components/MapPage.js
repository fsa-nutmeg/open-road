import Map from "./map/Map";
import "../map.css";

const MapPage = () => {
  return (
    <div className="map-page">
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
