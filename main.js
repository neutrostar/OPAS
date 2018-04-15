const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        frame: false,
        backgroundColor: "#ff00aa",
        isResizable: false
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    if(!mainWindow.isFullScreen()){
        mainWindow.setFullScreen(true);
    }
    // mainWindow.webContents.on('did-finish-load', function() {
    //     mainWindow.show();
    // });
    mainWindow.on('closed', function(){
        app.quit();
    })
});
