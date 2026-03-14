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
          const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          setLocation(coords);
          sendMessage("share-location", { id, location: coords });
        },
        (err) => toast.error("Location access denied."),
        { enableHighAccuracy: true }
      );
    }
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId); };
  }, [id]);

  return (
    <div style={{ height: '100vh', background: 'var(--ink)', position: 'relative' }}>
      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(15,13,12,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/></svg>
          </div>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>RedHope — Live Map</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Real-time donor tracking</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            padding: '6px 14px', borderRadius: '100px',
            background: partnerLocation.latitude ? 'rgba(13,122,78,0.2)' : 'rgba(184,92,0,0.2)',
            border: `1px solid ${partnerLocation.latitude ? 'rgba(13,122,78,0.4)' : 'rgba(184,92,0,0.4)'}`,
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: partnerLocation.latitude ? '#5AE0A0' : '#F0A84A', display: 'inline-block' }} />
            <span style={{ color: partnerLocation.latitude ? '#5AE0A0' : '#F0A84A', fontSize: '0.75rem', fontWeight: 700 }}>
              {partnerLocation.latitude ? 'Donor located' : 'Awaiting donor'}
            </span>
          </div>
          <button onClick={() => navigate(-1)} style={{
            padding: '8px 16px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.8)', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.82rem',
          }}>← Back</button>
        </div>
      </div>

      {/* Map */}
      {location.latitude ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          {partnerLocation.latitude && (
            <RoutingMachine
              userLocation={location}
              partnerLocation={partnerLocation}
            />
          )}
        </MapContainer>
      ) : (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px', animation: 'float 2s ease-in-out infinite' }}>📍</div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>Acquiring your location…</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', marginTop: '8px' }}>Please allow location access</p>
        </div>
      )}

      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </div>
  );
};

export default MapView;
