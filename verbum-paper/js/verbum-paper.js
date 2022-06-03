
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

$(document).ready(() => {

    // Copy to clipboard (image).
    $('.btn-copy-clip').on('click', ()=>{
        var body = $('.draw-area-iframe').contents().find('body')[0]

        html2canvas(body, {
            onrendered: function( canvas ) {
                $("#content").empty().append(canvas)
            }
        }).then(canvas => {
            window.api.process_canvas(canvas)
            console.log('Copy ok!')
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

$(document).ready(() => {

    setInterval(()=>{
        if (filesLoaded) {
            var code = codeEditor.getValue()
            window.api.saveCodeTmp(code, ()=>{

            })
        }
    }, 1000)

})


