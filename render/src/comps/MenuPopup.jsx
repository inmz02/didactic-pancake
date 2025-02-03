import { useState } from "react";
import { getTranslation } from "./translations";

export const MenuPopup = ({
  onClose,
  lang,
  setLang,
  selectedDateFormat,
  setSelectedDateFormat,
  selectedLang,
  setSelectedLang,
  selectedSize,
  setSelectedSize,
}) => {
  
  const [hoveredMenu, setHoveredMenu] = useState(null);

    const dateFormatOptions = [
      {
        id: "englishOnly",
        label: getTranslation("MenuVocab.EnglishOnly", lang),
      },
      {
        id: "chineseOnly",
        label: getTranslation("MenuVocab.ChineseOnly", lang),
      },
      { id: "koreanOnly", label: getTranslation("MenuVocab.KoreanOnly", lang) },
      {
        id: "chineseKorean",
        label: getTranslation("MenuVocab.ChineseAndKorean", lang),
      },
    ];

  const languageOptions = [
    { id: "zh", label: getTranslation("MenuVocab.LanguageChinese", lang) },
    { id: "en", label: getTranslation("MenuVocab.LanguageEnglish", lang) },
    { id: "ko", label: getTranslation("MenuVocab.LanguageKorean", lang) },
  ];

  const sizeOptions = [
    { id: "sm", label: getTranslation("MenuVocab.SizeSmall", lang) },
    { id: "def", label: getTranslation("MenuVocab.SizeDefault", lang) },
    { id: "lg", label: getTranslation("MenuVocab.SizeLarge", lang) },
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
    setSelectedDateFormat(dateFormatOptionId);
    onClose(); // Close the menu after selecting an option
  };

  const handleLangClick = (langOptionId) => {
    setSelectedLang(langOptionId);
    setLang(langOptionId); // Update the app's language
    onClose(); // Close the menu after selecting an option
  };

  const handleSizeClick = (sizeOptionId) => {
    setSelectedSize(sizeOptionId);
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
          <li className="p-2 hover:bg-[#6d7a945e] cursor-pointer">
            {getTranslation("MenuVocab.Theme", lang)}
          </li>

          {/* Language with Submenu */}
          <li
            className="p-2 hover:bg-[#6d7a945e] cursor-pointer relative"
            onMouseEnter={() => handleMouseEnter("language")}
            onMouseLeave={handleMouseLeave}
          >
            {getTranslation("MenuVocab.Language", lang)}
            {hoveredMenu === "language" && (
              <div className="absolute top-0 right-full w-32 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
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
            {getTranslation("MenuVocab.DateFormat", lang)}
            {hoveredMenu === "date" && (
              <div className="absolute bottom-[-33px] right-full w-36 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
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
            {getTranslation("MenuVocab.Size", lang)}
            {hoveredMenu === "size" && (
              <div className="absolute bottom-0 right-full w-32 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
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
