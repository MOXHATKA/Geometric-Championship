export default class Player extends Phaser.Physics.Arcade.Sprite {
    isAlive: boolean;
    speed: number;
    target: Phaser.Math.Vector2;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'zoya');
        this.setScale(1.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.isAlive = false;
        this.speed = 280;
        this.target = new Phaser.Math.Vector2();
        // this.setListeners();
    }

    start() {
        this.isAlive = true;
        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (this.isAlive) {
                var vect = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
                this.target.x = vect.x;
                this.target.y = vect.y;
                console.log(this.anims.currentAnim);
                // this.rotation = this.scene.physics.moveTo(this, this.target.x, this.target.y, this.speed) - 1.5707963267948966;
                this.scene.physics.moveTo(this, this.target.x, this.target.y, this.speed) - 1.5707963267948966;
            }
        });
        this.on('animationupdate', this.setListeners)
    }

    setListeners(){
        this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.handleMovement, this)
       }

    handleMovement() {
        // Animations

        if (this.body.velocity.x !== 0) {
            (!this.anims.isPlaying || this.anims.getName() !== 'Run') &&
                this.play({key: 'Run', repeat: -1}, true); // here
                console.log('Run');
        }
        else {
            (!this.anims.isPlaying || this.anims.getName() !== 'Idle') &&
                this.play({key: 'Idle', repeat: -1}, true); // and here
                console.log('Idle');

        }

    }

    kill() {
        this.isAlive = false;

        this.body.stop();
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        // stop move
        if ("speed" in this.body && this.body.speed > 0 && this.isAlive) {
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 6) {
                this.body.reset(this.target.x, this.target.y);
            }
        }
    }
}