import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import arrowImage from "./assets/images/icon-arrow.svg";
import locationImage from "./assets/images/icon-location.svg";

const customIcon = L.icon({
  iconUrl: locationImage, // Use arrowImage for the marker icon
  iconSize: [32.5, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function App() {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchIP, setSearchIP] = useState("");

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://geo.ipify.org/api/v2/country,city",
        {
          params: {
            apiKey: "at_v8UeEm74iwFqmOjTfO9Db2tDKKmRq",
            ipAddress: searchIP,
          },
        }
      );
      setLocationData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchLocation();
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (error) return <div className="absolute top-[50%] left-[50%]">Error: {error.message}</div>;
  if (loading) {
    return (
      <p className="Loading absolute top-[50%] left-[50%]">
        <span className="loading-letter">L</span>
        <span className="loading-letter">o</span>
        <span className="loading-letter">a</span>
        <span className="loading-letter">d</span>
        <span className="loading-letter">i</span>
        <span className="loading-letter">n</span>
        <span className="loading-letter">g</span>
      </p>
    );
  }

  const { ip, location, isp } = locationData;

  return (
    <>
      <main className="bg-desktop bg-origin-content bg-top bg-no-repeat flex flex-col justify-center items-center relative sm:bg-mobile">
        <h1 className="text-white text-[1.25rem] p-[1rem] sm:text-[1.5rem]">
          <span className="text-gray-200">IP</span> Address Tracker
        </h1>
        <form
          className="search-form mb-[6rem] sm:mb-[12rem] md:mb-[10rem]"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-row items-center">
            <input
              className="search px-[1rem] h-[2.5rem] w-[20rem] rounded-[10px_0_0_10px] font-[400] text-[.8rem] cursor-pointer outline-none sm:w-[18rem] "
              type="text"
              placeholder="Search for any IP address or domain"
              value={searchIP}
              onChange={(e) => setSearchIP(e.target.value)}
            />
            <button
              className="search-btn bg-VeryDarkGray h-[2.5rem] w-[2.5rem] rounded-[0_10px_10px_0] flex justify-center items-center hover:bg-DarkGray"
              type="submit"
            >
              <img src={arrowImage} alt="Search" />
            </button>
          </label>
        </form>
        <div className="showIP flex flex-row justify-between items-baseline bg-white pt-[1.5rem] pb-[2rem] rounded-[15px] absolute top-[9rem] z-10 sm:flex-col sm:text-center  sm:justify-center md:flex-col md:text-center md:justify-center">
          <div className="ip w-[13rem] h-[4rem] px-[1rem] border-r-[1px] sm:border-none sm:w-[20.5rem] md:border-none md:w-[22.5rem]">
            <h2 className="text-[.6rem] text-DarkGray font-[500] tracking-wider leading-5">
              IP ADDRESS
            </h2>
            <p className="font-[500] text-VeryDarkGray">{ip}</p>
          </div>
          <div className="location w-[13rem] h-[4rem] px-[1rem] border-r-[1px] sm:border-none sm:w-[20.5rem] md:border-none md:w-[22.5rem]">
            <h2 className="text-[.6rem] text-DarkGray font-[500] tracking-wider leading-5">
              LOCATION
            </h2>
            <p className="font-[500] text-VeryDarkGray">
              {location.city}, {location.region} <br />
              {location.postalCode}
            </p>
          </div>
          <div className="timezone w-[13rem] h-[4rem] px-[1rem] border-r-[1px] sm:border-none sm:w-[20.5rem] md:border-none md:w-[22.5rem]">
            <h2 className="text-[.6rem] text-DarkGray font-[500] tracking-wider leading-5">
              TIMEZONE
            </h2>
            <p className="font-[500] text-VeryDarkGray">
              UTC {location.timezone}
            </p>
          </div>
          <div className="isp w-[13rem] h-[4rem] px-[1rem] border-r-[1px] sm:border-none sm:w-[20.5rem] md:border-none md:w-[22.5rem]">
            <h2 className="text-[.6rem] text-DarkGray font-[500] tracking-wider leading-5">
              ISP
            </h2>
            <p className="font-[500] text-VeryDarkGray">{isp}</p>
          </div>
        </div>
        {!loading && (
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: "600px", width: "100%", zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lng]} icon={customIcon}>
              <Popup>
                {location.city}, {location.region}, {location.postalCode}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </main>
      <footer>
        <p className='attribution" text-center text-[.8rem] p-[.5rem]'>
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="mailto:chaithawat.contact@gmail.com">Chaithawat Pinsuwan</a>.
        </p>
      </footer>
    </>
  );
}

export default App;
