import { FaRegWindowMinimize, FaRegWindowMaximize } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
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
          title="Minimise"
        >
          <FaRegWindowMinimize onClick={minimizeWindow} />
        </div>
        <div className="border border-[#b5b5b5] border-r-0 border-l-0 svg-con">
          <FaRegWindowMaximize />
        </div>
        <div
          className="border border-[#b5b5b5] svg-con"
          onClick={closeApp}
          title="Close"
        >
          <RxCross2 onClick={closeApp} />
        </div>
      </div>
    </div>
  );
};

export default Header;
