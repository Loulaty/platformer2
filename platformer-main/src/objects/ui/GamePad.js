/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePad extends Phaser.GameObjects.Container{
    constructor(scene, x, y,size=100) {
        super(scene, x, y)
        scene.add.existing(this);

        this.size=size;
        let w=this.size;
        let dragW=this.size/2;
        let pad2=scene.add.container();

        
        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.input.keyboard.on('keydown', function(kevent){
            //console.log(kevent.key);
            switch (kevent.key){
                case "d":
                    Tableau.current.player.directionX=1;
                    break;

                    case "ArrowRight":
                        Tableau.current.player.directionX=1;
                        break;

                case "q":
                    Tableau.current.player.directionX=-1;
                    break;

                    case "ArrowLeft":
                        Tableau.current.player.directionX=-1;
                        break;

                case " ":
                    Tableau.current.player.directionY=-1;
                    break;

                    case "z":
                    Tableau.current.player.directionY=-1;
                    break;

                    case "ArrowUp":
                    Tableau.current.player.directionY=-1;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=1;
                    break;

                case "a":
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    Tableau.current.bubble = true;               
                    break;

                case "e":
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    Tableau.current.rebond = true;
                    break;
                    
                case "r":
                    Tableau.current.restoreCheckPoint();
                    break;
            }
        });

        scene.input.keyboard.on('keyup', function(kevent){
            switch (kevent.key){
                case "d":
                    Tableau.current.player.directionX=0;
                    break;

                    case "ArrowRight":
                        Tableau.current.player.directionX=0;
                        break;

                case "q":
                    Tableau.current.player.directionX=0;
                    break;

                    case "ArrowLeft":
                        Tableau.current.player.directionX=0;
                        break;

                case " ":
                    Tableau.current.player.directionY=0;
                    break;

                    case "z":
                    Tableau.current.player.directionY=0;
                    break;

                    case "ArrowUp":
                        Tableau.current.player.directionY=0;
                        break;

                case "ArrowDown":
                    Tableau.current.player.directionY=0;
                    break;
                    
                case "a":
                    Tableau.current.bubble = false;
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    break;

                case "e":
                    Tableau.current.rebond = false;
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    break;

                case "r": 
                    break;
            }
        });

      

    }


}