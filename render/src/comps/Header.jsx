import { FaRegWindowMinimize, FaRegWindowMaximize } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { getTranslation } from "./translations";

const Header = ({ lang }) => {
  const minimizeWindow = () => {
    window.electronAPI.minimizeToTray();
  };
  const closeApp = () => {
    window.electronAPI.closeApp();
  };

  return (
    <div
      id="myHeader"
      className="flex justify-between items-center p-1 bg-[#b2c6f1] border-b border-[#b5b5b5] h-[26px] rounded-t-sm"
    >
      <div className="flex gap-[6px] items-center">
        <img src="../src/icon.gif" alt="" className="h-fit w-[18px]" />
        <h1 className="font-medium text-[#46586E]">e2Do</h1>
      </div>
      <div className="flex myIcons h-full text-base ">
        <div
          className="border border-[#b5b5b5] svg-con"
          onClick={minimizeWindow}
          title={getTranslation("Header.Minimise", lang)}
        >
          <FaRegWindowMinimize onClick={minimizeWindow} />
        </div>
        <div className="border border-[#b5b5b5] border-r-0 border-l-0 svg-con">
          <FaRegWindowMaximize />
        </div>
        <div
          className="border border-[#b5b5b5] svg-con"
          onClick={closeApp}
          title={getTranslation("Header.Close", lang)}
        >
          <RxCross2 onClick={closeApp} />
        </div>
      </div>
    </div>
  );
};

export default Header;
