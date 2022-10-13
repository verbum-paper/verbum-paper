
<h2 align=center><b>Verbum Paper - Share the math!</b></h2>

# <div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/1.png" width="100%"></div>

Verbum Paper is a software that is intended to be used to facilitate the sharing of formulas, equations, and things involving mathematics.

Through it you can write your file using CSS, HTML and Javascript code. You can import external libraries written in Javascript, such as for building graphics, or for something in particular.

Via Verbum Paper you can insert graphics for functions (eg 2nd degree functions). You can also insert <b>LaTex</b> code mixed in with your HTML code.

You can also copy your math expressions to <b>Clipboard</b>. This way you can easily share your math equations with your friends :smiley:

**If my code has helped you, please consider [sponsoring me](https://github.com/sponsors/melchisedech333) :blue_heart:** 

<br>

:bookmark_tabs: Table of Contents
-----
* [Installation (Linux)](https://github.com/verbum-paper/verbum-paper#hammer_and_wrench-installation)
* [Copying to Clipboard](https://github.com/verbum-paper/verbum-paper#clipboard-copying-to-clipboard)
* [Exemple](https://github.com/verbum-paper/verbum-paper#page_facing_up-example)
* [LaTex code](https://github.com/verbum-paper/verbum-paper#white_square_button-latex-code)
* [Mathematical function graphs](https://github.com/verbum-paper/verbum-paper#heavy_plus_sign-mathematical-function-graphs)
* [General graphics](https://github.com/verbum-paper/verbum-paper#bar_chart-general-graphics)
* [Highlight code](https://github.com/verbum-paper/verbum-paper#computer-highlight-code)
* [Exporting files](https://github.com/verbum-paper/verbum-paper#page_with_curl-exporting-files)
* [Standard libraries and References](https://github.com/verbum-paper/verbum-paper#link-standard-libraries-and-references)
* [Author](https://github.com/verbum-paper/verbum-paper#smiley-author)
* [License](https://github.com/verbum-paper/verbum-paper#scroll-license)
-----

<br>

:hammer_and_wrench: Installation
---

Note: This installation process is for <b>Linux</b> environment. 

<b>Requirements:</b>
- git
- unzip
- wget


Enter the directory where you want to install Verbum Paper, for example:

```bash
mkdir ~/verbum-paper
cd ~/verbum-paper
```

Run the install script:
```bash
wget -c https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/verbum-install/verbum-install.sh
chmod +x verbum-install.sh
./verbum-install.sh
```

Creating shortcut in the operating system (Linux), example:
```bash
sudo ln -s "$HOME/verbum-paper/shortcut.sh" /usr/bin/verbum-paper
```

To open Verbum Paper, enter the command:
```bash
verbum-paper
```

<br>

:clipboard: Copying to Clipboard
---

To copy your document, in image form, to the Clipboard, click on the icon:

<div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/7.png" ></div>

<br>

:page_facing_up: Example
---

Below is a simple example, where we create a graph of a function, using the FunctionPlot library. And we make use of LaTex commands to display an equation.

```html
<div class="title" >
    Quadratic function
</div>

<div class="text" >
    Defination: quadratic function is a function 
    <b>f: ℝ → ℝ, x ∈ ℝ</b>,
    that can be described by an equation of the form 
    <b>f(x) = ax² + bx + c</b>, where <b>a ≠ 0</b>.
</div>

<center>
    <div class="text text-center" >
        Graph of a quadratic function
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

<p class="text text-center">
    Root of the quadratic function:
    
    \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
</p>
```

The view will look like this:

<div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/2.png" width="50%"></div>

<br>

:white_square_button: LaTex code
---

To insert LaTex code, you must follow the MathLive specification: https://cortexjs.io/mathlive/reference/commands/

Example to include an equation:

```latex
\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
```

This code produces this view:

<div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/3.png" ></div>

<br>

:heavy_plus_sign: Mathematical function graphs
---

### Function Plot - A 2d function plotter powered by D3

To create graphs of quadratic functions, the Function Plot library is used.
Exemple:

```html
<div id="function"></div>
```

```javascript
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
```

The code above will produce this view:
<div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/4.png" ></div>

<br>

:bar_chart: General Graphics
---

### D3 - Data-Driven Documents

To produce graphics for different applications, it is recommended to use the D3 library.
Below is an example using the D3 library:

```html
<div id="d3-graph"></div>
```

```javascript
// Format JSON data.
var json_data = `
  [
    { "date":"2013-04-28", "value":"135.98" },
    { "date":"2013-04-29", "value":"147.49" }
  ]
`;

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#d3-graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

json_data = JSON.parse(json_data);
for (var a=0; a<json_data.length; a++) {
  json_data[a].date = d3.timeParse("%Y-%m-%d")(json_data[a].date);
}

// Add X axis --> it is a date format
const x = d3.scaleTime()
  .domain(d3.extent(json_data, function(d) { return d.date; }))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, d3.max(json_data, function(d) { return +d.value; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

// Add the line
svg.append("path")
  .datum(json_data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.value) })
    )
```

The code above will produce this view:
<div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/5.png" ></div>

### Chart.js

You can also use the Chart.js library to create charts.
Exemple:

```html
<canvas id="chart-example" style="width:400px"></canvas>
```

```javascript
var xValues = [50,60,70,80,90,100,110,120,130,140,150];
var yValues = [7, 8, 8, 9, 9, 9,  10, 11, 14, 14, 15 ];

new Chart("chart-example", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        yAxes: [{ticks: {min: 6, max:16}}],
        }
    }
});
```
Graph view:
<div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/6.png" ></div>

<br>

:computer: Highlight code
---

To highlight code, it is recommended to use the Highlight.js library.

```html
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
```

<br>

:page_with_curl: Exporting files
---

To export your file to the formats: HTML, PNG and PDF; click on their respective icons.

<img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/8.png" >

<br>

:link: Standard libraries and References
---

### Math Live - LaTex

For use of LaTex commands, styling, and related details, go to the MathLive reference.

Support: Math and Text mode, Fractions and Binomials, Binary Operators, Functions, Bounds, Projections, Modulo, Unicode, Large Operators, Logic, Arrows, Accents, Relational Operators, Negated Relational Operators, Sets, Relational Set Operators, Greek, Hebrew, Letterlike Symbols, Delimiters, Punctuation, Spacing, Decorations, Notations, Colors, Font Styling, MathJax HTML Extension, Sizing, Various, MediaWiki, Physics, Chemistry, Macros, Environments / Matrixes, TeX Registers, TeX Primitives.

Link: https://cortexjs.io/mathlive/reference/commands/


### Function Plot

To visualize quadratic functions you can use the Function Plot library.

Support: Plotting a curve, Additional options, Grid, Domain, Number of samples, Annotations, Range and closed path, Logarithmic scales, Multiple graphs, Graph types, Tip, nth-root, Secants, Derivative, Linked graphs, Update, Function continuity, Circle, Parametric equations, Polar equations, Implicit functions, Points and polylines, Vectors, Advanced, Recipes.

Link: https://mauriciopoppe.github.io/function-plot/


### D3

D3.js is a JavaScript library for manipulating documents based on data.

Link: https://observablehq.com/@d3/gallery


### Chart.js

Simple yet flexible JavaScript charting for designers & developers.

Link: https://www.chartjs.org/docs/latest/samples/information.html


### Highlight.js

Syntax highlighting librarie.

Link: https://highlightjs.org/usage/

<br>

:smiley: Author
---

Sponsor: [melchisedech333](https://github.com/sponsors/melchisedech333)<br>
YouTube: [Melchisedech](https://www.youtube.com/channel/UC4Sh4wxncr5arnydpUfWPKw)<br>
Twitter: [Melchisedech333](https://twitter.com/Melchisedech333)<br>
Blog: [melchisedech333.github.io](https://melchisedech333.github.io/)<br>
LinkedIn: [Melchisedech Rex](https://www.linkedin.com/in/melchisedech-rex-724152235/)

<img src="https://github.com/melchisedech333.png?size=200" height="100" />

<br>

:scroll: License
---

[ BSD-3-Clause license](./license) © Verbum Paper


