class TitleScreen extends Phaser.Scene{
    /**
     *
     * @param {String} key 
     */
    constructor(key) {
        super(key);
    }
  
    preload ()
    {
        // images
        this.load.image('titlescreen', 'assets/titlescreen/titlescreen.png');
    }
}

create()
{
    this.add.sprite(game.config.width/2, game.config.height/2, 'titlescreen');

    this.input.keyboard.on('keydown-ENTER', function () 
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;

                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
                {
                    this.game.scene.start(Tiled);
                    this.scene.start("Cemetary");
                })
            }

        }, this);


}
    