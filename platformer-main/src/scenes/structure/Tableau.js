class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key 
     */
    constructor(key) {
        super(key);
    }

    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('balle', 'assets/balle.png');
        this.load.image('platformjump, assets/platformjump.png');
        this.load.image('blood', 'assets/blood.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.spritesheet('player',
            'assets/player.png',
            { frameWidth: 215, frameHeight: 307  }
        );
        this.load.spritesheet('monstre2',
            'assets/monstre2.png',
            { frameWidth: 400, frameHeight: 700  }
        );
    }
    create(){
        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,200,500);

        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        this.bubble=false;
        
        

    }
    update(){
        super.update();
        this.player.move();

        if (this.bubble)
        {
            let me = this;

            me.bubble=new BulleTir(this,this.player.x,this.player.y,"balle").setDepth(100000);

            
            me.bubble.visible=true;

            me.bubble=false;
            ui.usebulle();
            
           
            

        }

        if(ui.jaugebulle < 0 ){
            console.log("AAAAAAAAAAAAAAAAAAAAH");
            this.BulleTir.StopShoot();
        }

       

        if (this.rebond)
        {
            let me = this;

            me.rebond=new TirPlatform(this,this.player.x*this.player.sens + 70,this.player.y+20, this.Boing, "platformjump").setDepth(100000);
            me.rebond.visible=true;
            me.rebond=false;
            ui.usebulle();
            
            

           
        }

     

        
    }


   


    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete){
        let me=this;
        me.blood.visible=true;
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,
            duration:700,
            displayHeight:{
                from:40,
                to:70,
            },
            displayWidth:{
                from:40,
                to:70,
            },
            onComplete: function () {
                me.blood.visible=false;
                onComplete();
            }
        })
    }


    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);
        ui.shield();
        console.log('trouvé')
        
    }

    ramasserVic (win)
    {
        console.log("win"); 
        win.disableBody(true, true);
        
        
    }

    Boing (player, rebond)
    {
        player.body.velocity.y > 0
        && player.getBounds().bottom < rebond.getBounds().top
        player.setVelocityY(-600);

    }






    
    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster){
        let me=this;
        if(monster.isDead !== true){ 
            if(
                player.body.velocity.y > 0
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                player.directionY=500;
                let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="monstre2"){
                if(child.active){
                    totalActive++;
                }
            }
        }
            }else{
                if(!me.player.isDead){
                    if(ui.ourson > 0){
                        ui.shielduse();
                    }else{
                        ui.perdu();
                        if(ui.peur < 0){
                            me.gameover();
                        }
                    }
                    

                }


            }
        }

    }

    
     Bullekill(bubble, monstre2){
        if(monstre2.isDead !== true){
            if(
                bubble.posX == monstre2.posX

            ){
                console.log("touché");
            
        }

    }
}


    gameover(){
        let me=this;
        if(!me.player.isDead) {
            me.player.isDead = true;
            me.player.visible = false;
            //ça saigne...
            me.saigne(me.player, function () {
                //à la fin de la petite anim, on relance le jeu
                me.blood.visible = false;
                me.player.anims.play('turn');
                me.player.isDead = false;
                me.scene.restart();
                ui.peur = 301;
            })
        }
    }
    

    victory (win)
    {
        win.disableBody(true, true);
        win.emit("disabled");
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="win"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        if(totalActive===0){
            this.gg();
        }
        
    }



    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    gg(){
        console.log("gg")
        Tableau.suivant();
    }

    /**
     * Va au tableau suivant
     */
    static suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau){
        if(Tableau.current){
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;

