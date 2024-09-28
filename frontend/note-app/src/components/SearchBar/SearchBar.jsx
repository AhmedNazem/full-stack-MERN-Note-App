// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

// eslint-disable-next-line react/prop-types
function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  // Fix spelling
  return (
    <div className="w-80 flex items-center px-4 first-line:bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch} // Fix typo: handleSearch
      />
    </div>
  );
}

export default SearchBar;
