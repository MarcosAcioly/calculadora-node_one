function addValor(){
    let container = document.getElementById("cont-input");
    let newInput = document.createElement("input");
    newInput.type = "number";
    newInput.placeholder = "Digite um Valor";
    container.appendChild(newInput);
}

function sub(){
    let inputs = document.querySelectorAll("#cont-input input");
    let valores = Array.from(inputs).map(input => Number(input.value));

    if (valores.length > 0) {
        let resultado = valores.reduce((acc, val) => acc - val);
        document.querySelector(".resultados").innerText = "Resultado: " + resultado;
    } else {
        document.querySelector(".resultados").innerText = "Por favor, insira valores válidos.";
    }
}