export default class Preloader extends Phaser.Scene {
    loadText: Phaser.GameObjects.BitmapText | undefined;
    constructor() {
        super('Preloader');
    }

    preload() {
        this.add.image(0, 0, 'background'); //setSize(window.innerHeight, window.innerWidth);

        this.loadText = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2, 'slime', 'Loading ...', 80).setOrigin(0.5);

        this.load.setPath('/assets/');
        this.load.glsl('goo', 'goo.glsl');

        this.load.aseprite({
            key: 'circle',
            textureURL: 'circle.png',
            atlasURL: 'circle.json'
        }); 

        this.load.aseprite({
            key: 'rectangle',
            textureURL: 'rectangle.png',
            atlasURL: 'rectangle.json'
        }); 
        this.load.aseprite({
            key: 'rect',
            textureURL: 'rect.png',
            atlasURL: 'rect.json'
        }); 
        this.load.aseprite({
            key: 'triangle',
            textureURL: 'triangle.png',
            atlasURL: 'triangle.json'
        });

        this.load.aseprite({
            key: 'player',
            textureURL: 'player.png',
            atlasURL: 'player.json'
        }); 
        
        this.load.aseprite({
            key: 'ring',
            textureURL: 'ring.png',
            atlasURL: 'ring.json'
        }); 
        // this.load.aseprite({
        //     key: 'figures',
        //     textureURL: 'Figures.png',
        //     atlasURL: 'Figures.json'
        // });
        // //  Audio ...
        // this.load.setPath('assets/games/germs/sounds/');

        // this.load.audio('appear', ['appear.ogg', 'appear.m4a', 'appear.mp3']);
        // this.load.audio('fail', ['fail.ogg', 'fail.m4a', 'fail.mp3']);
        // this.load.audio('laugh', ['laugh.ogg', 'laugh.m4a', 'laugh.mp3']);
        // this.load.audio('music', ['music.ogg', 'music.m4a', 'music.mp3']);
        // this.load.audio('pickup', ['pickup.ogg', 'pickup.m4a', 'pickup.mp3']);
        // this.load.audio('start', ['start.ogg', 'start.m4a', 'start.mp3']);
        // this.load.audio('victory', ['victory.ogg', 'victory.m4a', 'victory.mp3']);
    }

    create() {
        //  Create our global animations
        // this.anims.createFromAseprite('circle');
        // this.anims.createFromAseprite('figures');

        this.anims.create({
            key: 'circle',
            frames: this.anims.generateFrameNames('circle'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'rectangle',
            frames: this.anims.generateFrameNames('rectangle'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'rect',
            frames: this.anims.generateFrameNames('rect'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'triangle',
            frames: this.anims.generateFrameNames('triangle'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNames('player'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'ring',
            frames: this.anims.generateFrameNames('ring'),
            frameRate: 8,
            repeat: -1
        });
        // this.anims.create({
        //     key: 'figure2',
        //     frames: this.anims.generateFrameNames('figures'),
        //     frameRate: 8,
        //     repeat: -1
        // });

        // if (this.sound.locked) {
        //     this.loadText.setText('Click to Start');

        //     this.input.once('pointerdown', () => {

        //         this.scene.start('MainMenu');

        //     });
        // } else {
        //     this.scene.start('MainMenu');
        // }

        this.scene.start('MainMenu');

    }
}