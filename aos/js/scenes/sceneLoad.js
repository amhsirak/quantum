class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload() {

         this.bar=new Bar({scene:this,x:game.config.width/2,y:game.config.height/2});
    	this.progText=this.add.text(game.config.width/2,game.config.height/2,"0%",{color:'#ffffff',fontSize:game.config.width/20});
    	this.progText.setOrigin(0.5,0.5);
    	this.load.on('progress', this.onProgress, this);

        this.load.image("button1","images/ui/buttons/2/1.png");
        this.load.image("button2","images/ui/buttons/2/5.png");

      // this.load.audio('cat',["audio/meow.mp3","audio/meow.ogg"]);
       // this.load.audio('backgroundMusic',["audio/background.mp3","audio/background.ogg"]);

        this.load.image("toggleBack","images/ui/toggles/1.png");
        this.load.image("sfxOff","images/ui/icons/sfx_off.png");
        this.load.image("sfxOn","images/ui/icons/sfx_on.png");
        this.load.image("musicOn","images/ui/icons/music_on.png");
        this.load.image("musicOff","images/ui/icons/music_off.png");
    }
    onProgress(value)
    {
        this.bar.setPercent(value);
    	var per=Math.floor(value*100);
    	this.progText.setText(per+"%");
    }
    create() {
    	this.scene.start("SceneTitle");
    }
}