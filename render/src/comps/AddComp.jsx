/* eslint-disable react/prop-types */
import { RiArrowRightUpFill } from "react-icons/ri";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { MenuPopup } from "./MenuPopup";
import { getTranslation } from "./translations";

export const AddComp = ({
  addItem,
  lang,
  setLang,
  selectedDateFormat,
  setSelectedDateFormat,
}) => {
  const [input, setInput] = useState("");
  const [menuVisible, setMenuVisible] = useState(false); // Tracks menu visibility
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedSize, setSelectedSize] = useState("def");
  const [selectedTheme, setSelectedTheme] = useState("blue");
  const menuRef = useRef(null);

  const handleAdd = () => {
    if (input.trim() !== "") {
      addItem(input);
      setInput(""); // Clear the input after adding
    } 
  };

  // 🐶 Press the enter key to push the item up!
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Close the menu when clicking outside
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#eeeeee] gap-1 flex flex-row overflow-none h-[28px] rounded-b-sm m-1 mr-[5px]">
      {/* The input container bg-[#eeeeee] */}
      <div className="inputContainer flex-grow">
        <input
          type="text"
          className="bg-transparent outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getTranslation("Misc.AddTaskPlaceholder", lang)}
          // placeholder="Enter a new to-do. . ."
        />
      </div>

      {/* The Add/Send button */}
      <div
        className="flex myIcons border border-[#b5b5b5] cursor-pointer h-[27px]"
        onClick={handleAdd}
      >
        <div
          className="h-[25px] w-[27px] inner-con flex items-center justify-center text-xl"
          title={getTranslation("Misc.AddToList", lang)}
        >
          <RiArrowRightUpFill />
        </div>
      </div>

      <div
        className="flex myIcons border border-[#b5b5b5] cursor-pointer h-[27px]"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click outside closing immediately
          toggleMenu();
        }}
      >
        <div
          className="h-[25px] w-[20px] inner-con flex items-center justify-center text-[15px]"
          title={getTranslation("Misc.Menu", lang)}
        >
          <FaEllipsisVertical />

          {/* Menu Popup */}
          {menuVisible && (
            <MenuPopup
              onClose={() => setMenuVisible(false)}
              lang={lang}
              setLang={setLang}
              selectedDateFormat={selectedDateFormat}
              setSelectedDateFormat={setSelectedDateFormat}
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
            />
          )}
        </div>
      </div>
    </div>
  );
};
