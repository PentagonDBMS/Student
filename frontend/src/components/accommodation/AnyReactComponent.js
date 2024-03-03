import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icon issue in Leaflet 1.x.x: see https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const AnyReactComponent = ({ text }) => <Popup>{text}</Popup>;

const Map = ({ center, zoom }) => (
  <MapContainer
    center={center}
    zoom={zoom}
    style={{ height: "300px", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={center}>
      <AnyReactComponent text="My Marker" />
    </Marker>
  </MapContainer>
);

const AccommodationMap = ({ center }) => {
  const zoom = 14; // You can also pass zoom as a prop if needed

  return <Map center={center} zoom={zoom} />;
};

export default AccommodationMap;
