class TitleScreen    extends Phaser.Scene {
    constructor(){
      super("bootGame");
    }
  
    preload ()
    {
        this.load.image('TitleScreen', 'assets/TitleScreen.png');
        this.load.image('button', 'assets/button.png');
    }
  
    create()
    {
        this.touchePressed = false;
  

        this.add.sprite(game.config.width/2, game.config.height/2, 'TitleScreen');
        this.add.sprite(game.config.width/2, game.config.height/2, 'TitleScreen');

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
 

        

/*
        let lanterne = this.add.pointlight(game.config.width/2-378, game.config.height/2+32, 0, 50, 0.5);
        lanterne.attenuation = 0.05;
        lanterne.color.setTo(255, 200, 0);
        let lanterne5 = this.add.pointlight(game.config.width/2+242, game.config.height/2+38, 0, 30, 0.5);
        lanterne5.attenuation = 0.05;
        lanterne5.color.setTo(255, 200, 0);

        let lanterne2 = this.add.pointlight(game.config.width/2-250, game.config.height/2+40, 0, 30, 0.5);
        lanterne2.attenuation = 0.05;
        lanterne2.color.setTo(255, 200, 0);
        let lanterne6 = this.add.pointlight(game.config.width/2+370, game.config.height/2+31, 0, 50, 0.5);
        lanterne6.attenuation = 0.05;
        lanterne6.color.setTo(255, 200, 0);

        let lanterne3 = this.add.pointlight(game.config.width/2-190, game.config.height/2+45, 0, 15, 0.5);
        lanterne3.attenuation = 0.05;
        lanterne3.color.setTo(255, 200, 0);
        let lanterne4 = this.add.pointlight(game.config.width/2+182, game.config.height/2+45, 0, 15, 0.5);
        lanterne4.attenuation = 0.05;
        lanterne4.color.setTo(255, 200, 0);
*/

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