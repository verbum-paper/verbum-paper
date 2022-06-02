
const { contextBridge } = require("electron");
const { ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    "api", {
        
      internal_print: () => {
        console.log("Jesus <3 started")
        ipcRenderer.on('internal-print-reply', (event, arg) => {
          console.log(arg)
        })
        ipcRenderer.send('internal-print', 'Jesus <3')
      },

      // Copia imagem para o clipboard.
      process_canvas: (canvas) => {
        console.log("Jesus <3 started")
        
        canvas.toBlob(function(blob) { 
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]); 
        });
      }
        
    }
);


