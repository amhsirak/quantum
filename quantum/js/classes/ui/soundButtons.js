class SoundButtons extends Phaser.GameObjects.Container
{
	constructor(config)
	{
		super(config.scene);
		this.scene=config.scene;

		 this.sfxButton=new ToggleButton({
			 scene:this.scene,
			 backKey:'toggleBack',
			 onIcon:'sfxOn',
			 offIcon:'sfxOff',
			 event:G.TOGGLE_SOUND
		});
		 this.add(this.sfxButton);

		 this.sfxButton.x=game.config.width-this.sfxButton.width/2;

		 this.sfxButton.y=this.sfxButton.height/1.5;


		 this.sfxButton.setNoScroll();
		 this.scene.add.existing(this);
	}
}