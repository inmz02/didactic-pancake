import { useState } from "react";

export const MenuPopup = ({
  onClose,
  selectedDateFormat,
  setSelectedDateFormat,
  selectedLang,
  setSelectedLang,
  selectedSize,
  setSelectedSize,
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

  // List of "Languages" options
  const languageOptions = [
    { id: "cn", label: "Chinese" },
    { id: "eng", label: "English" },
    { id: "kor", label: "Korean" },
  ];

  // List of "Languages" options
  const sizeOptions = [
    { id: "sm", label: "Small" },
    { id: "def", label: "Default" },
    { id: "lg", label: "Large" },
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
  const handleDateFormatClick = (dateFormatOptionId) => {
    setSelectedDateFormat(dateFormatOptionId); // Update the selected option
    onClose(); // Close the menu after selecting an option
  };

  const handleLangClick = (langOptionId) => {
    setSelectedLang(langOptionId); // Update the selected option
    onClose(); // Close the menu after selecting an option
  };
  const handleSizeClick = (sizeOptionId) => {
    setSelectedSize(sizeOptionId); // Update the selected option
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
              <div className="absolute top-0 right-full w-32 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
                  {/* Render "Date Format" options dynamically */}
                  {languageOptions.map((option) => (
                    <li
                      key={option.id}
                      className={`p-2 hover:bg-[#6d7a945e] cursor-pointer flex gap-[6px]`}
                      onClick={() => handleLangClick(option.id)}
                    >
                      {selectedLang === option.id && <p>✔</p>}
                      {option.label}
                    </li>
                  ))}
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
              <div className="absolute bottom-[-33px] right-full w-36 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
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
              <div className="absolute bottom-0 right-full w-32 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
                  {/* Render "Date Format" options dynamically */}
                  {sizeOptions.map((option) => (
                    <li
                      key={option.id}
                      className={`p-2 hover:bg-[#6d7a945e] cursor-pointer flex gap-[6px]`}
                      onClick={() => handleSizeClick(option.id)}
                    >
                      {selectedSize === option.id && <p>✔</p>}
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
