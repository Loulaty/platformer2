class Anime    extends Phaser.Scene {

    preload() {

        this.load.video('anime', 'assets/anime.mp4', 'loadeddata', false, true);
      
    }
    create() {
      
        this.anime=this.add.video(448, 224, 'anime');
        this.anime.play(true);
        this.anime.setLoop(true);

        
        this.input.keyboard.on('keydown-ENTER', function ()
        {
            this.cameras.main.fadeOut(500, 0, 0, 0)


            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
            {

                this.game.scene.start(TitleScreen);
                this.scene.start("boop");
            })
        }, this);
        this.input.on('pointerdown', function(){
            this.cameras.main.fadeOut(500, 0, 0, 0)
            
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
            {
                
                this.scene.start("Skip");

            })

        },this);
        

    }



}