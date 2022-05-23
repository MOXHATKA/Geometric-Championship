// import Germs from './Germs';
import Player from '../objects/Player';
import Pickups from '../objects/Pickups';
import Shapes from '../objects/Shapes';
import Shape from '../objects/Shape';

export default class MainGame extends Phaser.Scene {
    player!: Player;
    germs: any;
    pickups: any;
    introText: any;
    scoreText: any;
    score: number;
    highscore: number;
    newHighscore: boolean;
    constructor() {
        super('MainGame');

        this.player;
        this.germs;
        this.pickups;

        this.introText;
        this.scoreText;
        this.score = 0;
        this.highscore = 0;
        this.newHighscore = false;
    }

    create() {
        this.score = 0;
        this.highscore = this.registry.get('highscore');
        this.newHighscore = false;

        let bg = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setScale(100).setScrollFactor(0);
        this.germs = new Shapes(this.physics.world, this);

        this.pickups = new Pickups(this.physics.world, this);

        this.player = new Player(this, 400, 400);

        // camera
        // var camera = this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
        // camera.startFollow(this.player );

        this.scoreText = this.add.bitmapText(16, 32, 'slime', 'Score   0', 40).setDepth(1);

        this.introText = this.add.bitmapText(window.innerWidth / 2, window.innerHeight / 2, 'slime', 'Avoid the Geometric Figures\nCollect the Rings', 60).setOrigin(0.5).setCenterAlign().setDepth(1);

        this.pickups.start();

        this.input.once('pointerdown', () => {

            this.player.start();
            this.germs.start();

            // this.sound.play('start');

            this.tweens.add({
                targets: this.introText,
                alpha: 0,
                duration: 300
            });

        });

        this.physics.add.overlap(this.player, this.pickups, (player, pickup) => this.playerHitPickup(player, pickup));
        this.physics.add.overlap(this.player, this.germs, (player, germ) => this.playerHitGerm(player, germ));
    }

    playerHitGerm(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, germ: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        //  We don't count a hit if the germ is fading in or out
        if ((player as Player).isAlive && (germ as Shape).alpha === 1) {
            this.gameOver();
        }
    }

    playerHitPickup(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, pickup: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        this.score++;

        this.scoreText.setText('Score   ' + this.score);

        // if (!this.newHighscore && this.score > this.highscore) {
        //     if (this.highscore > 0) {
        //         //  Only play the victory sound if they actually set a new highscore
        //         this.sound.play('victory');
        //     } else {
        //         this.sound.play('pickup');
        //     }

        //     this.newHighscore = true;
        // } else {
        //     this.sound.play('pickup');
        // }

        this.pickups.collect(pickup);
    }

    gameOver() {
        this.player.kill();
        this.germs.stop();

        // this.sound.stopAll();
        // this.sound.play('fail');

        this.introText.setText('Game Over!');

        this.tweens.add({
            targets: this.introText,
            alpha: 1,
            duration: 300
        });

        if (this.newHighscore) {
            this.registry.set('highscore', this.score);
        }

        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }

    getPlayer(target: { x: number; y: number; }) {
        target.x = this.player.x;
        target.y = this.player.y;

        return target;
    }
}