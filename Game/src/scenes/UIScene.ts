import eventsCenter from "../events/EventsCenter";

export default class UIScene extends Phaser.Scene
{
	scoreText!: Phaser.GameObjects.BitmapText;
	introText!: Phaser.GameObjects.BitmapText;
	constructor()
	{
		super('ui-scene')
	}

	create()
	{
		this.scoreText = this.add.bitmapText(32,32, 'slime', 'Score   0', 40).setDepth(1).setScrollFactor(0);
        this.introText = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2, 'slime', 'Avoid the Geometric Figures\nCollect the Rings', 60).setOrigin(0.5).setCenterAlign().setDepth(1);

	
		// listen to 'update-count' event and call `updateCount()`
		// when it fires
		eventsCenter.on('update-count', this.updateCount, this)
		eventsCenter.on('game-over', this.gameOver, this)

		// clean up when Scene is shutdown
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			eventsCenter.off('update-count', this.updateCount, this)
		})
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			eventsCenter.off('game-over', this.gameOver, this)
		})

        this.input.once('pointerdown', () => {
            this.tweens.add({
                targets: this.introText,
                alpha: 0,
                duration: 300
            });
        });
	}

	gameOver(){
		this.introText.setText('Game Over!');

        this.tweens.add({
            targets: this.introText,
            alpha: 1,
            duration: 300
        });
		
		this.input.once('pointerdown', () => {
			this.tweens.add({
				targets: this.introText,
				alpha: 0,
				duration: 300
			});
        });
	}

	updateCount(count: number)
	{
        this.scoreText.setText('Score   ' + count);
	}
	
}