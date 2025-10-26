// --- 1. Elementos e Estado do Jogo ---
const player = document.getElementById('player');
const gameWorld = document.getElementById('game-world');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');

let playerBottom = 0;
let velocidadeY = 0;
let gravidade = 0.5;
let estaPulando = false;
let gameSpeed = 5; // Velocidade que os obstáculos se movem
let score = 0;
let isGameOver = false;

// --- 2. O Pulo (Input do Jogador) ---
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !estaPulando && !isGameOver) {
        velocidadeY = 12; // Impulso do pulo
        estaPulando = true;
    }
});

// --- 3. O "Coração" (Game Loop) ---
function gameLoop() {
    if (isGameOver) return; // Para o loop se o jogo acabou

    // Atualiza a física do jogador
    playerBottom += velocidadeY;
    velocidadeY -= gravidade;

    // Checa se o jogador está no chão
    if (playerBottom <= 0) {
        playerBottom = 0;
        velocidadeY = 0;
        estaPulando = false;
    }
    player.style.bottom = playerBottom + 'px';

    // Move todos os obstáculos
    document.querySelectorAll('.obstacle').forEach(obstacle => {
        let obstacleLeft = parseFloat(obstacle.style.left);
        obstacle.style.left = (obstacleLeft - gameSpeed) + 'px';

        // Remove obstáculo que saiu da tela
        if (obstacleLeft < -20) {
            obstacle.remove();
            score += 10; // Ganha pontos
            scoreDisplay.innerText = score;
        }

        // Checa Colisão
        if (estaColidindo(player, obstacle)) {
            fimDeJogo();
        }
    });

    requestAnimationFrame(gameLoop);
}

// --- 4. Geração de Obstáculos ---
function spawnObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '800px'; // Começa fora da tela, à direita
    gameWorld.appendChild(obstacle);

    // Gera o próximo obstáculo em um tempo aleatório
    const randomTime = Math.random() * 2000 + 1000;
    setTimeout(spawnObstacle, randomTime);
}

// --- 5. Funções de Lógica Auxiliar ---
function estaColidindo(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    // Lógica de colisão simplificada (funciona bem para este jogo)
    return playerRect.right > obstacleRect.left &&
           playerRect.left < obstacleRect.right &&
           playerRect.bottom > obstacleRect.top;
}

function fimDeJogo() {
    isGameOver = true;
    gameOverDisplay.classList.remove('hidden');
    // Para de gerar novos obstáculos
}

// --- 6. Inicia o Jogo ---
spawnObstacle(); // Gera o primeiro obstáculo
gameLoop();      // Inicia o "coração"