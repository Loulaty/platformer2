class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0);
        this.setGravityY(600);
        this.setFriction(1);

        this.setBodySize(this.body.width -6,this.body.height -6 );
        this.setOffset(3, 3);
        this.setSize(80, 300);
        this.displayWidth = 300 / 3.5;
        this.displayHeight = 420 / 3.5;


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: [ { key: 'player', frame: 23 } ],
            frameRate: 20
        });


        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('player', { start: 16 , end: 20 }),
            frameRate: 7
        });


        this.cursors = scene.input.keyboard.createCursorKeys();
        this.shootKey = scene.input.keyboard.addKey('SHIFT');
        

        
        this._directionX=0;
        this._directionY=0;


    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        switch (true){
            case this._directionX<0:
                this.setVelocityX(-150);
                this.anims.play('left', true);
                break;

            case this._directionX>0:

                this.setVelocityX(150);
                this.anims.play('right', true);
                break;

            case "ArrowUp":
                this.anims.play('up', true);
                break;


            default:
                this.setVelocityX(0);
                this.anims.play('turn', true);
                break;  
        }

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-420);
            }
        }


    }
    
    

 
    
    


}