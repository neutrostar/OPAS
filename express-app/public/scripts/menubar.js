const electron = require('electron');
const {remote} = electron;
const {BrowserWindow, app} = remote;
let AboutWindow;
let PreferenceWindow;
let UpdateWindow;

//Creating Help->About
function CreateAboutWindow(){
    AboutWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "About-OPAS",
        frame: false,
        parent: remote.getCurrentWindow(),
        modal: true,
        show: false
    });
    var theUrl = 'file://' + __dirname + '/src/scripts/html/about.html';
    AboutWindow.loadURL(theUrl);
    AboutWindow.once('ready-to-show', ()=>{
        AboutWindow.show();
    });
    AboutWindow.on('closed', function () {
       AboutWindow = null;
    });
}

//Creating File->Preferences
function CreatePreferencesWindow(){
    PreferenceWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Preferences",
        frame: false,
        parent: remote.getCurrentWindow(),
        modal: true,
        show: false
    });
    var theUrl = 'file://' + __dirname + '/src/scripts/html/preferences.html';
    PreferenceWindow.loadURL(theUrl);
    PreferenceWindow.once('ready-to-show', ()=>{
        PreferenceWindow.show();
    });
    PreferenceWindow.on('closed', function(){
        PreferenceWindow = null;
    })
}

//Creating Help->Updates
function CreateUpdateWindow(){
    UpdateWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        parent: remote.getCurrentWindow(),
        modal: true,
        show: false
    });
    var theUrl = 'file://' + __dirname + '/src/scripts/html/updates.html';
    UpdateWindow.loadURL(theUrl);
    UpdateWindow.once('ready-to-show', ()=>{
        UpdateWindow.show();
    });
    UpdateWindow.on('closed', function(){
        UpdateWindow = null;
    })
}

function OpenOPASGithub(){
    require("shell").openExternal("https://github.com/neutrostar/OPAS");
}
//Closing the window
function CloseWindow(){
    remote.getCurrentWindow().close();
}