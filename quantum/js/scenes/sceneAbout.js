class SceneAbout extends Phaser.Scene {
    constructor() {
        super('SceneAbout');
    }
    preload()
    {
      this.load.image("backButton","images/ui/buttons/backButton.png");
    }
    create() {
        emitter=new Phaser.Events.EventEmitter();
        controller=new Controller();

        this.back = this.add.image(0,0,'back');
        this.back.setOrigin(0,0);
        this.alignGrid=new AlignGrid({
           rows:11,
           cols:11,
           scene:this
        });
        // this.alignGrid.showNumbers();

        this.aboutTitle = this.add.text(0,0,"About Quantum🪐",{
        fontSize: game.config.width / 14, 
        color: "#9556d1",
        fontWeight: "700"
     });
       this.alignGrid.placeAtIndex(11,this.aboutTitle);

        this.description = this.add.text(0,0,"Quantum is a space shooting game\nwhere your task is to destroy the\nenemy ship.\nBe careful of the asteroids-\nthey decrease your shields too!",{
        fontSize: game.config.width / 24, 
        fontWeight: "400"
     });
       this.alignGrid.placeAtIndex(22,this.description);
       
       let btnBack=new FlatButton({
           scene: this,
           key: 'backButton',
           event: 'title_game'
       });
       this.alignGrid.placeAtIndex(0,btnBack);
       
       emitter.on('title_game', this.titleGame, this);
    }
    titleGame() 
    {
        this.scene.start('SceneTitle');
    }
    update() {}
}