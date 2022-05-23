export default class Pickups extends Phaser.Physics.Arcade.Group
{
    outer: Phaser.Geom.Rectangle;
    target: Phaser.Geom.Point;
    constructor (world: Phaser.Physics.Arcade.World, scene: Phaser.Scene)
    {
        super(world, scene);

        this.outer = new Phaser.Geom.Rectangle(64, 64, window.innerWidth, window.innerHeight);
        this.target = new Phaser.Geom.Point();
    }

    start ()
    {
        const height = window.innerHeight;
        const width = window.innerWidth;

        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
        this.create(Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'ring', 'ring');
    }

    collect (pickup: { body: { reset: (arg0: any, arg1: any) => void; }; })
    {
        //  Move the pick-up to a new location

        this.outer.getRandomPoint(this.target);

        pickup.body.reset(this.target.x, this.target.y);
    }
}