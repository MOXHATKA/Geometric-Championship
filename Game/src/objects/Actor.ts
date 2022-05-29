export default class Actor extends Phaser.Physics.Matter.Sprite {
    // declare body: this.body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene.matter.world, x, y, texture);
        this.setScale(2);
        scene.add.existing(this);
        scene.matter.body.setInertia(this.body.gameObject, Infinity);
        scene.matter.body.setAngularVelocity(this.body.gameObject, 0);

        // scene.physics.add.existing(this);
        // this.setOrigin(0.5, 0.5);
        // this.setCircle(14, 0, 0);
        // this.setCollideWorldBounds(true);
    }

}