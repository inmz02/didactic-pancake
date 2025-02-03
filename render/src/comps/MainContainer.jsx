import { MyDate } from "./MyDate";
import { TiDelete } from "react-icons/ti";
import { useState, useEffect, useRef } from "react";
import { getTranslation } from "./translations";

export const MainContainer = ({
  items,
  toggleCompletion,
  setItems,
  lang,
  selectedDateFormat, // ✅ Ensure selectedDateFormat is received
  setSelectedDateFormat,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedItemRef = useRef(null);

  // 🐼 The Delete Button Functionality
  const handleDelete = (index) => {
    // Remove the item from the items array
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    // Update localStorage with the modified items array
    localStorage.setItem("todo-items", JSON.stringify(updatedItems));

    // Deselect the item after deletion
    setSelectedIndex(null);
  };

  // 🫎 The Selecting an Item Functionality
  const handleItemClick = (index) => {
    // Toggle selection; if already selected, unselect it
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  // 🐧 Unselect When Clicking Anywhere Else
  const handleClickOutside = (e) => {
    // Check if the click is outside the currently selected item
    if (
      selectedItemRef.current &&
      !selectedItemRef.current.contains(e.target)
    ) {
      setSelectedIndex(null); // Deselect the item
    }
  };

  // 🦥 The useEffect for Unselecting When Clicking Anywhere Else
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-grow border-t border-white bg-[#eeeeee] p-1 pb-0 flex flex-col overflow-auto">
      <div className="h-full bg-black text-white p-2 flex flex-col gap-3 overflow-auto border-2 border-t-[#b5b5b5] border-l-[#b5b5b5] border-b-white border-r-white myHiddenScrollbar">
        
        {/* ✅ Pass selectedDateFormat to MyDate */}
        <MyDate selectedDateFormat={selectedDateFormat} />

        {/* Display the "Empty list..." text if no items exist */}
        {items.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            {getTranslation("Misc.EmptyList", lang)}
          </p>
        )}
        {/* Displaying the List Items */}
        <div className="myHiddenScrollbar">
          <div className="flex flex-col gap-2 w-full p-1">
            {items.map((item, index) => (
              <div
                key={index}
                ref={selectedIndex === index ? selectedItemRef : null}
                className={`flex grow listItem ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(index);
                }}
              >
                <div className="flex-grow mr-[5px]">
                  <span
                    className="checkbox cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompletion(index);
                    }}
                  >
                    [{" "}
                    <span className={item.completed ? "completed" : ""}>
                      {item.completed ? "x" : " "}
                    </span>{" "}
                    ] -
                  </span>{" "}
                  <span className="myListItem">{item.text}</span>
                </div>

                {/* Delete Button Appears Only When the List Item Is Selected */}
                {selectedIndex === index && (
                  <div
                    className="w-3 flex flex-col gap-2 items-center text-right text-base cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    <TiDelete
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
