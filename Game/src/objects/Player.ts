export default class Player extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'zoya');
        this.setScale(2);

        scene.add.existing(this);
        scene.physics.add.existing(this);

    }
}