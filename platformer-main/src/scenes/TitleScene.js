class TitleScene extends Phaser.Scene {
    constructor(){
      super();
    }
  
    preload ()
    {
      this.load.image('sky', 'assets/sky.png');
    }
  
    create(){


      this.add.sprite(game.config.width/2, game.config.height/2,  'sky');
      this.input.keyboard.on('keydown-SPACE', function () {
          console.log("lancer");
        })

      }
  
    
  }