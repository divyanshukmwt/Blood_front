import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import pin from "/image/pin.gif"

const RoutingMachine = ({ from, to }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const customIcon = L.icon({
          iconUrl: pin,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from.lat, from.lng), 
        L.latLng(to.lat, to.lng)
    ],
      lineOptions: {
        styles: [{ color: "#ff00007d", weight: 5 }],
      },
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          draggable: false,
          icon: customIcon
        });
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, from, to]);

  return null;
};

export default RoutingMachine;
