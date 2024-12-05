/*
Usage:
Hover over element A with a #some-id to activate element B (or C, D, etc.) with #same-id-with-suffix with style #same-id-with-suffix-on. 
Add hOver(this) and hOut(this) on onmouseover and onmouseout attributes of A.
Convention: A's id is "h-blah", B's id is "h-blah-1", C's id is "h-blah-2", so on.

Example 1: 
<span 
    id="h-integral" 
    data-h="background:#ffee72;padding:.6em .4em;border-radius:.5em;" 
    onmouseover="hOver(this)" 
    onmouseout="hOut(this)">
    Integrals
</span> 
are denoted by $\htmlId{h-integral-1}\int$ or by $\htmlId{h-integraldah}\int$.

Discussion 1: 
Better way to redo this: this JS file automatically adds event listeners onmouseover and onmouseout on id's containing the h- prefix. Have data-h affect the element. For instance:
<span id="integral">Integrals</span> are denoted by $\htmlClass{integral}$ 

Discussion 2:
KaTeX files are deferred, so the KaTeX element #minus-1 is not in DOM when this JS file is loaded. We therefore query-select .minus-1 on mouseover instead.
Or: use a Boolean to check when KaTeX has finished loading, and then load this JS file. 
Or: have KaTeX onload function call that function to create "KaTeX DOM" followed by "hover.js" which adds event listeners to elements with hl-* ids.
Ensure that both hover.js and KaTeX script files are fully loaded before activating.
*/
function hOver(a) {
    let hs = document.querySelectorAll('[id^="' + a.id + '"]');
    hs.forEach(h => {
        h.style.cssText += 'transition:.2s;';
        h.classList.add(h.id + '-on');
    });
}
function hOut(a) {
    let hs = document.querySelectorAll('[id^="' + a.id + '"]');
    hs.forEach(h => {
        h.classList.remove(h.id + '-on');
    });
}
