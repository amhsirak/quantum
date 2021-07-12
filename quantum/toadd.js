# In scene A
this.scene.launch('sceneB')
this.scene.pause();

# Then in sceneB, you can return to sceneA:
button.on('pointerdown', function() {
    this.scene.resume('sceneA');
    this.scene.stop();
})