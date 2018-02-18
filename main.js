const {app, Menu, BrowserWindow, shell, clipboard} = require('electron')

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
  mainWindow.loadURL('https://accounts.zoho.com/signin?servicename=ZohoCRM')

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS($cssInclude)
  })

  mainWindow.webContents.on('did-navigate', function() {
    mainWindow.webContents.insertCSS($cssInclude)
  })


  mainWindow.webContents.on('dom-ready', function(e) {
    mainWindow.webContents.executeJavaScript('document.getElementById("tabgrouparrow").style.marginLeft = "75px";')
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

function createMenu() {
  // Creates the App Menu
  if (Menu.getApplicationMenu()) {
    return;
  }

  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut',
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy',
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste',
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Back',
          accelerator: 'Shift+CmdOrCtrl+Left',
          click: () => {
            mainWindow.webContents.goBack()
          },
        },
        {
          label: 'Forward',
          accelerator: 'Shift+CmdOrCtrl+Right',
          click: () => {
            mainWindow.webContents.goForward()
          },
        },
        {
          label: 'Reload',
          accelerator: 'Shift+CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          },
        },
      ],
    },
    {
      label: 'Go',
      submenu: [
        {
          label: 'Search',
          accelerator: 'Shift+CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("topbandSearchIcon").click()')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Home',
          accelerator: 'Shift+CmdOrCtrl+Space',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Home").click()')
          },
        },
        {
          label: 'SalesInbox',
          accelerator: 'Shift+CmdOrCtrl+I',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_SalesInbox").click()')
          },
        },
        {
          label: 'Feeds',
          accelerator: 'Shift+CmdOrCtrl+F',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Feeds").click()')
          },
        },
        {
          label: 'Activities',
          accelerator: 'Shift+CmdOrCtrl+E',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Activities").click()')
          },
        },
        {
          label: 'Visits',
          accelerator: 'Shift+CmdOrCtrl+V',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Visits").click()')
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Leads',
          accelerator: 'Shift+CmdOrCtrl+L',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Leads").click()')
          },
        },
        {
          label: 'Accounts',
          accelerator: 'Shift+CmdOrCtrl+A',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Accounts").click()')
          },
        },
        {
          label: 'Contacts',
          accelerator: 'Shift+CmdOrCtrl+C',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Contacts").click()')
          },
        },
        {
          label: 'Deals',
          accelerator: 'Shift+CmdOrCtrl+D',
          click: () => {
            mainWindow.webContents.executeJavaScript('document.getElementById("tab_Potentials").click()')
          },
        },
      ],
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: `Built by christianpatrick`,
          click: () => {
            shell.openExternal('https://github.com/christianpatrick/electron-zoho_crm');
          },
        },
        {
          label: 'Have an Issue?',
          click: () => {
            shell.openExternal('https://github.com/christianpatrick/electron-zoho_crm/issues');
          },
        },
      ],
    },
  ];

  // const { submenu } = template[1];
  // submenu.splice(submenu.length - 1, 1);

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'Electron',
      submenu: [
        {
          label: 'Services',
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide App',
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    });
    template[3].submenu.push(
      {
        type: 'separator',
      },
      {
        label: 'Bring All to Front',
        role: 'front',
      },
    );
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow()
  createMenu()
})
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
