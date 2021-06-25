class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
       
    }
    create() {
        //define our objects
         //set up 
        emitter=new Phaser.Events.EventEmitter();
        controller=new Controller();
        var mediaManager=new MediaManager({scene:this});

        var sb=new SoundButtons({scene:this});

    }
    
    update() {
        //constant running loop
    }
}