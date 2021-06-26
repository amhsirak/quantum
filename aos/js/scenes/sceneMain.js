class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
       
    }
    create() {
        //set up 
        emitter=new Phaser.Events.EventEmitter();
        controller=new Controller();
        var mediaManager=new MediaManager({scene:this});

        var sb=new SoundButtons({scene:this});
        
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);
        this.ship = this.physics.add.sprite(this.centerX,this.centerY,'ship');

    }
    
    update() {
        //constant running loop
    }
}