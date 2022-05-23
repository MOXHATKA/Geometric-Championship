export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // this.load.setPath('/assets/games/germs/');
        this.load.setPath('/assets/');

        this.load.image('background', 'background.jpeg');
        // this.load.bitmapFont('slime', 'slime-font.png', 'slime-font.xml');
        this.load.bitmapFont('slime', 'click_0.png', 'click.xml');
    }

    create() {
        this.registry.set('highscore', 0);

        this.scene.start('Preloader');

    }
}