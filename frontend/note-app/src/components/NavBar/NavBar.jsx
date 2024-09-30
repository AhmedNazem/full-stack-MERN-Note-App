/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useState } from "react";

function NavBar({ userInfo }) {
  const [searchQuery, setSearchQuery] = useState(""); // Fix typo
  const navigate = useNavigate(); // Call useNavigate() correctly

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login"); // Use navigate to redirect
  };

  const handleSearch = () => {
    // Logic for handling search, e.g., navigating or filtering
    console.log("Searching for:", searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery(""); // Fix typo
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Fix onChange handler
        handleSearch={handleSearch} // Fix typo: handleSearch instead of handelSearch
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />
    </div>
  );
}

export default NavBar;
