
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
    codeEditor.session.setMode("ace/mode/html")
    codeEditor.setAutoScrollEditorIntoView(true)

})

/*
** Tests...
*/

$(document).ready(() => {

    codeEditor.setValue(`
    
<p>$$e^{i\pi}$$</p>

<p>
\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
</p>

<p>
    LaTex example:<br>

    \[x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}\]
    $$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
</p>


<math-field virtual-keyboard-mode="manual">
    x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
</math-field>


<pre><code class="language-c">// Jesus eh Top xD

int main (int argc, char *argv[])
{
    int numero1 = 2;
    int numero2 = 3;

    if (numero1 == 2 || numero2 == 2)
    {
        printf("Expressao 2\n");
    }

    else if ( numero1 == 2 && numero2 == 3 )
    {
        printf("Expressao 1\n");
    }

    return 0;
} </code></pre>


<p>$$e^{i\pi}$$</p>

<p>
\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
</p>

<p>
    LaTex example:<br>

    \[x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}\]
    $$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
</p>


<math-field virtual-keyboard-mode="manual">
    x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
</math-field>
    `, -1)
})


