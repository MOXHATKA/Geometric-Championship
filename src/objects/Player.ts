export default class Player extends Phaser.Physics.Arcade.Image {
    isAlive: boolean;
    speed: number;
    target: Phaser.Math.Vector2;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player',3);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCircle(14, 3, 6);
        this.setCollideWorldBounds(true);

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
                // var mouseCoords = this.getMouseCoords();
                // this.target.x = mouseCoords.mouseX;
                // this.target.y = mouseCoords.mouseY;

                // console.log("x1: " + pointer.x + " x2: " + this.x + "\ny1: " + pointer.y + " y2: " + this.y );
                //  Add 90 degrees because the sprite is drawn facing up
                // this.rotation = this.scene.physics.moveToObject(this, this.target, this.speed) + 1.5707963267948966;
                this.rotation = this.scene.physics.moveTo(this, this.target.x, this.target.y, this.speed) - 1.5707963267948966;
            }
        });
    }

    getMouseCoords() {
        // Takes a Camera and updates this Pointer's worldX and worldY values so they are the result of a translation through the given Camera.
        this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main);
        const pointer = this.scene.input.activePointer;
        return {
          mouseX: pointer.worldX,
          mouseY: pointer.worldY,
        }
      }

    kill() {
        this.isAlive = false;

        this.body.stop();
    }

    preUpdate() {
        if ("speed" in this.body && this.body.speed > 0 && this.isAlive) {
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 6) {
                this.body.reset(this.target.x, this.target.y);
            }
        }
    }
}