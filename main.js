const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    width: 1000,
    minWidth: 600,
    height: 600,
    minHeight: 400,
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: false,
    },
  })

  $cssInclude = '#tabLayer{position:fixed;margin-top:-5px;height:45px;-webkit-app-region:drag;}.bodycontainer{padding-top:40px;}.newMenuTable{display:block;max-height:45px;}#qIconDiv{position:absolute;right:0;}';

  // and load the index.html of the app.
  mainWindow.loadURL('https://crm.zoho.com/')

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS($cssInclude)
  })

  mainWindow.webContents.on('did-navigate', function() {
    mainWindow.webContents.insertCSS($cssInclude)
  })


  mainWindow.webContents.on('dom-ready', function(e) {
    mainWindow.webContents.executeJavaScript('document.getElementById("tabgrouparrow").style.marginLeft = "75px";')
    // mainWindow.webContents.executeJavaScript('window.document.body.innerHTML += `<div style="-webkit-app-region:drag;position:absolute;top:0;left:0;right:0;height: 40px;width:100%;"></div>`')
  })
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
