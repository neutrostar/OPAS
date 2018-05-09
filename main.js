const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let splashWindow;
let addWindow;



app.on('ready', function(){
    MakeSplashWindow();
    //splashWindow.close();
    mainWindow = new BrowserWindow({
        frame: false,
        minHeight:720,
        minWidth:1280,
        resizable: false
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
    });
    if(process.platform=='darwin'){
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
        Menu.setApplicationMenu(mainMenu);
    }
});

const mainMenuTemplate = [
    {

<<<<<<< HEAD
    // help menu
    label: 'Help',
    submenu:[


      // file menu
      label: 'File',
      submenu:[
=======
    // file menu
    label: 'File',
    submenu:[
>>>>>>> parent of f1ee009... Activated assignment link in student module

      {
        label:'Contact Us',
        click(){
          //file yet to be added
          ;
        }
      },
      {
        label:'About',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Updates',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]





    // Edit menu
    label: 'Edit',
    submenu:[

      {
        label:'Contact Us',
        click(){
          //file yet to be added
          ;
        }
      },
      {
        label:'About',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Updates',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]





    // View menu
    label: 'View',
    submenu:[

      {
        label:'Contact Us',
        click(){
          //file yet to be added
          ;
        }
      },
      {
        label:'About',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Updates',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]



    // Help menu
    label: 'Help',
    submenu:[

      {
        label:'Contact Us',
        click(){
          //file yet to be added
          ;
        }
      },
      {
        label:'About',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Updates',
        click(){
          // file yet to be added
          ;
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]




<<<<<<< HEAD
function MakeSplashWindow(){
    splashWindow = new BrowserWindow(({
        frame: false,
        height: 300,
        width: 400
    }));
    splashWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));


if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push(
    {
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
        ]
    }
  );


=======
  }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
>>>>>>> parent of f1ee009... Activated assignment link in student module
}
