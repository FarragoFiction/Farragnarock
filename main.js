
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const electron = require('electron')
const http = require('http');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var path = require('path')

const Menu = electron.Menu;


function createWindow () {

  // Create the browser window.
   mainWindow = new BrowserWindow({width: 1400, height: 1000,      icon: path.join(__dirname, 'icon.ico')})
   mainWindow.maximize();
   mainWindow.zoomFactor = (0.05);

  // and load the index.html of the app.
  mainWindow.loadFile('title.html');

  const template = [
    {
      label: 'Think Like a Waste',
      submenu: [
        {label: "You Know You Want To",
        click: (item, focusedWindow) => {
            mainWindow.toggleDevTools();
        }
        }
      ]
    }
    ];
  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu)


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//experimenting to see if running a tiny server is viable for achievements
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});