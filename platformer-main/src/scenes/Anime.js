class Anime    extends Phaser.Scene {

    preload() {

        this.load.video('animatest', 'assets/animatest.mp4', 'loadeddata', true, false);
      
    }
    create() {

        this.touchePressed = false;
      
        this.anime=this.add.video(450, 220, 'animatest');
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
                     this.game.scene.start(Tiled);
                    this.scene.start("Test");
                })
            }

        },this);
    }
    



}