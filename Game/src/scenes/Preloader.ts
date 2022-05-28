export default class Preloader extends Phaser.Scene {
    loadText: Phaser.GameObjects.BitmapText | undefined;
    constructor() {
        super('Preloader');
    }

    preload() {
        this.add.image(0, 0, 'background');

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
            key: 'ring',
            textureURL: 'ring.png',
            atlasURL: 'ring.json'
        }); 

        this.load.setPath('/assets/characters/Zoya/');
        this.load.aseprite({
            key: 'zoya',
            textureURL: 'zoya.png',
            atlasURL: 'zoya.json'
        }); 
        //  Audio ...
        // this.load.setPath('assets/sounds/');
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
        // this.anims.create({
        //     key: 'zoya',
        //     frames: this.anims.generateFrameNames('zoya'),
        //     frameRate: 8,
        //     repeat: -1
        // });
        this.anims.create({
            key: 'ring',
            frames: this.anims.generateFrameNames('ring'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.createFromAseprite('zoya');

        this.scene.start('MainMenu');

    }
}