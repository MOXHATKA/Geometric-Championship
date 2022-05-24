import Shape from './Shape';

export default class Shapes extends Phaser.Physics.Arcade.Group
{
    shapeConfig: { animation: string; speed: number; }[];
    timedEvent: Phaser.Time.TimerEvent | undefined;
    constructor (world: Phaser.Physics.Arcade.World, scene: Phaser.Scene)
    {
        super(world, scene);

        this.classType = Shape;

        this.shapeConfig = [
            { animation: 'circle', speed: 60 },
            { animation: 'rectangle', speed: 90 },
            { animation: 'rect', speed: 120 },
            { animation: 'triangle', speed: 180 }
        ];
    }

    start ()
    {
        const height = window.innerHeight;
        const width = window.innerWidth;

        let shape1 = new Shape(this.scene, Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'circle', 5);
        let shape2 = new Shape(this.scene, Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'rectangle', 5);
        let shape3 = new Shape(this.scene, Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'rect', 5);

        this.add(shape1, true);
        this.add(shape2, true);
        this.add(shape3, true);

        shape1.start(1000);
        shape2.start(2000);
        shape3.start(3000);

        this.timedEvent = this.scene.time.addEvent({ delay: 2000, callback: this.releaseShape, callbackScope: this, loop: true });
    }

    stop ()
    {
        this.timedEvent!.remove();

        this.getChildren().forEach((child: any) => {

            child.stop();

        });
    }

    releaseShape ()
    {
        const x = Phaser.Math.RND.between(0, window.innerWidth);
        const y = Phaser.Math.RND.between(0, window.innerHeight);


        let config = Phaser.Math.RND.pick(this.shapeConfig);
        let shape : Shape | undefined;

        this.getChildren().forEach((child: any) => {

            if (child.anims.getName() === config.animation && !child.active)
            {
                shape = child;
            }

        });

        if (shape)
        {
            shape.restart(x, y);
        }
        else
        {
            shape = new Shape(this.scene, x, y, config.animation, config.speed);

            this.add(shape, true);

            shape.start();
        }
    }
}