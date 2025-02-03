const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimizeToTray: () => ipcRenderer.send("minimize-to-tray"),
  closeApp: () => ipcRenderer.send("close-app"),
});
