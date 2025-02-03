export const initializeWindowSize = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const savedSize = localStorage.getItem("selectedSize") || "def";
    window.electronAPI.resizeWindow(savedSize);
  });
};
