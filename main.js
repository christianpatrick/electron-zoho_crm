const {app, Menu, BrowserWindow, shell, clipboard} = require('electron')
const contextMenu = require('electron-context-menu')

const path = require('path')
const url = require('url')
var fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

	// Create the browser window.
	mainWindow = new BrowserWindow({
		show: false,
		titleBarStyle: 'hiddenInset',
		width: 1000,
		minWidth: 600,
		height: 600,
		minHeight: 400,
		webPreferences: {
			javascript: true,
			plugins: true,
			nodeIntegration: false,
			affinity: 'zoho_crm-main',
		},
	})

	// add context menu support
	contextMenu();

	mainWindow.loadURL('https://crm.zoho.com/')

	// For Development
	// mainWindow.loadURL('https://developer.zoho.com/crm/')

	mainWindow.webContents.on('did-finish-load', function() {

		fs.readFile(__dirname+ '/src/css/main.css', "utf-8", function(error, data) {
			if (!error) {
				mainWindow.webContents.insertCSS(data)
			}
		})

		fs.readFile(__dirname+ '/src/css/search.css', "utf-8", function(error, data) {
			if (!error) {
				mainWindow.webContents.insertCSS(data)
			}
		})

		mainWindow.show()

	})

	mainWindow.webContents.on('did-navigate', function() {

		fs.readFile(__dirname+ '/src/css/main.css', "utf-8", function(error, data) {
			if (!error) {
				mainWindow.webContents.insertCSS(data)
			}
		})

		fs.readFile(__dirname+ '/src/css/search.css', "utf-8", function(error, data) {
			if (!error) {
				mainWindow.webContents.insertCSS(data)
			}
		})

	})

	mainWindow.webContents.on('new-window', function(event, url) {

		// event.preventDefault()

		// check if sending an email
		if(url.indexOf('send-mail') != -1) {}
		else {
			shell.openExternal(url)
		}

	});

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		mainWindow = null
	})

	mainWindow.on('close', function(e){
		e.preventDefault()
		mainWindow.hide()
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
			mainWindow.loadURL('https://crm.zoho.com/')
		  },
		},
		{
		  label: 'SalesInbox',
		  accelerator: 'Shift+CmdOrCtrl+I',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/salesinbox/')
		  },
		},
		{
		  label: 'Feeds',
		  accelerator: 'Shift+CmdOrCtrl+F',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/tab/Feeds/')
		  },
		},
		{
		  label: 'Activities',
		  accelerator: 'Shift+CmdOrCtrl+E',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/tab/Activities/')
		  },
		},
		{
		  label: 'Visits',
		  accelerator: 'Shift+CmdOrCtrl+V',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/tab/Visits/')
		  },
		},
		{
		  type: 'separator',
		},
		{
		  label: 'Leads',
		  accelerator: 'Shift+CmdOrCtrl+L',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/tab/Leads/')
		  },
		},
		{
		  label: 'Accounts',
		  accelerator: 'Shift+CmdOrCtrl+A',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/tab/Accounts/')
		  },
		},
		{
		  label: 'Contacts',
		  accelerator: 'Shift+CmdOrCtrl+C',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/tab/Contacts/')
		  },
		},
		{
		  label: 'Deals',
		  accelerator: 'Shift+CmdOrCtrl+D',
		  click: () => {
			mainWindow.loadURL('https://crm.zoho.com/crm/tab/Potentials/')
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
	createMenu()
	createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('before-quit', function () {
	mainWindow.destroy()
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	mainWindow.show()
})
