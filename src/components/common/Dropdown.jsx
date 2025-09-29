import { useState, useRef, useEffect } from "react";
import Icplus from "@/assets/icons/ic-plus.svg";

export default function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if(event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown );
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown ); 
    }; 
  }, []);

  return (
    <div className="relative w-[120px] inline-block" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="ml-auto flex items-center justify-center w-9 h-9 bg-transparent border-none text-white"
      >
        <Icplus className="text-black  bg-gray-800 " sx={{ fontSize: 30 }} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-10 right-0 bg-gray-700 text-white p-2 rounded shadow-lg z-50">
          <ul className="cursor-pointer rounded-lg border border-gray-900 px-3 py-2 hover:bg-gray-700">
            <li className="border border-gray-900 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">texttexttext</li>
            <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-700">texttexttext</li>
            <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-700">texttexttext</li>
            <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-700">texttexttext</li>
            <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-700">texttexttext</li>
          </ul>
        </div>
      )}
    </div>
  );
}
