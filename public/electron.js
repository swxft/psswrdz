// require electron and destructure the app object and Browser Window class from it
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
// initialize the mainWindow variable globally
// Place holders for mainWindow so it doesn't get garbage collected
let mainWindow = null;

// set Icon path, if any
const iconPath = path.join(__dirname, 'images', process.platform === 'win32' ? 'icon.ico' : 'icon.png');


// Create an application menu
const menuTemplate = [];
// We can ask the OS for default menus by role(Electron has in built roles), and they will be built for us
const appMenu = { role: 'appMenu' };
const fileMenu = { role: 'fileMenu' }
const editMenu = { role: 'editMenu' };
const windowMenu = { role: 'windowMenu' };

const devMenu = {
  label: 'Options',
  submenu: [
    { role: 'toggleDevTools', label: 'Dev Tools', accelerator: 'F12' },
    { role: 'reload' },
    { role: 'forceReload' },
  ],
}


// Build menu template
if (process.platform === 'darwin') {
  menuTemplate.push(appMenu);
} else {
  menuTemplate.push(fileMenu);
}
menuTemplate.push(editMenu, windowMenu);

// the dev menu only shows when app is not in production
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push(devMenu);
}

// Build the menu from the template
const menu = Menu.buildFromTemplate(menuTemplate);

// And set it for the application
Menu.setApplicationMenu(menu);

async function createWindow() {
       //create new Browser window with config options 
       mainWindow = new BrowserWindow({
        // set the height and width of the window
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            // disable background throttling when the window is not focused
            backgroundThrottling: false,
        },
        icon: iconPath,

        // set the default window title. Remember that if the <title> tag
        // in the html document that is loaded by loadUrl is set, this
        //property will be ignored
        title: 'My App title',
    });


    // load index.html document from the react app (make sure to put in the right file path)
    mainWindow.loadURL(`file://${__dirname}/public/index.html`);
    

  /*  Use this if you want the app window to start with dev tools open   
if (process.env.NODE_ENV !== 'production') {
        mainWindow.webContents.openDevTools();
    } 
*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Define any IPC or other custom functionality below here
// Remember the four objects to use when 
//communicating between processes(in this case, your react -renderer process- and electron process - main process)
/* 
  - ipcRenderer.send(send messages/data from react process to electron app process)
  - ipcMain.on(receive messages/data from react process)
  - mainWindowwebContents.send(send messages/data from elecrton app process to react process)
  - ipcRenderer.on(receive messages/data from electron app) 
  */

// Sample: To receive message from react side:

ipcMain.on('eventToListenTo', (event, messageReceived) => {
    // do stuff here
})


// Sample: To send message to react side

let messageToSend = 'I am sending Message'
mainWindow.webContents.send('eventToListen', messageToSend)

