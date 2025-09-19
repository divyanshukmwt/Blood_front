import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "../components/RoutingMachine";
import { sendMessage, receiveMessage, removeListener } from "../config/Socket";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MapView = () => {
  const { id } = useParams();

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [partnerLocation, setPartnerLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    sendMessage("join-room", id);

    const handleLocationRequest = () => {
      if (location.latitude && location.longitude) {
        sendMessage("share-location", { id, location });
      }
    };

    receiveMessage("request-partner-location", handleLocationRequest);

    return () => {
      removeListener("request-partner-location", handleLocationRequest);
    };
  }, [id, location]);

  useEffect(() => {
    sendMessage("request-partner-location", { id });
  }, [id]);

  useEffect(() => {
    const handleReceiveLocation = (data) => {
      setPartnerLocation(data.location);
    };

    receiveMessage("receive-location", handleReceiveLocation);

    return () => {
      removeListener("receive-location", handleReceiveLocation);
    };
  }, [id]);

  useEffect(() => {
    let watchId;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          sendMessage("share-location", { id, location: coords });
        },
        (err) => {
          toast.error("Error retrieving location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [id]);

  const from = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const to = {
    lat: partnerLocation.latitude,
    lng: partnerLocation.longitude,
  };

  if (location.latitude === null) {
    return (
      <div className="text-white flex items-center justify-center w-full h-screen">
        Fetching your location...
      </div>
    );
  }

  return (
    <MapContainer
      center={from}
      zoom={13}
      scrollWheelZoom={true}
      className="h-screen w-full z-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {partnerLocation.latitude && <RoutingMachine from={from} to={to} />}
    </MapContainer>
  );
};

export default MapView;
