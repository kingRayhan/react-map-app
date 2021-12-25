import { google, Loader } from "google-maps";
import React, { useContext, useEffect, useState } from "react";

export interface GoogleMapCord {
  lat: number;
  lng: number;
}

export interface GoogleMapContextType {
  map: google.maps.Map | null;
  markers?: google.maps.Marker[] | null;
  addMarker: (marker: GoogleMapCord) => void;
  removeMarker: (marker: google.maps.Marker) => void;
  clearMarkers: () => void;
  setCenter: (position: GoogleMapCord, zoom?: number) => void;
  setZoom: (zoom: number) => void;
  mapDomRef: React.RefObject<HTMLDivElement>;
}

const GoogleMapContext = React.createContext<GoogleMapContextType>(null);

export const GoogleMapProvider = ({ children, apiKey }) => {
  if (!apiKey) {
    throw new Error("Google Map API Key is required");
  }

  const mapDomRef = React.useRef<HTMLDivElement>(null);

  // map
  const [map, setMap] = React.useState<google.maps.Map>(null);
  // google
  const [google, setGoogle] = React.useState<google>(null);
  // markers
  const [markers, setMarkers] = React.useState<GoogleMapCord[]>([]);

  // initMap
  const initMap = async () => {
    const loader = new Loader(apiKey);
    const google = await loader.load();

    const mapInitial = new google.maps.Map(mapDomRef.current, {
      center: { lat: 23.81800190015246, lng: 90.42104025271799 },
      zoom: 8,
    });
    setMap(mapInitial);
    setGoogle(google);
  };

  useEffect(() => {
    if (mapDomRef.current) initMap();
  }, [mapDomRef]);

  const addMarker = (cordinate: GoogleMapCord) => {
    // setMarkers((prevMarkers) => [...prevMarkers, cordinate]);
    new google.maps.Marker({
      position: {
        lat: cordinate.lat,
        lng: cordinate.lng,
      },
      animation: google.maps.Animation.DROP,
      map,
      icon: {
        url: "https://res.cloudinary.com/techdiary-dev/image/upload/v1640444417/static-assets/e4sdtjofuearwchcaeyk.png",
        scaledSize: new google.maps.Size(50, 50),
      },
    });
  };

  const removeMarker = (marker: google.maps.Marker) => {
    // setMarkers(markers.filter((m) => m !== marker));
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  const setCenter = (position: GoogleMapCord) => {
    if (map) {
      map.setCenter(position);
      // map.setZoom(zoom);
    }
  };

  const setZoom = (zoom: number) => {
    if (map) {
      map.setZoom(zoom);
    }
  };

  // useEffect(() => {
  //   markers.forEach((marker) => {

  //   });
  // }, [markers]);

  return (
    <GoogleMapContext.Provider
      value={{
        map,
        addMarker,
        removeMarker,
        clearMarkers,
        setCenter,
        setZoom,
        mapDomRef,
      }}
    >
      {children}
    </GoogleMapContext.Provider>
  );
};

export const useGoogleMap = () => {
  const context = useContext(GoogleMapContext);
  if (!context) {
    throw new Error("useGoogleMap must be used within a GoogleMapProvider");
  }
  return context;
};

export const useCurrentCordinate = () => {
  // cordinates state
  const [cordinate, setCordinate] = useState<GoogleMapCord>({
    lat: 0,
    lng: 0,
  });

  // error state
  const [error, setError] = useState<string>("");

  // get current cordinates
  const getCurrentCordinates = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCordinate({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  return { getCurrentCordinates, cordinate, error };
};
