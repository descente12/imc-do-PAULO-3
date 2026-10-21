
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const calcularBtn = document.getElementById('calcularBtn');
const limparBtn = document.getElementById('limparBtn');
const resultadoDiv = document.getElementById('resultado');


function calcularIMC() {
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        exibirMensagemErro("⚠️ Por favor, preencha os campos com valores válidos maiores que zero.");
        return;
    }

    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2);

   
    let classificacao = "";
    let classeCss = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        classeCss = "abaixo";
    } else if (imc >= 18.5 && imc <= 24.9) {
        classificacao = "Peso normal";
        classeCss = "normal";
    } else if (imc >= 25.0 && imc <= 29.9) {
        classificacao = "Sobrepeso";
        classeCss = "sobrepeso";
    } else {
        classificacao = "Obesidade";
        classeCss = "obesidade";
    }

    exibirResultado(imcFormatado, classificacao, classeCss);
}


function exibirResultado(imc, classificacao, classeCss) {
    resultadoDiv.className = `resultado ${classeCss}`;
    resultadoDiv.innerHTML = `Seu IMC é <strong>${imc}</strong><br>Classificação: <strong>${classificacao}</strong>`;
}

function exibirMensagemErro(mensagem) {
    resultadoDiv.className = "resultado erro";
    resultadoDiv.textContent = mensagem;
}


function limparCampos() {
    pesoInput.value = '';
    alturaInput.value = '';
    resultadoDiv.className = "resultado oculto";
    resultadoDiv.innerHTML = '';
    pesoInput.focus();
}

calcularBtn.addEventListener('click', calcularIMC);
limparBtn.addEventListener('click', limparCampos);

[pesoInput, alturaInput].forEach(input => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calcularIMC();
        }
    });
});