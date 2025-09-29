import { useState, useRef, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-9 h-9 mr-32 bg-transparent border-none text-white"
      >
        <AccountCircleIcon className="text-white" sx={{ fontSize: 30 }} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-10 right-0 bg-gray-800 text-white p-2 rounded shadow-lg z-50">
          <ul className="flex flex-col list-none m-0 p-0">
            <li className="border border-gray-900 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">texttexttext</li>
            <li className="rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">texttexttext</li>
            <li className="rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">texttexttext</li>
            <li className="rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">texttexttext</li>
            <li className="rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">texttexttext</li>
          </ul>
        </div>
      )}
    </div>
  );
}
