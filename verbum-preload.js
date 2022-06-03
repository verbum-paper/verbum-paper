
const { contextBridge } = require("electron");
const { ipcRenderer } = require('electron')
var fs = require('fs');

contextBridge.exposeInMainWorld(
    "api", {
      
      // Dev Tools.
      toggleDevTools: () => {
        ipcRenderer.send('toggle-dev-tools', 'Jesus <3')
      },

      // Copy image to clipboard.
      process_canvas: (canvas) => {
        console.log("Jesus <3 started")
        
        canvas.toBlob(function(blob) { 
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]); 
        });
      },

      // Load TMP file content.
      loadTmpFile: (callback) => {
          fs.readFile('./verbum-paper/verbum-tmp.html', 'utf-8', (err, data) => {
              if (err) {
                  alert("An error ocurred reading the file :" + err.message)
                  return;
              }
              
              callback(data)
          })
      },

      // Load template viewer.
      loadTemplateViewer: (callback) => {
          fs.readFile('./verbum-paper/verbum-viewer-template.html', 'utf-8', (err, data) => {
              if (err) {
                  alert("An error ocurred reading the file :" + err.message)
                  return;
              }
              
              callback(data)
          })
      },

      // Save template viewer.
      saveTemplateViewer: (code, callback) => {
          fs.writeFile('./verbum-paper/verbum-viewer.html', code, (err) => {
              if (err) {
                  alert("An error ocurred updating the file" + err.message)
                  return;
              }
          
              callback()
          })
      },

      // Save TMP code.
      saveCodeTmp: (code, callback) => {
          fs.writeFile('./verbum-paper/verbum-tmp.html', code, (err) => {
              if (err) {
                  alert("An error ocurred updating the file" + err.message)
                  return;
              }
          
              callback()
          })
      },

      // Open HTML file.
      openHtmlFile: (callback) => {
          ipcRenderer.on('open-html-file-reply', (event, filePath) => {
            
            // Read file content.
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message)
                    return;
                }
                
                callback(data)
            })
            
          })

          ipcRenderer.send('open-html-file', 'Jesus <3')
      },

      // Save HTML.
      saveHtmlFile: (callback) => {
          ipcRenderer.on('save-html-file-reply', (event, filePath) => {
              
              // Prepare ext.
              var finalPath = filePath
              if (filePath.substring(filePath.length - 5, filePath.length) != '.html') {
                  finalPath = filePath + '.html'
              }
              
              callback(finalPath)
          })

          ipcRenderer.send('save-html-file', 'Jesus <3')
      },

      // Save spec file (HTML).
      writeFileSpecHtml: (code, path, callback) => {
          fs.writeFile(path, code, (err) => {
            if (err) {
                alert("An error ocurred write file" + err.message)
                return;
            }
        
            callback('File writed.')
        })
      },

      // Export PNG.
      exportPng: (callback) => {
          ipcRenderer.on('save-png-file-reply', (event, filePath) => {
                
              // Prepare ext.
              var finalPath = filePath
              if (filePath.substring(filePath.length - 4, filePath.length) != '.png') {
                  finalPath = filePath + '.png'
              }
              
              callback(finalPath)
          })

          ipcRenderer.send('save-png-file', 'Jesus <3')
      },

      // Save spec file (PNG).
      writeFileSpecPng: (canvas, path, callback) => {
          saveCallbackPng(canvas, path, callback)
      }

    }
);

// Export PNG.
// https://stackoverflow.com/questions/52692258/how-to-save-an-image-drawn-on-the-canvas-in-electron-js
async function saveCallbackPng (canvas, path, callback) {
  const blob = await new Promise(
     (resolve) => canvas.toBlob(blob => resolve(blob), "image/png", 0.8)
  );

  const buffer = new Buffer(await blob.arrayBuffer());
  
  await new Promise(
      (resolve, reject) => fs.writeFile(path, buffer, "binary", (err) => {
          if (err === null) {
              resolve();
              callback('Saved')
          } else {
              reject(err);
          }
      })
   );
}


