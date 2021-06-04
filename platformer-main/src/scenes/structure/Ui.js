class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }
    
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('green', 'assets/green.png');
        this.load.image('red', 'assets/red.png');
        this.load.image('shield', 'assets/shield.png');
        this.load.image('nuage', 'assets/nuage.png');
        this.load.image('nuageours', 'assets/nuageours.png');
        this.load.image('jaugeB', 'assets/bullejauge.png');
        this.load.image('fond', 'assets/bullefond.png');    
        this.load.image('lapin', 'assets/lapin.png');
        
    }
    create (){
        console.log("create Ui")

        let backgroundBar=this.add.image(110,20,'red');
        backgroundBar.fixedToCamera = true;
        this.Bar=this.physics.add.sprite(43, 13, 'green');
        this.Bar.body.enable=false;
        this.Bar.setOrigin(0,0);

   
        this.jaugeB=this.physics.add.sprite(-20, 166, 'jaugeB');
        this.jaugeB.body.enable=false;
        this.jaugeB.setOrigin(0,1);
        let fond=this.add.image(30,120,'fond');
        fond.fixedToCamera = true;

        this.nuage=this.physics.add.sprite(450, 224, 'nuage');
        this.nuage.body.enable=false;
        this.nuage.visible=false;

        this.nuageours=this.physics.add.sprite(450, 224, 'nuageours');
        this.nuageours.body.enable=false;
        this.nuageours.visible=false;


       



        //let healthBar=this.add.image(300, 20, 'green');
        //healthBar.fixedToCamera = true;
  //      this.healthBar = this.peur / this.maxpeur * 300;




        // this.ourson=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        // this._oursonText = this.add.text(5, 5, 'Ourson: 0', {
            // font:'10px "Hanalei Fill"',
            // fill: '#fff'
        // });



        this.maxpeur=300;
        this.peur=300;

        this.maxdoudou = 100;
        this.ourson = 0;

        this.maxbulle = 100;
        this.jaugebulle = 100;




        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        // this._peurText = this.add.text(5, 15, 'Peur: 300', {
            // font:'10px "Hanalei Fill"',
            // fill: '#fff'
        // });
        


        // this.jaugebulle=10;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        // this._bulleText = this.add.text(5, 30, 'Bulles: 10', {
            // font:'10px "Hanalei Fill"',
            // fill: '#fff'
        // });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
            font:'32px "Hanalei Fill"',
            align: 'right',
            fill: '#fff'
        })


       

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            //me.gagne(0)
        },100)



        let pad=new GamePad(this,0,0);
        pad.x=this.sys.canvas.width-pad.size-32;
        pad.y=this.sys.canvas.height-pad.size-32;



        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;

        
       
    }


    usebulle(points=1)
    {
        this.jaugebulle-=points;
        //this._bulleText.setText('Bulle: ' + this.jaugebulle);
        if (this.jaugebulle <= 0){
            
        }
        
    }

    usebullee(points=2)
    {
        this.jaugebulle-=points;
        //this._bulleText.setText('Bulle: ' + this.jaugebulle);
        if (this.jaugebulle <= 0){
            
        }
        
    }



    perdu(points=1)
    {
        this.peur-=points;
        //this._peurText.setText('Peur: ' + this.peur);

        if (this.peur <= 0){
            console.log("game over")
            
        }
        
    }

    resetshield()
    {
        this.ourson==0;
        this.doudoubar.scaleX = (this.ourson / this.maxdoudou );

    }

    resetvie()
    {
        this.peur== 300;
    }

    shielduse(points=1)
    {
        this.ourson-=points;
        
        //this._oursonText.setText('Ourson: ' + this.ourson);
    }



    shield(points=100)
    {
        this.ourson+=points;
      
        
        //this._oursonText.setText('Ourson: ' + this.ourson);
    }

    doudou(){
        this.doudoubar=this.physics.add.sprite(42, 10, 'shield');
        this.doudoubar.body.enable=false;
        this.doudoubar.setOrigin(0,0);

        this.lapin=this.physics.add.sprite(110, 30, 'lapin');
        this.lapin.body.enable=false;
        this.lapin.setOrigin(0,0);
        
    }

    Nuagepeur()
    {
          
            this.nuage.visible=true;
            Tableau.current.cameras.main.shake(70,0.002);
            
        
    

    }

    Nuageshield()
    {
          
            this.nuageours.visible=true;
            Tableau.current.cameras.main.shake(70,0.0015);
        
    

    }



    doudouuse(){
        this.Nuageshield();
        this.doudoubar.scaleX = (this.ourson / this.maxdoudou );

        
       

    }

    jauge(){
        this.Nuagepeur();
        this.Bar.scaleX = (this.peur / this.maxpeur );
    }

    jaugebubulle(){
        this.jaugeB.scaleY = (this.jaugebulle / this.maxbulle );
    }

    update(){

        this.nuage.visible=false;
        this.nuageours.visible=false;

    }


    

}
