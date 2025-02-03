const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  resizeWindow: (size) => ipcRenderer.send("resize-window", size),
  minimizeToTray: () => ipcRenderer.send("minimize-to-tray"),
  closeApp: () => ipcRenderer.send("close-app"),
});

ipcRenderer.on("save-size", (_, size) => {
  localStorage.setItem("selectedSize", size);
});

