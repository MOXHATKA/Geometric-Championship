export default class Player extends Phaser.Physics.Arcade.Sprite {
    isAlive: boolean;
    speed: number;
    target: Phaser.Math.Vector2;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        this.setScale(1.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.isAlive = false;

        this.speed = 280;
        this.target = new Phaser.Math.Vector2();

    }

    start() {
        this.isAlive = true;
        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer ) => {
            if (this.isAlive) {
                var vect = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
                this.target.x = vect.x;
                this.target.y = vect.y;
                this.rotation = this.scene.physics.moveTo(this, this.target.x, this.target.y, this.speed) - 1.5707963267948966;
            }
        });
    }

    kill() {
        this.isAlive = false;

        this.body.stop();
    }

    // preUpdate() {

    //     // stop move
    //     if ("speed" in this.body && this.body.speed > 0 && this.isAlive) {
    //         if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 6) {
    //             this.body.reset(this.target.x, this.target.y);
    //         }
    //     }
    // }
}