class Anime    extends Phaser.Scene {

    preload() {

        this.load.video('anima2', 'assets/anima2.mp4', 'loadeddata', true);
      
    }
    create() {

        this.touchePressed = false;
      
        this.anime=this.add.video(200, 300, 'anima2');
        this.anime.play(true);
        this.anime.setLoop(false);

        
        this.input.on('pointerdown', function(pointer)
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.cameras.main.fadeOut(1500, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(TitleScreen);
                    this.scene.start("boop");
                })
            }

        },this);
    }
    



}