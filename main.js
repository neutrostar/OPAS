const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on('ready', function(){
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

    // file menu
    label: 'File',
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




  }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}
