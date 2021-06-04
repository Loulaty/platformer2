class Victory    extends Phaser.Scene {
    constructor(){
      super();
    }
  
    preload ()
    {

    
        this.load.image('victoryscreen', 'assets/victoryscreen.png');
    }
  
    create()
    {
        this.touchePressed = false;


       
  

        this.add.sprite(game.config.width/2, game.config.height/2, 'victoryscreen');

 


            let lumiere3 = this.add.pointlight(game.config.width/2+20, game.config.height-200, 0, 500, 0.5);
            lumiere3.attenuation = 0.03  ;
            lumiere3.color.setTo(200, 200, 255);
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
                this.touchePressed = true;
                this.cameras.main.fadeOut(1500, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.scene.start("boop");
                })
            }

        },this);
    }
    
}