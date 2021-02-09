const { app, BrowserWindow, Menu } = require("electron");

let mainWindow;

const isMac = process.env === "darwin" ? true : false;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Secret Chat App",
    height: 800,
    width: 1000,
    resizable: true,
  });

  mainWindow.loadFile("./app/login.html");
}

app.on("ready", () => {
  createWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on("ready", () => {});
});

const menu = [
    ...(isMac ? [{role: 'appMenu'}] : []),
  {
    label: "App",
    submenu: [
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ],
  },
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows.length === 0) {
    createWindow();
  }
});
