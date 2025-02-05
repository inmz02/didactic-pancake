/* eslint-disable react/prop-types */
import { useState } from "react";
import { getTranslation } from "./translations";
import { IoMdArrowDropleft } from "react-icons/io";

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
  selectedTheme,
  setSelectedTheme,
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

  const themeOptions = [
    { id: "blue", label: getTranslation("MenuVocab.Theme.Colours.Blue", lang) },
    { id: "pink", label: getTranslation("MenuVocab.Theme.Colours.Pink", lang) },
    {
      id: "green",
      label: getTranslation("MenuVocab.Theme.Colours.Green", lang),
    },
    {
      id: "purple",
      label: getTranslation("MenuVocab.Theme.Colours.Purple", lang),
    },
    {
      id: "orange",
      label: getTranslation("MenuVocab.Theme.Colours.Orange", lang),
    },
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

  const handleThemeClick = (themeOptionId) => {
    setSelectedTheme(themeOptionId);
    setSelectedTheme(themeOptionId); // Update the app's language
    onClose(); // Close the menu after selecting an option
  };

  const handleSizeClick = (sizeOptionId) => {
    setSelectedSize(sizeOptionId);
    // Send a message to the main process to resize the window
    window.electronAPI.resizeWindow(sizeOptionId);
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
          {/* Theme with Submenu */}
          <li
            className="menuPopupMain"
            onMouseEnter={() => handleMouseEnter("theme")}
            onMouseLeave={handleMouseLeave}
          >
            {/* {getTranslation("MenuVocab.Theme", lang)} */}

            {!hoveredMenu || hoveredMenu !== "theme" ? (
              getTranslation("MenuVocab.Theme", lang)
            ) : (
              <div className="flex items-center -ml-1">
                <IoMdArrowDropleft />
                {getTranslation("MenuVocab.Theme", lang)}
              </div>
            )}

            {hoveredMenu === "theme" && (
              <div className="absolute -top-8 right-full w-32 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
                  {themeOptions.map((option) => (
                    <li
                      key={option.id}
                      className={`menuPopUpSub`}
                      onClick={() => handleThemeClick(option.id)}
                    >
                      {selectedTheme === option.id && <p>✔</p>}
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          {/* Language with Submenu */}
          <li
            className="menuPopupMain"
            onMouseEnter={() => handleMouseEnter("language")}
            onMouseLeave={handleMouseLeave}
          >

            {!hoveredMenu || hoveredMenu !== "language" ? (
              getTranslation("MenuVocab.Language", lang)
            ) : (
              <div className="flex items-center -ml-1">
                <IoMdArrowDropleft />
                {getTranslation("MenuVocab.Language", lang)}
              </div>
            )}

            {hoveredMenu === "language" && (
              <div className="absolute top-0 right-full w-32 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
                  {languageOptions.map((option) => (
                    <li
                      key={option.id}
                      className={`menuPopUpSub`}
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
            className="menuPopupMain"
            onMouseEnter={() => handleMouseEnter("date")}
            onMouseLeave={handleMouseLeave}
          >
            {!hoveredMenu || hoveredMenu !== "date" ? (
              getTranslation("MenuVocab.DateFormat", lang)
            ) : (
              <div className="flex items-center -ml-1">
                <IoMdArrowDropleft />
                {getTranslation("MenuVocab.DateFormat", lang)}
              </div>
            )}
            {hoveredMenu === "date" && (
              <div className="absolute bottom-[-33px] right-full w-36 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
                  {dateFormatOptions.map((option) => (
                    <li
                      key={option.id}
                      className={`menuPopUpSub`}
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
            className="menuPopupMain"
            onMouseEnter={() => handleMouseEnter("size")}
            onMouseLeave={handleMouseLeave}
          >
            {!hoveredMenu || hoveredMenu !== "size" ? (
              getTranslation("MenuVocab.Size", lang)
            ) : (
              <div className="flex items-center -ml-1">
                <IoMdArrowDropleft />
                {getTranslation("MenuVocab.Size", lang)}
              </div>
            )}
            {hoveredMenu === "size" && (
              <div className="absolute bottom-0 right-full w-32 bg-[#eeeeee] shadow-md border border-[#c5c5c5]">
                <ul>
                  {sizeOptions.map((option) => (
                    <li
                      key={option.id}
                      className={`menuPopUpSub`}
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
