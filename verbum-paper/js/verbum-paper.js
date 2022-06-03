
/*
** Jesus <3
**
** Main script.
*/

$(document).ready(() => {
    console.log('Verbum Paper -> Started - Jesus <3')
})

/*
** Resize areas control.
*/

var mousePressed = false

$(document).ready(() => {

    $('.separator-area').mousedown(() => {
        mousePressed = true
    })

    $('.separator-area').mouseup(() => {
        mousePressed = false
    })

    $(window).mouseup(() => {
        mousePressed = false
    })

    $(window).mousemove((e) => {
        if (mousePressed) {
            var left = e.clientX;
            
            $('.code-area').css('width', left +'px')
            $('.separator-area').css('left', left +'px')
            $('.draw-area').css('width', 'calc( ( 100% - '+ left +'px ) - 5px )')
        }
    })

})

/*
** Editor control area.
*/

var codeEditor = null

$(document).ready(() => {

    codeEditor = ace.edit("code-editor")
    codeEditor.setTheme("ace/theme/tomorrow_night")
    codeEditor.session.setMode("ace/mode/html")
    codeEditor.setAutoScrollEditorIntoView(true)
    codeEditor.setOptions({
        fontSize: "11pt"
    });

})

/*
** Actions buttons.
*/

var currentCanvas = null

$(document).ready(() => {

    // Open file (HTML).
    $('.btn-open-file').on('click', ()=>{
        window.api.openHtmlFile((data) => {
            if (data.length > 0) {
                currentCode = data
                filesLoaded = true
                codeEditor.setValue(data, -1)
                saveAndReload()
            }
        })
    })

    // Export HTML.
    $('.btn-export-html').on('click', ()=>{
        window.api.saveHtmlFile((data1)=>{
            window.api.writeFileSpecHtml(codeEditor.getValue(), data1, (data2)=>{
                console.log(data2)
            })
        })
    })

    // Export PNG.
    $('.btn-export-png').on('click', ()=>{
        var body = $('.draw-area-iframe').contents().find('body')[0]

        html2canvas(body, {
            onrendered: function( canvas ) {
                $("#content").empty().append(canvas)
            }
        }).then(canvas => {        
            currentCanvas = canvas

            window.api.exportPng((data1)=>{
                window.api.writeFileSpecPng(currentCanvas, data1, (data2)=>{
                    console.log(data2)
                })
            })
        });
    })

    // Export PDF.
    $('.btn-export-pdf').on('click', ()=>{
        window.frames["draw-area-iframe-nm"].focus()
        window.frames["draw-area-iframe-nm"].print()
    })

    // Copy to clipboard (image).
    $('.btn-copy-clip').on('click', ()=>{
        var body = $('.draw-area-iframe').contents().find('body')[0]

        html2canvas(body, {
            onrendered: function( canvas ) {
                $("#content").empty().append(canvas)
            }
        }).then(canvas => {
            window.api.process_canvas(canvas)
        });
    })

    // Reload viewer.
    $('.btn-reload-viewer').on('click', ()=>{
        currentCode = codeEditor.getValue()
        saveAndReload()
    })
    
})

/*
** Startup actions.
*/

$(document).ready(() => {
    window.api.loadTemplateViewer((data1)=>{
        if (data1.length > 0) {
            templateViewer = data1

            window.api.loadTmpFile((data2)=>{
                if (data2.length > 0) {
                    currentCode = data2
                    filesLoaded = true
                    codeEditor.setValue(data2, -1)
                    saveAndReload()
                }
            })

        }
    })
})

/*
** Save & reload control.
*/

var templateViewer = ''
var currentCode = ''
var filesLoaded = false

function saveAndReload () {
    if (templateViewer.length > 0) {
        var finalCode = templateViewer.replace('%%IN_PRINCIPIO_ERAT_VERBUM%%', currentCode)

        window.api.saveTemplateViewer(finalCode, ()=>{
            $('.draw-area-iframe').attr('src', $('.draw-area-iframe').attr('src'))
        })
    }
}

var reloadRunning = false
var lastChangeDate = null
var reloadIntervalProcess = false
var firstLoad = true

$(document).ready(() => {
    lastChangeDate = new Date()

    setInterval(()=>{
        if (filesLoaded) {
            if (!reloadRunning) {
                reloadRunning = true
            
                var code = codeEditor.getValue()
                window.api.saveCodeTmp(code, ()=>{
                    reloadRunning = false
                })
            }
        }
    }, 1000)

    codeEditor.getSession().on('change', function() {
        if (firstLoad) {
            firstLoad = false
        } else {
            lastChangeDate = new Date()
            reloadIntervalProcess = true
        }
    });

    setInterval(()=>{
        if (reloadIntervalProcess) {
            var currentDate = new Date().getTime()
            var lastDate = lastChangeDate.getTime()
            var milisecDiff = 0;

            if (lastDate < currentDate) {
                milisecDiff = currentDate - lastDate
            } else {
                milisecDiff = lastDate - currentDate
            }

            var dateDiff = new Date(milisecDiff)
            var secDiff = dateDiff.getSeconds()

            if (secDiff >= 3) {
                reloadIntervalProcess = false
                currentCode = codeEditor.getValue()
                saveAndReload()
            }
        }
    }, 1000)
})


