
/*
** Jesus <3
**
** Main script.
*/

$(document).ready(() => {

    console.log('Verbum Paper -> Started!')

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
    codeEditor.setTheme("ace/theme/twilight")
    codeEditor.session.setMode("ace/mode/javascript")
    codeEditor.setAutoScrollEditorIntoView(true)

})


