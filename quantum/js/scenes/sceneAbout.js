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
       this.aboutTitle.setOrigin(0.5,0.5);
       this.alignGrid.placeAtIndex(16,this.aboutTitle);
       
       let btnBack=new FlatButton({
           scene: this,
           key: 'backButton',
           event: 'title_game'
       });
       this.alignGrid.placeAtIndex(1,btnBack);
       emitter.on('title_game', this.titleGame, this);
    }
    titleGame() 
    {
        this.scene.start('SceneTitle');
    }
    update() {}
}