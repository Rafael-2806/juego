class Boss extends Opponent {
    constructor(game) {
        const height = OPPONENT_HEIGHT * game.width / 100;
        const width = OPPONENT_WIDTH * game.width / 100;
        const x = getRandomNumber(game.width - width / 2);
        const y = 0;

        super(game, width, height, x, y);

        this.myImage = "assets/jefe.png";
        this.myImageDead = "assets/jefe_muerto.png";
        this.speed = OPPONENT_SPEED * 2; 

        
        this.image.src = this.myImage;
    }

    collide() {
        if (!this.dead) {
            if (!this.killedOnce) {
                setTimeout(() => {
                    let youWinImage = new Entity(this.game, this.game.width / 2, "auto", this.game.width / 4, this.game.height / 4, 0, "assets/you_win.png");
                    youWinImage.render();
                    this.game.endGame(); 
                }, 2000);

                this.killedOnce = true; 
            }

            super.collide(); 
        }
    }
}
