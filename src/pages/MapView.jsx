import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "../components/RoutingMachine";
import { sendMessage, receiveMessage, removeListener } from "../config/Socket";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Droplets, Wifi, WifiOff, ArrowLeft, LocateFixed } from "lucide-react";

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

  useEffect(() => { sendMessage("request-partner-location", { id }); }, [id]);

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
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          sendMessage("share-location", { id, location: coords });
        },
        () => toast.error("Location access denied."),
        { enableHighAccuracy: true }
      );
    }
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId); };
  }, [id]);

  return (
    <div style={{ height: "100vh", background: "var(--ink)", position: "relative" }}>
      {/* Top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(15,13,12,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--crimson)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Droplets size={14} color="white" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "white", fontSize: "0.95rem" }}>RedHope — Live Map</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Real-time donor tracking</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            padding: "6px 14px", borderRadius: "100px",
            background: partnerLocation.latitude ? "rgba(13,122,78,0.2)" : "rgba(184,92,0,0.2)",
            border: `1px solid ${partnerLocation.latitude ? "rgba(13,122,78,0.4)" : "rgba(184,92,0,0.4)"}`,
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            {partnerLocation.latitude
              ? <Wifi size={12} color="#5AE0A0" />
              : <WifiOff size={12} color="#F0A84A" />
            }
            <span style={{ color: partnerLocation.latitude ? "#5AE0A0" : "#F0A84A", fontSize: "0.75rem", fontWeight: 700 }}>
              {partnerLocation.latitude ? "Donor located" : "Awaiting donor"}
            </span>
          </div>

          <button onClick={() => navigate(-1)} style={{
            padding: "8px 16px", borderRadius: "8px",
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.8)", cursor: "pointer",
            fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "0.82rem",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <ArrowLeft size={13} /> Back
          </button>
        </div>
      </div>

      {/* Map */}
      {location.latitude ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          {partnerLocation.latitude && (
            <RoutingMachine userLocation={location} partnerLocation={partnerLocation} />
          )}
        </MapContainer>
      ) : (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <LocateFixed size={48} color="var(--crimson)" strokeWidth={1.5} style={{ animation: "pulse-ring 2s infinite" }} />
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>Acquiring your location…</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>Please allow location access</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
