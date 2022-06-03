
/*
** Jesus é meu Deus e doce amor <3
*/

const {app, BrowserWindow} = require('electron') 
const path = require('path') 
const url = require('url')
const { ipcMain } = require('electron')

var globalUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36';
let win = null
app.allowRendererProcessReuse = true;

app.once('ready', () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: true,
      contextIsolation: true,
      enableRemoteModule: true,
      webviewTag: true,
      preload: path.join(__dirname, "verbum-preload.js"),
    }
  })
  
  win.setMenuBarVisibility(false)
  win.center()
  //win.webContents.openDevTools()
  win.webContents.setUserAgent(globalUserAgent);
  //win.loadURL('http://...');

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'verbum-paper/verbum-paper.html'),
    protocol: 'file:',
    slashes: true
  }), {
    userAgent: globalUserAgent
  })
  
  win.once('ready-to-show', () => {
    win.show()
  })
})

/*
** Dev Tools.
*/
ipcMain.on('toggle-dev-tools', (event, arg) => {
    win.webContents.openDevTools()
})

/*
** Printer / Export PDF.
*/
ipcMain.on('save-pdf-file', (event, arg) => {
  console.log("Jesus <3")

  var options = {
      silent: false,
      printBackground: true,
      color: false,
      margin: {
          marginType: 'printableArea'
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      header: 'Header of the Page',
      footer: 'Footer of the Page'
  };
  
  win.webContents.print(options, (success, failureReason) => {
    if (!success) console.log(failureReason);
    console.log('Print Initiated');
  });

  event.reply('save-pdf-file-reply', 'Jesus <3')
})

/*
** Open file (HTML).
*/
const { dialog } = require('electron')

ipcMain.on('open-html-file', (event, arg) => {
    dialog.showOpenDialog({
        title: 'Select the HTML file',
        buttonLabel: 'Open file',
        filters: [{ 
            name: 'HTML Files', 
            extensions: ['html'] 
        }],
        properties: ['openFile']
    }).then(file => {
        if (!file.canceled) {
            const filepath = file.filePaths[0].toString();            
            event.reply('open-html-file-reply', filepath)
        }
    })
})

/*
** Save HTML.
*/

ipcMain.on('save-html-file', (event, arg) => {
    dialog.showSaveDialog(null, {
        title: "Export/save HTML file",
        buttonLabel : "Save file",
        filters :[
            {name: 'HTML File', extensions: ['html']},
            {name: 'All Files', extensions: ['*']}
        ]
    }).then(result => {
        filename = result.filePath;
      
        if (filename === undefined) {
            alert('The user clicked the btn but didn\'t created a file');
            return;
        }
        
        event.reply('save-html-file-reply', filename)
    }).catch(err => {
        alert(err)
    })
})

/*
** Save PNG.
*/

ipcMain.on('save-png-file', (event, arg) => {
    dialog.showSaveDialog(null, {
        title: "Export/save PNG file",
        buttonLabel : "Save file",
        filters :[
            {name: 'PNG File', extensions: ['png']},
            {name: 'All Files', extensions: ['*']}
        ]
    }).then(result => {
        filename = result.filePath;
      
        if (filename === undefined) {
            alert('The user clicked the btn but didn\'t created a file');
            return;
        }
        
        event.reply('save-png-file-reply', filename)
    }).catch(err => {
        alert(err)
    })
})


