
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

    // Copy to clipboard (image)
    $('.btn-copy-clip').on('click', ()=>{
        var body = $('.draw-area-iframe').contents().find('body')[0];

        html2canvas(body, {
            onrendered: function( canvas ) {
                $("#content").empty().append(canvas);
            }
        }).then(canvas => {
            window.api.process_canvas(canvas);
            console.log('Copy ok!')
        });
    })
    
})


