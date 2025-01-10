function compute() {
    // Get inputs
    const popmean = Number(document.getElementById('popmean').value);
    const popstd = Number(document.getElementById('popstd').value); 
    const samplemean = Number(document.getElementById('samplemean').value);
    const count = Number(document.getElementById('count').value);
    // Do computations
    const zscore = (samplemean - popmean)*Math.sqrt(count)/popstd;
    const qvalue = simpson(0,Math.abs(zscore),50,normalnumerator, normaldenominator);
    // Write answer
    const answer = document.getElementById('answer');
    // answer.innerHTML = '\(e^x\) $$a^x$$';
    answer.innerText = '\\(z\\)-score: ' + trunc(zscore) + 
        '\nOne-sided \\(p\\)-value: ' + trunc(0.5 - qvalue) +
        '\nTwo-sided \\(p\\)-value: ' + trunc(1 - 2* qvalue);
    // KaTeX.RenderMath with default delimiter \(...\). Need escape \ first for JS. Can use either innerText or inner HTML since this is processed at the text level.
    renderMathInElement(answer);
    console.log('This is compute function at 3:31 PM.');
}

const words = [['So', 'Hence', 'Thus', 'Therefore','As a result'], ['Ba', 'Sa']];

function trunc(x) {
    return Math.trunc(10000*x)/10000.0;
}

function normalnumerator(x){
    return Math.exp(-0.5*x**2);
    // More efficient to divide after Simpson's rule, but I won't do it.
    // Plug normalnumerator(), normaldenominator() into Simpson's rule.
}

// Constant function denominator, used to avoid repeated division in Simpson's rule
const normaldenominator = Math.sqrt(2*Math.PI);

// Simpson's rule assumes n = even.
function simpson(a, b, n, numerator, denominator) {
    const delta = (b-a)/n;
    let point = 0;
    // Simpson's rule at endpoints
    let accum = numerator(a) + numerator(b);
    // Simpson's rule at interior points
    for (let i=1; i<n; i++) {
        point += delta;
        if (i%2 == 1) {
            accum += 4*numerator(a+point);
        } else if (i%2 == 0) {
            accum += 2*numerator(a+point);
        }
    }
    return accum*delta/(3*denominator);
}
