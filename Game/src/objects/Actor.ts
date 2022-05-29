export default class Actor extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.setScale(2);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.setOrigin(0.5, 0.5);
        // this.setCircle(14, 0, 0);
        // this.setCollideWorldBounds(true);
    }

}