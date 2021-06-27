class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
       
    }
    create() {
        // set up 
        emitter=new Phaser.Events.EventEmitter();
        controller=new Controller();
        let mediaManager=new MediaManager({scene:this});

        let sb=new SoundButtons({scene:this});
        
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);
        this.ship = this.physics.add.sprite(this.centerX,this.centerY,'ship');
        Align.scaleToGameW(this.ship,.125);

        this.background.scaleX = this.ship.scaleX;
        this.background.scaleY = this.ship.scaleY;

        // make the ship move
        this.background.setInteractive();
        this.background.on('pointerdown', this.backgroundClicked, this);
        // move the camera
        this.cameras.main.setBounds(0,0,this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.ship,true);
        // add rocks
        this.rockGroup= this.physics.add.group({
            key: 'rocks',
            frame: [0,1,2],
            frameQuantity: 5,
            bounceX: 1,
            bounceY: 1,
            angularVelocity: 1,
            collideWorldBounds: true
        });
        // place rocks randomly
        this.rockGroup.children.iterate(function(child){
            let xx = Math.floor(Math.random() * this.background.displayWidth);
            let yy = Math.floor(Math.random() * this.background.displayHeight);

            child.x = xx;
            child.y = yy;

            Align.scaleToGameW(child,.1);

            // move rocks
            let vx = Math.floor(Math.random() * 2) - 1;
            let vy = Math.floor(Math.random() * 2) - 1;
            let speed = Math.floor(Math.random() * 200) + 10;
            child.body.setVelocity(vx*speed, vy*speed);
        }.bind(this));
    }
    backgroundClicked() {
        let targetX = this.background.input.localX * this.background.scaleX;
        let targetY = this.background.input.localY * this.background.scaleY;
        this.targetX = targetX;
        this.targetY = targetY;

        let angle = this.physics.moveTo(this.ship, targetX, targetY, 40);
        angle = this.toDegrees(angle);
        this.ship.angle = angle;
    }
    toDegrees(angle) {
        return angle * (180 / Math.PI); // convert radians to degrees
    }
    
    update() {
        // constant running loop
        // to stop the ship
        let distX = Math.abs(this.ship.x - this.targetX);
        let distY = Math.abs(this.ship.y - this.targetY);
        if (distX < 10 && distY < 10) {
            this.ship.body.setVelocity(0,0);
        }
    }
}