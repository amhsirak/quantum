class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload() {

        this.bar=new Bar({
            scene:this,
            x:game.config.width/2,
            y:game.config.height/2
        });
    	this.progText=this.add.text(game.config.width/2,game.config.height/2,"0%",{
            color:'#ffffff',
            fontSize:game.config.width/20
        });
    	this.progText.setOrigin(0.5,0.5);
    	this.load.on('progress', this.onProgress, this);

        this.load.image("button1","images/ui/buttons/2/1.png");
        this.load.image("button2","images/ui/buttons/2/5.png");

        this.load.audio("explode",["audio/explode.wav","audio/explode.ogg"]);
        this.load.audio("enemyShoot",["audio/enemyShoot.wav","audio/enemyShoot.ogg"]);
        this.load.audio("laser",["audio/laser.wav","audio/laser.ogg"]);

        this.load.image("toggleBack","images/ui/toggles/5.png");
        this.load.image("sfxOff","images/ui/icons/sfx_off.png");
        this.load.image("sfxOn","images/ui/icons/sfx_on.png");

        this.load.image("ship","images/player.png");
        this.load.image("background","images/background.jpg");
        this.load.image("back","images/back.jpg");
        this.load.spritesheet('rocks',"images/rocks.png", {
            frameWidth: 120,
            frameHeight: 100
        });
        this.load.spritesheet('exp',"images/exp.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image("bullet","images/bullet.png");
        this.load.image("eship","images/eship.png");
        this.load.image("ebullet","images/ebullet.png");
    }
    onProgress(value)
    {
        this.bar.setPercent(value);
        let per = Math.floor(value * 100);
    	this.progText.setText(per + "%");
    }
    create() {
    	this.scene.start("SceneTitle");
    }
}