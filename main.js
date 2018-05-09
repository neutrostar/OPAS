const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;


process.env.NODE_ENV = 'Development';

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
        resizable: false,
        preload: __dirname+'/hello.html'
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

    mainWindow.getNativeWindowHandle()
});

const mainMenuTemplate = [
    {
<<<<<<< HEAD
    // help menu
    label: 'Help',
    submenu:[
=======

      // file menu
      label: 'File',
      submenu:[
>>>>>>> f1ee009ca857f27cb6ff4ebacc61a57f071e98b2

        {
          label:'Preferences',
          click(){
            //file yet to be added
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
    },




    {
        // Edit menu
      label: 'Edit',
      submenu:[

        {
          label:'Cut',
          click(){
            //file yet to be added
            ;
          }
        },
        {
          label:'Copy',
          click(){
            // file yet to be added
            ;
          }
        },
        {
          label: 'Paste',
          click(){
            // file yet to be added
            ;
          }
        },
      ]
    },
    




    {
      // View menu
      label: 'View',
      submenu:[

        {
          label:'Student Module',
          click(){
            //file yet to be added
            ;
          }
        },
        {
          label:'Teacher Module',
          click(){
            // file yet to be added
            ;
          }
        },
      ]

    },

    {

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




    }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

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
=======

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
>>>>>>> f1ee009ca857f27cb6ff4ebacc61a57f071e98b2

}
