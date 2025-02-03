import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export const MenuPopup = ({
  onClose,
  selectedDateFormat,
  setSelectedDateFormat,
}) => {
  // Track hovered parent item for submenus
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // List of "Date Format" options
  const dateFormatOptions = [
    { id: "chineseOnly", label: "Chinese Only" },
    { id: "koreanOnly", label: "Korean Only" },
    { id: "chineseKorean", label: "Chinese & Korean" },
    { id: "englishOnly", label: "English Only" },
  ];

  // Show submenu when hovering
  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  // Hide submenu
  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  // Set the clicked option as selected
  const handleDateFormatClick = (optionId) => {
    setSelectedDateFormat(optionId); // Update the selected option
    onClose(); // Close the menu after selecting an option
  };

  return (
    <div>
      <div
        className="absolute bottom-[35px] right-[5px] w-[105px] bg-[#eeeeee] shadow-md text-xs border border-[#c5c5c5] z-10"
        onMouseLeave={onClose}
        title=""
      >
        <ul className="text-black relative">
          {/* Theme */}
          <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">Theme</li>

          {/* Language with Submenu */}
          <li
            className="p-2 hover:bg-[#6d7a945e] cursor-pointer relative"
            onMouseEnter={() => handleMouseEnter("language")}
            onMouseLeave={handleMouseLeave}
          >
            Language
            {hoveredMenu === "language" && (
              <div className="absolute top-0 right-full w-32 bg-[#eeeeee] shadow-lg border border-[#c5c5c5]">
                <ul>
                  <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">
                    English
                  </li>
                  <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">
                    Korean
                  </li>
                  <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">
                    Chinese
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Date Format with Submenu */}
          <li
            className="p-2 hover:bg-[#6d7a945e] cursor-pointer relative"
            onMouseEnter={() => handleMouseEnter("date")}
            onMouseLeave={handleMouseLeave}
          >
            Date Format
            {hoveredMenu === "date" && (
              <div className="absolute bottom-[-33px] right-full w-36 bg-[#eeeeee] shadow-lg border border-[#c5c5c5]">
                <ul>
                  {/* Render "Date Format" options dynamically */}
                  {dateFormatOptions.map((option) => (
                    <li
                      key={option.id}
                      className={`p-2 hover:bg-[#6d7a945e] cursor-pointer flex gap-[6px]`}
                      onClick={() => handleDateFormatClick(option.id)}
                    >
                      {selectedDateFormat === option.id && <p>✔</p>}
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          {/* Size with Submenu */}
          <li
            className="p-2 hover:bg-[#6d7a945e] cursor-pointer relative"
            onMouseEnter={() => handleMouseEnter("size")}
            onMouseLeave={handleMouseLeave}
          >
            Size
            {hoveredMenu === "size" && (
              <div className="absolute bottom-0 right-full w-32 bg-[#eeeeee] shadow-lg border border-[#c5c5c5]">
                <ul>
                  <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">
                    Small
                  </li>
                  <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">
                    Default
                  </li>
                  <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">
                    Large
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
