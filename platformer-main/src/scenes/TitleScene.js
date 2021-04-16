class TitleScene extends Phaser.Scene {
    constructor(){
      super("Mother");
    }
  
    preload ()
    {
      this.load.image('sky', 'assets/sky.png');
    }
  
    create(){

      this.add.sprite(game.config.width/2, game.config.height/2, 'titlescreen');
      let mytext = this.add.text(375,560,"Press [SPACEBAR] to continue.");
      this.input.keyboard.on('keydown-SPACE', function () {
          console.log("lancer");
          Niveau1.goTableau();
        
        })

      }
  
    
  }