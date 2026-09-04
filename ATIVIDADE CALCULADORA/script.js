document.getElementById('btnSomar').addEventListener('click', function() {
    // Importante: Number() converte o texto do input em número real
    let n1 = Number(document.getElementById('num1').value);
    let n2 = Number(document.getElementById('num2').value);
    let soma = n1 + n2;
    document.getElementById('resultado').innerText = soma;
});
