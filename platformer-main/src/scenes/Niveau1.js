class Niveau1 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('monstre2', 'assets/monstre2.png');
        this.load.image('monstre3', 'assets/monstre3.png');
        this.load.image('monstre4', 'assets/monstre4.png');
        this.load.image('monstre5', 'assets/monstre5.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sky-2', 'assets/sky-2.png');

        this.load.audio('fond', 'assets/sounds/fond.mp3');



    }
    create() {
        super.create();

        /////////////////////////////////////////////// La BASE DU NIVEAU /////////////////////////////////////

        //on définit la taille du tableau
        let largeurDuTableau=2000;
        let hauteurDuTableau=450; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.physics.add.collider(this.player,this.platforms);


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=0;

        this.player.setDepth(10);
        this.blood.setDepth(10);

        this.music = this.sound.add('fond');

        var musicConfig = {
            mute: false,
            volume: 0.3,
            rate : 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay:0,
        }
        this.music.play(musicConfig);

                /////////////////////////////////////////////// Les AJOUTS /////////////////////////////////////

        //des étoiles
        this.star1=this.physics.add.sprite(300,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(1);

        this.star2=this.physics.add.sprite(600,0,"star");
        this.star2.setCollideWorldBounds(true);
        this.star2.setBounce(0);

        this.star3=this.physics.add.sprite(1400,0,"star");
        this.star3.setCollideWorldBounds(true);
        this.star3.setBounce(1);

        this.star4=this.physics.add.sprite(1080,0,"star");
        this.star4.setCollideWorldBounds(true);
        this.star4.setBounce(0.7);

        this.star5=this.physics.add.sprite(1980,60,"star");
        this.star5.setCollideWorldBounds(true);
        this.star5.setBounce(1);

        this.star6=this.physics.add.sprite(1900,20,"star");
        this.star6.setCollideWorldBounds(true);
        this.star6.setBounce(1);

        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star2, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star3, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star4, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star5, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star6, this.ramasserEtoile, null, this);

        this.physics.add.collider(this.player,this.platforms);


        //plateformes
        let groupeVert = this.physics.add.staticGroup();
        groupeVert.create(0, 250, 'ground');
        groupeVert.create(140, 300, 'ground');
        groupeVert.create(350, 200, 'ground');
        groupeVert.create(550, 70, 'ground');
        groupeVert.create(670, 400, 'ground');
        groupeVert.create(820, 350, 'ground');
        groupeVert.create(1000, 250, 'ground');
        groupeVert.create(1250, 250, 'ground');
        groupeVert.create(1500, 180, 'ground');
        groupeVert.create(1750, 210, 'ground');
        groupeVert.create(1820, 100, 'ground');
        groupeVert.children.iterate(function (child) {
            child.setDisplaySize(100,50);
            child.setOrigin(0,0);
            child.refreshBody();});
        this.physics.add.collider(this.player, groupeVert);
        this.physics.add.collider(this.star1, groupeVert);
        this.physics.add.collider(this.star2, groupeVert);
        this.physics.add.collider(this.star3, groupeVert);
        this.physics.add.collider(this.star4, groupeVert);
        this.physics.add.collider(this.star5, groupeVert);
        this.physics.add.collider(this.star6, groupeVert);

        //Monstres
        new monstre2(this,800,100);;
        new monstre2(this,1930,100);
        new MonsterFly(this,400,150);
        new MonsterFly(this,1800,100);
        new monstre3(this,1000,150);
        new monstreviolet(this,450,300);
        new monstreviolet(this,1800,300);




    }

    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.2;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.3+500;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.1+30;
    }



}
