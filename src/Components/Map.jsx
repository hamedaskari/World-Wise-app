import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import styles from "./Map.module.css";

import useUrlPosition from "../Hooks/useUrlPosition";

function Map({ setIsSidBarOpen }) {
  let { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([38.8, -9.1]);

  useEffect(
    function () {
      if (!mapLat || !mapLng) return;
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLng, mapLat]
  );

  return (
    <div id="map" className={styles.mapContainer}>
      <MapContainer
        className={styles.mapContainer}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city, i) => {
          return (
            <Marker key={i} position={[city?.lat, city?.lng]}>
              <Popup>
                <span>
                  {city?.emoji} {city?.cityName}
                </span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <EventMap setIsSidBarOpen={setIsSidBarOpen} />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();

  map.setView(position);
  return null;
}
function EventMap({ setIsSidBarOpen }) {
  const nvigate = useNavigate();
  useMapEvents({
    click: (e) => {
      setIsSidBarOpen(true);
      nvigate(`form?lat=${+e.latlng.lat}&lng=${+e.latlng.lng}`);
    },
  });
}

export default Map;
