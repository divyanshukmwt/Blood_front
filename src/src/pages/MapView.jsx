import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "../components/RoutingMachine";
import { sendMessage, receiveMessage, removeListener } from "../config/Socket";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [partnerLocation, setPartnerLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    sendMessage("join-room", id);
    const handleLocationRequest = () => {
      if (location.latitude && location.longitude) {
        sendMessage("share-location", { id, location });
      }
    };
    receiveMessage("request-partner-location", handleLocationRequest);
    return () => removeListener("request-partner-location", handleLocationRequest);
  }, [id, location]);

  useEffect(() => {
    sendMessage("request-partner-location", { id });
  }, [id]);

  useEffect(() => {
    const handleReceiveLocation = (data) => setPartnerLocation(data.location);
    receiveMessage("receive-location", handleReceiveLocation);
    return () => removeListener("receive-location", handleReceiveLocation);
  }, [id]);

  useEffect(() => {
    let watchId;
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          setLocation(coords);
          sendMessage("share-location", { id, location: coords });
        },
        () => toast.error("Error retrieving location."),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId); };
  }, [id]);

  const from = { lat: location.latitude, lng: location.longitude };
  const to = { lat: partnerLocation.latitude, lng: partnerLocation.longitude };

  if (location.latitude === null) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", fontFamily: "Poppins,sans-serif" }}>
        <div className="rh-spinner" style={{ width: 48, height: 48, borderWidth: 4 }}/>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>Fetching your location...</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>Please allow location access in your browser</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Back button overlay */}
      <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 1000 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: 600, color: "var(--ink)", fontFamily: "Poppins,sans-serif", boxShadow: "var(--shadow-md)", transition: "all 150ms ease" }}
          onMouseEnter={e => e.currentTarget.style.background = "#fff"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.95)"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
      </div>

      {/* Status overlay */}
      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1000 }}>
        <div style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "12px 16px", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: partnerLocation.latitude ? "var(--success)" : "var(--warning)", display: "inline-block" }}/>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)", fontFamily: "Poppins,sans-serif" }}>
              {partnerLocation.latitude ? "Partner located" : "Waiting for partner..."}
            </span>
          </div>
        </div>
      </div>

      <MapContainer center={from} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%", zIndex: 0 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {partnerLocation.latitude && <RoutingMachine from={from} to={to}/>}
      </MapContainer>
    </div>
  );
};

export default MapView;
