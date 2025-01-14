function zdo() {
    if (event.key == "Enter") {
        ztestanswer();
    }
}
function tdo() {
    if (event.key == "Enter") {
        ttestanswer();
    }
}


function ztestanswer() {
    // Get inputs
    const popmean = Number(document.getElementById('popmean').value);
    const std = Number(document.getElementById('std').value); 
    const samplemean = Number(document.getElementById('samplemean').value);
    const count = Number(document.getElementById('count').value);
    // Do computations
    const z = (samplemean - popmean)*Math.sqrt(count)/std;
    const p = ztest(Math.abs(z), count);
    // Write answer
    const answer = document.getElementById('answer');
    answer.innerHTML = '<p>\\(z\\)-score: \\(' + z.toFixed(4) + 
        '\\)</p><p>One-sided \\(p\\)-value: ' + p[0] +
        '</p><p>Two-sided \\(p\\)-value: ' + p[1] + '</p>';
    // KaTeX.RenderMath with default delimiter \(...\). Need escape \ first for JS. Can use either innerText or inner HTML since this is processed at the text level.
    renderMathInElement(answer);
}

function ttestanswer() {
    // Get inputs
    const popmean = Number(document.getElementById('popmean').value);
    const std = Number(document.getElementById('std').value); 
    const samplemean = Number(document.getElementById('samplemean').value);
    const count = Number(document.getElementById('count').value);
    // Do computations
    const t = (samplemean - popmean)*Math.sqrt(count)/std;
    const p = ttest(Math.abs(t), count);
    // Write answer
    const answer = document.getElementById('answer');
    answer.innerHTML = '<p>\\(t\\)-statistic: \\(' + t.toFixed(4) +
        '\\)</p><p>Degrees of freedom: \\(' + (count-1) +
        '\\)</p><p>One-sided \\(p\\)-value: '+ p[0] +
        '</p><p>Two-sided \\(p\\)-value: '+ p[1] +'</p>';
    // KaTeX.RenderMath with default delimiter \(...\). Need escape \ first for JS. Can use either innerText or inner HTML since this is processed at the text level.
    renderMathInElement(answer);
}

// Inputs: z = absolute value of zscore, partition = 500
// If z < 5, integrate normal PDF from 0 to z with Simpson's rule with 500 partitions; use 5 digits
// Else use approximation in Borjesson Table 1 Row 2 Subrow 4; use 4 digits
function ztest(z) {
    const e = -0.39908993417905747-Math.log10(0.729*z+0.271*Math.sqrt(z**2+7.356)) - (z**2)*Math.log10(Math.E)/2;
    const f = e+Math.log10(2);
    let p = (z<5)? tr(0.5 - simpson(0, Math.abs(z), 500, x => Math.exp(-0.5*x**2)) * 1/Math.sqrt(2*Math.PI)) : tr(10*10**(e%1), Math.floor(e));
    let q = (z<5)? tr(1 - 2*simpson(0, Math.abs(z), 500, x => Math.exp(-0.5*x**2)) * 1/Math.sqrt(2*Math.PI)) : tr(10*10**(f%1), Math.floor(f));
    return [p, q];
}

// t-test. Estimate the integral in Geometric Approach book via Simpson's rule with partition=500.
function ttest(t, n) {
    let c = (n%2 == 1)? 1 : (2/Math.PI);
    for (let i=n-2; i > 1; i=i-2) {
        c = c*(i/(i-1));
    }
    p = c*simpson(0, Math.atan2(Math.sqrt(n-1), t), 500, x => Math.sin(x)**(n-2));
    return [tr(p/2), tr(p)];
}

function tr(p,f=0) {
    const e = Math.floor(Math.log10(p));
    return (e+f>=-4)? ('\\(' + p.toPrecision(5) + '\\)') : ('\\(' + (p*10**(-1*e)).toFixed(3) + '×10^{'+(e+f)+'}\\)');
}

// Simpson's rule to estimate \int_a^b f(x)\;dx using n sample points
function simpson(a, b, n, f) {
    const delta = (b-a)/n;
    let sum = f(b);
    // Simpson's rule at interior points
    for (let i=1, point=b; i<n; i++) {
        point = point - delta;
        sum += (i%2 == 1)? 4*f(point) : 2*f(point);
    }
    sum += f(a);
    return sum*delta/3;
}