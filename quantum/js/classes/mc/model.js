class Model
{
	constructor()
	{
		this._score=0;
		this.soundOn=true;
		this._musicOn=true;
	}
	set musicOn(val)
	{
		this._musicOn=val;
		console.log("music changed");
		emitter.emit(G.MUSIC_CHANGED);
	}
	get musicOn()
	{
		return this._musicOn;
	}
	set score(val)
	{
		this._score=val;
		console.log("score updated!");
		emitter.emit(G.SCORE_UPDATED);
	}
	get score()
	{
		return this._score;
	}
}