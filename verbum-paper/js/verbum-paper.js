
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


    
})

/*
** Tests...
*/

$(document).ready(() => {

    codeEditor.setValue(`<div class="view-content" >
    <div class="view-content-inner" >
        
        <div class="title1" >
            Função polinomial do 2° grau
        </div>

        <div class="text1" >
            Definição: uma função <b>f: ℝ → ℝ</b> chama-se <i>quadrática</i> quando existem números reais <b>a</b>, <b>b</b>, <b>c</b>, com <b>a</b> ≠ 0, tal que <b>f(x) = ax² + bx + c</b> para todo <b>x</b> ∈ ℝ.
        </div>

        <center>
            <div class="text1 text-center no-padding" >
                Gráfico de uma função quadrática
            </div>

            <div id="function"></div>

            <script>
                functionPlot({
                    target: "#function",
                    width: 400,
                    height: 200,
                    yAxis: { domain: [-1, 9] },
                    grid: true,
                    data: [ {
                        fn: "x^2"
                    }]
                });
            </script>
        </center>
        
        <div class="text1" >
            Chama-se <i>zero ou raiz da função</i> do 2° grau <i>f(x) = ax² + bx + c</i> o número real <i>x</i> tal que <i>f(x) = 0</i>. Os zeros da função quadrática são dados pela chamada <b>fórmula de Bhaskara</b>:
        </div>

        <p class="text2">
        \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
        </p>

        <div class="text1" >
            O gráfico da função acima pode ser desenhado utilizando o código abaixo.
        </div>

        <pre><code class="language-javascript">functionPlot({
    target: "#function",
    width: 400,
    height: 200,
    yAxis: { domain: [-1, 9] },
    grid: true,
    data: [ {
        fn: "x^2"
    }]
});</code></pre>

        </div>
    </div>`, -1)
})


