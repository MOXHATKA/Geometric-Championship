export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.setPath('/assets/');
        this.load.image('background', 'background2.jpg');
        this.load.bitmapFont('slime', 'click_0.png', 'click.xml');

		this.load.setPath('/assets/characters/Zoya/');
        this.load.aseprite({
			key: 'zoya',
			textureURL: 'zoya.png',
			atlasURL: 'zoya.json'
		});

        this.load.setPath('/assets/enemies');
        this.load.aseprite({
			key: 'bat',
			textureURL: 'bat.png',
			atlasURL: 'bat.json'
		});


    }

    create() {
        this.scene.start('game');
    }
}