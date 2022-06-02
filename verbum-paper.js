
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
  win.webContents.openDevTools()
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

// Imprime pela impressora/PDF.
ipcMain.on('internal-print', (event, arg) => {
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

  event.reply('internal-print-reply', 'Jesus <3')
})


