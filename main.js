const { app, BrowserWindow, Tray, Menu, ipcMain } = require("electron");
const path = require("path");

let mainWindow;
let tray;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 360,
    height: 380,
    title: "Electron Widget",
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
    resizable: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Add this line
      contextIsolation: true, // Enforces security best practices
      nodeIntegration: false, // Disable Node.js integration in the renderer
    },
  });

  // Set minimum and maximum sizes
  mainWindow.setMinimumSize(320, 300); // Min width, fixed height
  mainWindow.setMaximumSize(410, 400); // Max width, fixed height

  mainWindow.loadURL("http://localhost:5173");
}

// The tray stuff on the taskbar
function createTray() {
  const iconPath = path.join(__dirname, "icon.png"); 
  tray = new Tray(iconPath);

  // Tooltip for the tray icon
  tray.setToolTip("e2Do");

  // Tray context menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "【 Show 】",
      click: () => {
        mainWindow.show(); // Restore the window
      },
    },
    {
      label: "【 Minimise 】",
      click: () => {
        mainWindow.hide(); // Hides the window
      },
    },
    {
      label: "【 Quit 】",
      click: () => {
        app.quit(); // Quit the app completely
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  // Handle tray icon click (restore the widget)
  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

// Listening Events
ipcMain.on("minimize-to-tray", () => {
  mainWindow.hide(); // Hide the window (minimized to tray)
});
ipcMain.on("close-app", () => {
  app.quit(); // Hide the window (minimized to tray)
});


app.whenReady().then(() => {
  createMainWindow();
  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
