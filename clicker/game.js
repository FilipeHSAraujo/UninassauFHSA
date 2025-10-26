// --- 1. Variáveis do Jogo (O Cérebro) ---
let pontos = 0;
let valorDoClique = 1;
let pontosPorSegundo = 0;

let custoUpgradeClique = 50;
let custoUpgradePassivo = 100;

// --- 2. Elementos do HTML (Os "Músculos") ---
const displayPontos = document.getElementById('score-display');
const displayPPS = document.getElementById('pps-display');
const botaoPizza = document.getElementById('pizza-button');
const botaoUpgradeClique = document.getElementById('buy-click-upgrade');
const botaoUpgradePassivo = document.getElementById('buy-passive-upgrade');
const displayCustoClique = document.getElementById('click-upgrade-cost');
const displayCustoPassivo = document.getElementById('passive-upgrade-cost');

// --- 3. Funções do Jogo (As "Ações") ---

// Função: Clicar na Pizza
botaoPizza.addEventListener('click', function() {
    pontos = pontos + valorDoClique;
    atualizarTela();
});

// Função: Comprar Upgrade de Clique
botaoUpgradeClique.addEventListener('click', function() {
    if (pontos >= custoUpgradeClique) {
        pontos = pontos - custoUpgradeClique;     // 1. Pague o custo
        valorDoClique = valorDoClique + 1;        // 2. Melhore o clique
        custoUpgradeClique = Math.ceil(custoUpgradeClique * 1.5); // 3. Aumente o custo (Matemática!)
        atualizarTela();
    } else {
        alert("Pizzas insuficientes!");
    }
});

// Função: Comprar Upgrade Passivo
botaoUpgradePassivo.addEventListener('click', function() {
    if (pontos >= custoUpgradePassivo) {
        pontos = pontos - custoUpgradePassivo;    // 1. Pague o custo
        pontosPorSegundo = pontosPorSegundo + 1;  // 2. Melhore a renda passiva
        custoUpgradePassivo = Math.ceil(custoUpgradePassivo * 1.15); // 3. Aumente o custo (Matemática!)
        atualizarTela();
    } else {
        alert("Pizzas insuficientes!");
    }
});

// Função: Atualizar a Tela (A "Visão")
function atualizarTela() {
    displayPontos.innerText = pontos;
    displayPPS.innerText = pontosPorSegundo;
    displayCustoClique.innerText = "Custo: " + custoUpgradeClique;
    displayCustoPassivo.innerText = "Custo: " + custoUpgradePassivo;
}

// --- 4. Loop Principal do Jogo (O "Coração") ---
// Roda a cada 1 segundo (1000ms)
setInterval(function() {
    pontos = pontos + pontosPorSegundo;
    atualizarTela();
}, 1000);