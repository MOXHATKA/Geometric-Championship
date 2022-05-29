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
            key: 'Zoya',
            textureURL: 'zoya.png',
            atlasURL: 'zoya.json'
        });

        this.load.setPath('/assets/enemies');
        this.load.aseprite({
            key: 'Bat',
            textureURL: 'bat.png',
            atlasURL: 'bat.json'
        });


    }

    create() {
        // this.anims.create({
        //     key: 'zoya',
        //     repeat: -1,
        //     frames: this.anims.generateFrameNames('zoya')
        //   });
        // this.anims.create({
        //     key: 'Zoya_Idle',
        //     repeat: -1, 
        //     frameRate: 2,
        //     frames: this.anims.generateFrameNames('zoya', { start: 0, end: 1}), //start: 0, end: 1
        // });
        // this.anims.create({
        //     key: 'Zoya_Run',
        //     repeat: -1, 
        //     frameRate: 8,
        //     frames: this.anims.generateFrameNames('zoya', { start: 2, end: 5}), //start: 0, end: 1
        // });
        this.anims.createFromAseprite('Zoya');
        this.anims.createFromAseprite('Bat');

        this.scene.start('game');
    }
}