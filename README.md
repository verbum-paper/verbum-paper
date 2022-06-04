
<h2 align=center><b>Verbum Paper - Share the math!</b></h2>

# <div align=center><img src="https://raw.githubusercontent.com/verbum-paper/verbum-paper/main/media/images/2.png" width="100%"></div>

Verbum Paper is a software that is intended to be used to facilitate the sharing of formulas, equations, and things involving mathematics.

Through it you can write your file using CSS, HTML and Javascript code. You can import external libraries written in Javascript, such as for building graphics, or for something in particular.

Via Verbum Paper you can insert graphics for functions (eg 2nd degree functions). You can also insert <b>LaTex</b> code mixed in with your HTML code.

You can also copy your math expressions to <b>Clipboard</b>. This way you can easily share your math equations with your friends :smiley:

<br>

:bookmark_tabs: Table of Contents
-----
* [Installation (Linux)](https://github.com/verbum-paper/verbum-paper#hammer_and_wrench-installation)
* [Exemple](https://github.com/verbum-paper/verbum-paper#page_facing_up-example)
* [LaTex code]()
* [Mathematical function graphs]()
* [General graphics]()
* [Copying to Clipboard]()
* [Exporting file (HTML, PDF, PNG)]()
* [Standard libraries]()
* [Reference](https://github.com/verbum-paper/verbum-paper#link-reference)
-----


:hammer_and_wrench: Installation
---

Prerequisites:
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
sudo ln -s "$HOME/verbum-paper/verbum-paper/verbum-paper.sh" /usr/bin/verbum-paper
```

To open Verbum Paper, enter the command:
```bash
verbum-paper
```


:page_facing_up: Example
---

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


:link: Reference
---

# LaTex Reference

For use of LaTex commands, styling, and related details, go to the MathLive reference.

Math and Text mode, Fractions and Binomials, Binary Operators, Functions, Bounds, Projections, Modulo, Unicode, Large Operators, Logic, Arrows, Accents, Relational Operators, Negated Relational Operators, Sets, Relational Set Operators, Greek, Hebrew, Letterlike Symbols, Delimiters, Punctuation, Spacing, Decorations, Notations, Colors, Font Styling, MathJax HTML Extension, Sizing, Various, MediaWiki, Physics, Chemistry, Macros, Environments / Matrixes, TeX Registers, TeX Primitives.

Link: https://cortexjs.io/mathlive/reference/commands/


