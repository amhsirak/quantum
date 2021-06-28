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
        this.physics.world.setBounds(0,0,this.background.displayWidth, this.background.displayHeight);

        // make the ship move
        this.background.setInteractive();
        // to fire bullets
        this.background.on('pointerup', this.backgroundClicked, this);
        this.background.on('pointerdown', this.onDown, this);
        // move the camera
        this.cameras.main.setBounds(0,0,this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.ship,true);
        // add bullets 
        this.bulletGroup = this.physics.add.group();
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

            // move rocks (-1,0,1)
            let vx = Math.floor(Math.random() * 2) - 1;
            let vy = Math.floor(Math.random() * 2) - 1;
            if(vx == 0 && vy == 0){
                vx=1;
                vy=1;
            }
            let speed = Math.floor(Math.random() * 200) + 10;
            child.body.setVelocity(vx*speed, vy*speed);
        }.bind(this));
        // make the rocks bounce against each other
        this.physics.add.collider(this.rockGroup);
        // bullets destroy rocks
        this.physics.add.collider(this.bulletGroup,this.rockGroup,this.destroyRock,null,this);

        // explosion
        let frameNames = this.anims.generateFrameNumbers('exp');
        let f2 = frameNames.slice();
        f2.reverse();
        let f3 = f2.concat(frameNames);
        this.anims.create({
            key: 'boom',
            frames: f3,
            frameRate: 46,
            repeat: false
        });

    }
    backgroundClicked() {
        let elapsed = Math.abs(this.downTime - this.getTimer());
        // if elapsed is < 300 then it is a small click
        if (elapsed < 300) {

            let targetX = this.background.input.localX * this.background.scaleX;
            let targetY = this.background.input.localY * this.background.scaleY;
            this.targetX = targetX;
            this.targetY = targetY;

            let angle = this.physics.moveTo(this.ship, targetX, targetY, 40);
            angle = this.toDegrees(angle);
            this.ship.angle = angle;
        }
        else {
            // long click
           this.makeBullet();

        }
    }
    getTimer() {
        let date = new Date();
        return date.getTime();
    }
    onDown() {
        this.downTime = this.getTimer();

    }
    toDegrees(angle) {
        return angle * (180 / Math.PI); // convert radians to degrees
    }
    getDirFromAngle(angle) {
        var rads = angle * Math.PI / 180;
        var tx = Math.cos(rads);
        var ty = Math.sin(rads);
        return {tx,ty}
    }
    makeBullet() {
        let dirObj = this.getDirFromAngle(this.ship.angle);
        console.log(dirObj);
        let bullet = this.physics.add.sprite(this.ship.x,this.ship.y,'bullet');
        this.bulletGroup.add(bullet);
        bullet.angle =  this.ship.angle;
        bullet.body.setVelocity(dirObj.tx * 200, dirObj.ty * 200);
    }
    destroyRock(bullet,rock) {
        bullet.destroy();
        let explosion = this.add.sprite(rock.x, rock.y, 'exp');
        explosion.play('boom');
        rock.destroy();
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