import Actor from "./Actor";

export default class Enemy extends Actor {
    // declare body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number,  texture: string ){
        super(scene, x, y, texture);

    }
}