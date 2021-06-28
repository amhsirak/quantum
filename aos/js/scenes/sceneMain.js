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

        // cursors = this.input.keyboard.createCursorKeys();

        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);

        // place the player ship
        this.ship = this.physics.add.sprite(this.centerX,this.centerY,'ship');
        Align.scaleToGameW(this.ship,.125);

        // this.ship.setCollideWorldBounds(true);

        // this.background.scaleX = this.ship.scaleX;
        // this.background.scaleY = this.ship.scaleY;

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

        // place the enemy ship
        this.eship = this.physics.add.sprite(this.centerX,0,'eship');
        Align.scaleToGameW(this.eship,.25);

        this.makeInfo();

    }
    backgroundClicked() {
        let elapsed = Math.abs(this.downTime - this.getTimer());
        // if elapsed is < 300 then it is a small click
        if (elapsed < 300) {

            let targetX = this.background.input.localX * this.background.scaleX;
            let targetY = this.background.input.localY * this.background.scaleY;
            this.targetX = targetX;
            this.targetY = targetY;

            let angle = this.physics.moveTo(this.ship, targetX, targetY, 100);
            angle = this.toDegrees(angle);
            this.ship.angle = angle;
        }
        else {
            // long click
           this.makeBullet();
        }
        // move enemy ship
        let enemyAngle = this.physics.moveTo(this.eship, this.ship.x, this.ship.y, 60);
        enemyAngle = this.toDegrees(enemyAngle);
        this.eship.angle = enemyAngle;
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
    fireEnemyBullet() {
        let elapsed = Math.abs(this.lastEnemyBullet - this.getTimer());
        if(elapsed < 500) {
            return;
        }
        this.lastEnemyBullet = this.getTimer();

        let enemyBullet = this.physics.add.sprite(this.eship.x,this.eship.y,'ebullet');
        enemyBullet.body.angularVelocity = 10;
        this.physics.moveTo(enemyBullet, this.ship.x, this.ship.y, 60);
    }
    destroyRock(bullet,rock) {
        bullet.destroy();
        let explosion = this.add.sprite(rock.x, rock.y, 'exp');
        explosion.play('boom');
        rock.destroy();
    }
    makeInfo() {

        this.text1 = this.add.text(0,0,"Shields\n100",{fontSize:game.config.width/30, align:"center",backgroundColor:"#000000"});
        this.text2 = this.add.text(0,0,"Enemy Shields\n100",{fontSize:game.config.width/30,align:"center",backgroundColor:"#000000"});

        this.uiGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
        // this.uiGrid.showNumbers();

        this.text1.setOrigin(0.5, 0.5);
        this.text2.setOrigin(0.5, 0.5);

        this.uiGrid.placeAtIndex(2,this.text1);
        this.uiGrid.placeAtIndex(8,this.text2);
        this.text1.setScrollFactor(0);
        this.text2.setScrollFactor(0);

        // icons 
        this.icon1 = this.add.image(0,0,"ship");
        this.icon2 = this.add.image(0,0,"eship");
        Align.scaleToGameW(this.icon1, .07);
        Align.scaleToGameW(this.icon2, .09);
        this.uiGrid.placeAtIndex(1,this.icon1);
        this.uiGrid.placeAtIndex(6,this.icon2);
        this.icon1.angle = 270;
        this.icon2.angle = 270;
        this.icon1.setScrollFactor(0);
        this.icon2.setScrollFactor(0);


    }

    update() {
        // constant running loop
        // to stop the ship
        let distX = Math.abs(this.ship.x - this.targetX);
        let distY = Math.abs(this.ship.y - this.targetY);
        if (distX < 10 && distY < 10) {
            this.ship.body.setVelocity(0,0);
        }

        let distXEnemy = Math.abs(this.ship.x - this.eship.x);
        let distYEnemy = Math.abs(this.ship.y - this.eship.y);
        if (distXEnemy < game.config.width / 5 && distYEnemy < game.config.height / 5) {
           this.fireEnemyBullet();
        }

        // FOR KEYBOARD CONTROLS
        // this.ship.body.setVelocity(0);
        // if (cursors.left.isDown)
        //     {
        //         this.ship.body.setVelocityX(-100);
        //     }
        //     else if (cursors.right.isDown)
        //     {
        //         this.ship.body.setVelocityX(100);
        //     }

        //     if (cursors.up.isDown)
        //     {
        //         this.ship.body.setVelocityY(-100);
        //     }
        //     else if (cursors.down.isDown)
        //     {
        //         this.ship.body.setVelocityY(100);
        //     }
    }
}