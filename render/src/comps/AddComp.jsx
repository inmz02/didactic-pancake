import { RiArrowRightUpFill } from "react-icons/ri";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";

export const AddComp = ({ addItem }) => {
  const [input, setInput] = useState("");

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
          placeholder="Enter a new to-do. . ."
        />
      </div>

      {/* The Add/Send button */}
      <div
        className="flex myIcons border border-[#b5b5b5] cursor-pointer h-[27px]"
        onClick={handleAdd}
      >
        <div className="h-[25px] w-[27px] inner-con flex items-center justify-center text-xl" title="Add to list">
          <RiArrowRightUpFill />
        </div>
      </div>

      <div
        className="flex myIcons border border-[#b5b5b5] cursor-pointer h-[27px]"
        onClick={handleAdd}
      >
        <div className="h-[25px] w-[20px] inner-con flex items-center justify-center text-[15px]" title="Menu">
          <FaEllipsisVertical />
        </div>
      </div>
    </div>
  );
};
