import Player from '../objects/Player';
import Rings from '../objects/Rings';
import Shapes from '../objects/Shapes';
import Shape from '../objects/Shape';
import eventsCenter from '../events/EventsCenter';

export default class MainGame extends Phaser.Scene {
    player!: Player;
    shapes!: Shapes;
    rings!: Rings;

    score: number;
    highscore: number;
    newHighscore: boolean;
    constructor() {
        super('MainGame');

        this.player;
        this.shapes;
        this.rings;

        this.score = 0;
        this.highscore = 0;
        this.newHighscore = false;
    }

    create() {
        this.scene.run('ui-scene');

        this.score = 0;

        this.highscore = this.registry.get('highscore');
        this.newHighscore = false;

        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background');

        this.shapes = new Shapes(this.physics.world, this);
        this.player = new Player(this, window.innerWidth / 2, window.innerHeight / 2);
        
        // camera
        var camera = this.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight);
        camera.zoom = 2;

        // rings
        this.rings = new Rings(this.physics.world, this);
        this.rings.start();
        this.rings.playAnimation('ring');

        this.input.once('pointerdown', () => {

            this.player.start();
            this.player.anims.play({ key: 'player', repeat: -1 })

            this.shapes.start();
            camera.startFollow(this.player);
            // this.sound.play('start');
        });

        this.physics.add.overlap(this.player, this.rings, (player, ring) => this.playerHitPickup(player, ring));
        this.physics.add.overlap(this.player, this.shapes, (player, figure) => this.playerHitShape(player, figure));
    }

    playerHitShape(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, germ: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        if ((player as Player).isAlive && (germ as Shape).alpha === 1) {
            this.gameOver();
        }
    }

    playerHitPickup(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, ring: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        this.score++;

        eventsCenter.emit('update-count', this.score);
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

        this.rings.collect(ring);
    }

    gameOver() {
        this.player.kill();
        this.shapes.stop();

        // this.sound.stopAll();
        // this.sound.play('fail');
        eventsCenter.emit('game-over', this.score);

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