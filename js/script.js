const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const score = document.querySelector('.ponto')
const jumpedPipe = document.querySelector('.canos')

let scoreValue = 0;
let pipePassed = false;
let pipeCount = 0;

const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    console.log('loop');

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    console.log(scoreValue);
    score.innerHTML = `Score: ${scoreValue}`;
    jumpedPipe.innerHTML = `Pipes Jumped: ${pipeCount}`;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        mario.style.animation = 'gameOver 2.5s ease-in-out';

        clearInterval(loop);
    }

    // 2. CONDIÇÃO DE PONTUAÇÃO (Passou pelo cano com sucesso)
    else if (pipePosition < 0 && !pipePassed) {
        scoreValue += 10; // Soma 10 pontos
        pipePassed = true; // Bloqueia novos pontos para este mesmo cano
        pipeCount++; // Incrementa o contador de canos
    }
    // 3. RESET DA BANDEIRA (Quando o cano volta para o início do lado direito)
    else if (pipePosition > 120) {
        pipePassed = false; // Liberta para o próximo cano somar pontos
    }

}, 10)

document.addEventListener('keydown', (command) => {
    if (command.code === 'Space') {
        jump();
    }
    if (command.code === 'KeyR') {
        location.reload();
    }
});