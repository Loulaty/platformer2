

var StateTitle = {
    
    create: function() {
        model.state = "title";
        
    }
}

preload()
{
    super.preload();
    game.load.image("sky", "assets/sky.png");}
    
    

this.btnStart=new TextButton("Start",4,1,G.START_GAME);
 
 //place it in the center of the screen horizontally
 this.btnStart.x=game.width/2;
  
 //place the button vertically 70% from the top
 this.btnStart.y=game.height*.75;