const { app, BrowserWindow, Menu, ipcMain } = require("electron");

let mainWindow;
let loginWindow;

const isMac = process.env === "darwin" ? true : false;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Secret Chat App",
    height: 600,
    width: 1000,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
    darkTheme: true,
  });

  mainWindow.loadFile("./app/index.html");
}

function createLogin() {
  loginWindow = new BrowserWindow({
    resizable: false,
    height: 600,
    width: 750,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  loginWindow.loadFile("./app/login.html");
}

app.on("ready", () => {
  createLogin();
  //   createWindow();
  //   const mainMenu = Menu.buildFromTemplate(menu);
  //   Menu.setApplicationMenu(mainMenu);
  loginWindow.on("ready", () => {});
});

// const menu = [
//   ...(isMac ? [{ role: "appMenu" }] : []),
//   {
//     label: "App",
//     submenu: [
//       {
//         label: "Quit",
//         click: () => {
//           app.quit();
//         },
//       },
//     ],
//   },
// ];

ipcMain.on("secret-code", (e, data) => {
  createWindow();
  mainWindow.webContents.send("main-secret-code", data);
  loginWindow.close();
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows.length === 0) {
    loginWindow();
  }
});
