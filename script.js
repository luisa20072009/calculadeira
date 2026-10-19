// Array que armazena a expressão matemática (ex: [5, "+", 10])
let expressaoArray = [];
// Variável auxiliar para construir números com mais de um dígito (ex: '2' + '5' = '25')
let numeroAtual = "";

const visor = document.getElementById("visor");

function atualizarVisor(texto) {
    visor.innerText = texto || "0";
}

function adicionarNumero(num) {
    numeroAtual += num.toString();
    atualizarVisor(expressaoArray.join(" ") + " " + numeroAtual);
}

function adicionarOperador(operador) {
    if (numeroAtual !== "") {
        expressaoArray.push(numeroAtual);
        expressaoArray.push(operador);
        numeroAtual = ""; // Reseta para o próximo número
        atualizarVisor(expressaoArray.join(" "));
    }
}

function limpar() {
    expressaoArray = [];
    numeroAtual = "";
    atualizarVisor("0");
}

function executarCalculo() {
    // Adiciona o último número digitado ao array antes de calcular
    if (numeroAtual !== "") {
        expressaoArray.push(numeroAtual);
        numeroAtual = "";
    }

    // Valida se o array não termina com um operador órfão
    const ultimoItem = expressaoArray[expressaoArray.length - 1];
    if (["+", "-", "*", "/"].includes(ultimoItem)) {
        expressaoArray.pop();
    }

    const resultado = calcular(expressaoArray);
    atualizarVisor(resultado);
    
    // Prepara a calculadora para continuar operando a partir do resultado obtido
    expressaoArray = resultado.toString().includes("Erro") ? [] : [resultado];
}

// Função lógica que processa as operações utilizando manipulação de Array
function calcular(arr) {
    if (arr.length === 0) return "0";
    let expressao = [...arr];

    // 1ª Passagem: Multiplicação (*) e Divisão (/)
    for (let i = 0; i < expressao.length; i++) {
        if (expressao[i] === '*' || expressao[i] === '/') {
            let operador = expressao[i];
            let num1 = parseFloat(expressao[i - 1]);
            let num2 = parseFloat(expressao[i + 1]);
            let resultadoParcial = 0;

            if (operador === '*') {
                resultadoParcial = num1 * num2;
            } else {
                if (num2 === 0) return "Erro: Divisão por zero.";
                resultadoParcial = num1 / num2;
            }

            expressao.splice(i - 1, 3, resultadoParcial);
            i--; 
        }
    }

    // 2ª Passagem: Soma (+) e Subtração (-)
    let resultadoFinal = parseFloat(expressao[0]);
    for (let i = 1; i < expressao.length; i += 2) {
        let operador = expressao[i];
        let proximoNum = parseFloat(expressao[i + 1]);

        if (operador === '+') {
            resultadoFinal += proximoNum;
        } else if (operador === '-') {
            resultadoFinal -= proximoNum;
        }
    }

    return resultadoFinal;
}