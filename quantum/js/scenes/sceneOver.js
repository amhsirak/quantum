class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        this.load.image("button3","images/ui/buttons/2/3.png");
    }
    create() {
       

       this.alignGrid=new AlignGrid({rows:11,cols:11,scene:this});
    //    this.alignGrid.showNumbers();
       this.back = this.add.image(0,0,'back');
       this.back.setOrigin(0,0);

       this.title = this.add.text(0,0,"QUANTUM🪐",{
        fontSize: game.config.width / 8, 
        color: "#9556d1",
        fontWeight: "700"
     });
       this.title.setOrigin(0.5,0.5);
       this.alignGrid.placeAtIndex(16,this.title);

       this.winnerText = this.add.text(0,0,"WINNER:",{
           fontSize: game.config.width / 10, 
           color: "#008000"
        });
       this.winnerText.setOrigin(0.5,0.5);
       this.alignGrid.placeAtIndex(38,this.winnerText);

        // winning ship 
       if (model.playerWon == 1) {
        this.winner = this.add.image(0,0,"ship");   
       } else {
        this.winner = this.add.image(0,0,"eship");
       }

       Align.scaleToGameW(this.winner,.25);
       this.winner.angle = 270;
       this.alignGrid.placeAtIndex(60,this.winner);

     
       let btnStart=new FlatButton({scene:this,key:'button3',text:'PLAY AGAIN',event:'start_game'});
       this.alignGrid.placeAtIndex(93,btnStart);

       emitter.on('start_game',this.startGame,this);
       
       let sb=new SoundButtons({
        scene:this
    });
    }
    startGame()
    {
        this.scene.start('SceneMain');
    }
    update() {}
}