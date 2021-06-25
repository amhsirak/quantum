class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        this.load.image("button1","images/ui/buttons/2/1.png");
    	  this.load.image("title","images/title.png");
    }
    create() {
       

       this.alignGrid=new AlignGrid({rows:11,cols:11,scene:this});
       //this.alignGrid.showNumbers();

       var title=this.add.image(0,0,'title');
       Align.scaleToGameW(title,.8);
       this.alignGrid.placeAtIndex(38,title);

       var btnStart=new FlatButton({scene:this,key:'button1',text:'Play Again!',event:'start_game'});
       this.alignGrid.placeAtIndex(93,btnStart);

       emitter.on('start_game',this.startGame,this);
    }
    startGame()
    {
        this.scene.start('SceneMain');
    }
    update() {}
}