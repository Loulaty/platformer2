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
    }
    create (){
        console.log("create Ui")

        let backgroundBar=this.add.image(110,20,'red');
        backgroundBar.fixedToCamera = true;
        this.Bar=this.physics.add.sprite(10, 10, 'green');
        this.Bar.body.enable=false;
        this.Bar.setOrigin(0,0);

        //let healthBar=this.add.image(300, 20, 'green');
        //healthBar.fixedToCamera = true;
  //      this.healthBar = this.peur / this.maxpeur * 300;




        this.ourson=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._oursonText = this.add.text(5, 5, 'Ourson: 0', {
            font:'10px "Hanalei Fill"',
            fill: '#fff'
        });



        this.maxpeur=300;
        this.peur=300;



        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._peurText = this.add.text(5, 15, 'Peur: 300', {
            font:'10px "Hanalei Fill"',
            fill: '#fff'
        });


        this.jaugebulle=10;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._bulleText = this.add.text(5, 30, 'Bulles: 10', {
            font:'10px "Hanalei Fill"',
            fill: '#fff'
        });

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


        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
            font:'24px "Hanalei Fill"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX=1;
        this._tableauTextClass.originX=1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
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
        this._bulleText.setText('Bulle: ' + this.jaugebulle);
        if (this.jaugebulle <= 0){
            console.log("plus de bulles");
            
        }
        
    }



    perdu(points=1)
    {
        this.peur-=points;
        this._peurText.setText('Peur: ' + this.peur);

        if (this.peur <= 0){
            console.log("game over")
            
        }
        
    }

    shielduse(points=1)
    {
        this.ourson-=points;
        this._oursonText.setText('Ourson: ' + this.ourson);
    }


    shield(points=100)
    {
        this.ourson+=points;
        this._oursonText.setText('Ourson: ' + this.ourson);
    }


    jauge(){
        console.log("JAUNE");
        this.Bar.scaleX = (this.peur / this.maxpeur );
    }

    update(){
        if(Tableau.current){
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
