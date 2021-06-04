class TitleScreen    extends Phaser.Scene {
    constructor(){
      super("bootGame");
    }
  
    preload ()
    {

        this.load.video('anime', 'assets/anime.mp4', 'loadeddata', false, true);
        this.load.image('titlescreen', 'assets/titlescreen.png');
        this.load.image('button', 'assets/button.png');
    }
  
    create()
    {

        this.anime=this.add.video(448, 224, 'anime');
        this.anime.play(true);
        this.anime.setLoop(true);


        this.touchePressed = false;

       
  

        this.add.sprite(game.config.width/2, game.config.height/2, 'titlescreen');
        this.add.sprite(game.config.width/2, game.config.height/2, 'titlescreen');

        let startB1 = this.add.sprite(game.config.width/2-8, game.config.height -150, 'button');
        this.tweens.add({
            targets: this.startB1,
            y: {
                from: startB1.y =  game.config.height -150,
                to: startB1.y = game.config.height- 170, //on monte de 20 px
                duration: 2000,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });
 

        

let lumiere = this.add.pointlight(game.config.width/2-8, game.config.height-350, 0, 300, 0.5);
lumiere.attenuation = 0.04  ;
lumiere.color.setTo(255, 200, 200);
        this.tweens.add(
            {
                targets:[lumiere],
                duration:5000,
                yoyo: true,
                repeat:-1,
                delay:0,
                alpha:
                {
                    startDelay:0,
                    from:0,
                    to:1,
                }
            })


            let lumiere2 = this.add.pointlight(game.config.width/2+120, game.config.height-100, 0, 300, 0.5);
lumiere2.attenuation = 0.03  ;
lumiere2.color.setTo(255, 255, 255);
        this.tweens.add(
            {
                targets:[lumiere2],
                duration:3000,
                yoyo: true,
                repeat:-1,
                delay:0,
                alpha:
                {
                    startDelay:0,
                    from:0,
                    to:1,
                }
            })

            let lumiere3 = this.add.pointlight(game.config.width/2+230, game.config.height-250, 0, 300, 0.5);
            lumiere3.attenuation = 0.03  ;
            lumiere3.color.setTo(255, 255, 255);
                    this.tweens.add(
                        {
                            targets:[lumiere3],
                            duration:2500,
                            yoyo: true,
                            repeat:-1,
                            delay:0,
                            alpha:
                            {
                                startDelay:0,
                                from:0,
                                to:1,
                            }
                        })
       



        this.input.on('pointerdown', function(pointer)
        {
            if (!this.touchePressed)
            {
                startB1.alpha = 0.5;
                this.touchePressed = true;
                this.cameras.main.fadeOut(1500, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(Tiled);
                    this.scene.start("Test");
                })
            }

        },this);
    }
    
}