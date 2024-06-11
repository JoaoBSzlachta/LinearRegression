let qtdPontos, currentPoint, x, y;

function startInput() {
    qtdPontos = document.getElementById('qtdPontos').value;
    currentPoint = 0;
    x = [];
    y = [];
    document.getElementById('pointsForm').classList.remove('hidden');
    showNextInput();
}

function showNextInput() {
    const currentLabel = document.getElementById('currentLabel');
    const currentInput = document.getElementById('currentInput');

    if (currentPoint < qtdPontos * 2) {
        if (currentPoint % 2 === 0) {
            currentLabel.textContent = `x${Math.floor(currentPoint / 2)}:`;
        } else {
            currentLabel.textContent = `y${Math.floor(currentPoint / 2)}:`;
        }
        currentInput.value = '';
        currentInput.focus();
    } else {
        document.getElementById('pointsForm').classList.add('hidden');
        const polinomio = leastSquares(x,y);
        display(x, y, polinomio);
    }
}

function collectCoordinate(event) {
    event.preventDefault();
    const currentInput = document.getElementById('currentInput').value;

    if (currentPoint % 2 === 0) {
        x.push(parseFloat(currentInput));
    } else {
        y.push(parseFloat(currentInput));
    }
    currentPoint++;
    showNextInput();
}

function display(x, y, polinomio) {
    const output = document.getElementById('output');
    output.innerHTML = '<h2>Pontos:</h2>';
    // for (let i = 0; i < x.length; i++) {
    //     output.innerHTML += `<p>Ponto ${i + 1}: (${x[i]}, ${y[i]})</p>`;
    // }
    output.innerHTML += `
    <table>
        <tr>
            <td>
                ${x.map((xi, i) => `Ponto ${i + 1}: (${xi.toFixed(6)}, ${y[i].toFixed(6)})`).join('<br>')}
            </td>
        </tr>
    </table>
    <h3>Polinômio resultante da regressão:</h3>
    <p>P(x) = ${polinomio}</p>
    <button onclick="window.location.reload()">Recomeçar</button>
`;
}

function leastSquares(x, y){
    let n = x.length;
    let b1, b0;
    
    function somar(v){
        let result = 0;
        for (let i = 0; i < v.length; i++) {
            result += v[i];
        }
        return result;
    }

    function somarMult(u, v){
        result = 0;
        for (let i = 0; i < v.length; i++) {
            result += (u[i]*v[i]);
        }
        return result;
    }

    function somarQuad(v){
        result = 0;
        for (let i = 0; i < v.length; i++) {
            result += (v[i]**2);
        }
        return result;
    }

    b1 = ((somar(x)*somar(y)) - (n*somarMult(x, y))) / ((somar(x))**2 - (n*somarQuad(x)));

    b0 = (somar(y) - (b1*somar(x))) / n

    const ui = `${b0.toFixed(4)} + ${b1.toFixed(4)}x`;

    console.log(ui);

    return ui;
}
