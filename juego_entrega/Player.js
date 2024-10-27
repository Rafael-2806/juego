/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el jugador
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);

        // Inicializa el número de vidas del jugador
        this.lives = PLAYER_LIVES; // Asigna las vidas iniciales
    }

    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update() {
        if (!this.dead) {
            switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) {
                        this.x -= this.speed;
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) {
                        this.x += this.speed;
                    }
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this);
                    break;
            }
        }
    }

    /**
     * Mata al jugador
     */
    collide() {
        if (!this.dead) {
            this.lives--; // Resta una vida
            // Actualiza la visualización de vidas
            updateLivesDisplay(this.lives);
            if (this.lives > 0) {
                this.dead = true; // Marca al jugador como muerto
                setTimeout(() => {
                    this.dead = false; // Revive al jugador
                    this.image.src = this.myImage; // Restaura la imagen original
                    this.x = this.game.width / 2 - this.width / 2; // Restaura la posición
                    this.y = this.game.height - this.height; // Restaura la posición
                }, 2000);
            } else {
                // Si no quedan vidas, termina el juego
                setTimeout(() => {
                    this.game.endGame(); // Termina el juego
                }, 2000);
            }
            super.collide(); // Llama al método collide de la superclase
        }
    }
}
