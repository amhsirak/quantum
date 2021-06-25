class Controller
{
	constructor()
	{
		emitter.on(G.SET_SCORE,this.setScore);
		emitter.on(G.UP_POINTS,this.upPoints);
		emitter.on(G.TOGGLE_SOUND,this.toggleSound);
		emitter.on(G.TOGGLE_MUSIC,this.toggleMusic);
	}
	toggleSound(val)
	{
		model.soundOn=val;
	}
	toggleMusic(val)
	{
		model.musicOn=val;
	}
	setScore(score)
	{
		model.score=score;
	}
	upPoints(points)
	{
		var score=model.score;
		score+=points;
		model.score=score;
	}
}