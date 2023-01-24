const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false,
  });

  // and load the index.html of the app.
  win.loadFile("src/index.html");

  // Open the DevTools.
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
