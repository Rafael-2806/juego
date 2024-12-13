const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/malo.png",
    OPPONENT_PICTURE_DEAD = "assets/malo_muerto.png",
    OPPONENT_SPEED = 5,
    OPPONENT_WIDTH = 5,
    GAME_OVER_PICTURE = "assets/game_over.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_PICTURE = "assets/bueno.png",
    PLAYER_PICTURE_DEAD = "assets/bueno_muerto.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    PLAYER_LIVES = 3, // Número de vidas inicial del jugador
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/shot1.png",
    SHOT_PICTURE_OPPONENT = "assets/shot2.png",
    SHOT_WIDTH = 1.5;

// Funciones para actualizar el score y las vidas en la pantalla
function updateScoreDisplay(score) {
    document.getElementById("scoreli").innerText = `Score: ${score}`;
}

function updateLivesDisplay(lives) {
    document.getElementById("livesli").innerText = `Lives: ${lives}`;
}

function getRandomNumber(range) {
    return Math.floor(Math.random() * range);
}

function collision(div1, div2) {
    const a = div1.getBoundingClientRect(),
        b = div2.getBoundingClientRect();
    return !(a.bottom < b.top || a.top > b.bottom || a.right < b.left || a.left > b.right);
}

var game;
document.addEventListener("DOMContentLoaded", () => {
    game = new Game();
    game.start();

    // Registrar el Service Worker cuando el DOM esté listo
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.error('Error al registrar el Service Worker:', error);
            });
    }

    // Código para gestionar la instalación de la PWA
    let deferredPrompt;
    const installButton = document.getElementById('installButton');
    
    // Escucha el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevenimos la acción por defecto
        e.preventDefault();
        deferredPrompt = e;
        
        // Mostramos el botón de instalación
        installButton.style.display = 'block';
        
        // Agregamos el listener para cuando el usuario haga clic en el botón de instalación
        installButton.addEventListener('click', () => {
            // Mostramos el prompt de instalación
            deferredPrompt.prompt();
            
            // Esperamos la respuesta del usuario
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuario aceptó la instalación');
                } else {
                    console.log('Usuario rechazó la instalación');
                }
                deferredPrompt = null;
            });
        });
    });
    
    // Lógica adicional para ocultar el botón de instalación cuando no sea necesario
    window.addEventListener('appinstalled', () => {
        // Ocultamos el botón después de la instalación
        installButton.style.display = 'none';
    });
});
