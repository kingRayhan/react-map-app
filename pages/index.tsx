import { useCurrentCordinate, useGoogleMap } from "@/lib/GoogleMap";
import React, { createRef, useEffect } from "react";
import { google } from "google-maps";

// Bangladesh cities lat and lngs
const cities = [
  {
    name: "Chittagong",
    lat: 22.33,
    lng: 91.8,
  },
  {
    name: "Cumilla",
    lat: 22.9,
    lng: 89.8,
  },
  {
    name: "Barishal",
    lat: 22.7,
    lng: 90.8,
  },
];

const index = () => {
  const { setCenter, map, mapDomRef, setZoom, addMarker } = useGoogleMap();
  const { getCurrentCordinates, cordinate } = useCurrentCordinate();

  useEffect(() => {
    getCurrentCordinates();
  }, []);

  const loadCurrentLocation = async () => {
    if (map) {
      setCenter(cordinate);
      addMarker(cordinate);
    }
  };

  const loadCityMap = async (cordinate) => {
    if (map) {
      setCenter(cordinate);
      addMarker(cordinate);
      setZoom(10);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-none w-3/12 p-6">
        <h2 className="text-xl uppercase">Google Map App</h2>

        <div className="flex flex-col gap-10 mt-10">
          <button onClick={loadCurrentLocation}>My location</button>
          {cities.map((city) => (
            <button
              onClick={() => loadCityMap({ lat: city.lat, lng: city.lng })}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
      <div ref={mapDomRef} className="flex-1 w-screen h-full bg-red-400 "></div>
    </div>
  );
};

export default index;
