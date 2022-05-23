import Figure from './Shape';

export default class Shapes extends Phaser.Physics.Arcade.Group
{
    germConfig: { animation: string; speed: number; }[];
    timedEvent: Phaser.Time.TimerEvent | undefined;
    constructor (world: Phaser.Physics.Arcade.World, scene: Phaser.Scene)
    {
        super(world, scene);

        this.classType = Figure;

        this.germConfig = [
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
        const rndHeight = Phaser.Math.RND.between(10, height);
        const rndWidth = Phaser.Math.RND.between(10, width);

        let figure1 = new Figure(this.scene, Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'circle', 5);
        let figure2 = new Figure(this.scene, Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'rectangle', 5);
        let figure3 = new Figure(this.scene, Phaser.Math.RND.between(10, width), Phaser.Math.RND.between(10, height), 'rect', 5);

        this.add(figure1, true);
        this.add(figure2, true);
        this.add(figure3, true);

        figure1.start(1000);
        figure2.start(2000);
        figure3.start(3000);

        this.timedEvent = this.scene.time.addEvent({ delay: 2000, callback: this.releaseGerm, callbackScope: this, loop: true });
    }

    stop ()
    {
        this.timedEvent!.remove();

        this.getChildren().forEach((child: any) => {

            child.stop();

        });
    }

    releaseGerm ()
    {
        const x = Phaser.Math.RND.between(0, window.innerWidth);
        const y = Phaser.Math.RND.between(0, window.innerHeight);


        let config = Phaser.Math.RND.pick(this.germConfig);
        let germ : Figure | undefined;// = new Germ(this.scene, x, y, config.animation, config.speed);

        this.getChildren().forEach((child: any) => {

            if (child.anims.getName() === config.animation && !child.active)
            {
                //  We found a dead matching germ, so resurrect it
                germ = child;
            }

        });

        if (germ)
        {
            germ.restart(x, y);
        }
        else
        {
            germ = new Figure(this.scene, x, y, config.animation, config.speed);

            this.add(germ, true);

            germ.start();
        }
    }
}