
let width=14*64; //896;
let height=7*64; //448;



let config = {
    type: Phaser.AUTO,


    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100*3 },
            debug: true,
        }
    },
    scene: [
        new Ui(),

        //new TitleScene(),
        new Niveau1("Lavander forest?"),
        new Tiled("Test"),

        

    ],
    width: width,
    height: height,
    scale: {
        mode: Phaser.Scale.FIT,
        orientation:Phaser.Scale.LANDSCAPE,
        parent: 'game',
        width: width,
        height: height,
        min: {
            width: 0,
            height: 0
        },
        max: {
            width: width*1.5,
            height: height*1.5
        },
        autoCenter:Phaser.Scale.Center.CENTER_BOTH

    },
    autoRound: false
    
};
let game;
function resize() {}


window.onload = function() {
    game=new Phaser.Game(config);
    window.addEventListener("resize", resize, false);
    window.addEventListener("scroll", resize, false);
}