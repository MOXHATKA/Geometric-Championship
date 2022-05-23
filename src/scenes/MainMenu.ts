export default class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // this.music = this.sound.play('music', { loop: true });
        // this.sound.play('laugh');

        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setScale(100);

        const area = new Phaser.Geom.Rectangle(0, 0, window.innerWidth, window.innerHeight);

        this.addShape(area, 'circle');
        this.addShape(area, 'rectangle');
        this.addShape(area, 'rect');
        this.addShape(area, 'triangle');

        this.add.shader('goo', window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);

        this.add.bitmapText(window.innerWidth / 2, (window.innerHeight / 2), 'slime', 'Geometric Championship', 100).setOrigin(0.5);


        this.add.bitmapText(window.innerWidth / 2, (window.innerHeight / 2) + 200, 'slime', 'Click to Play', 40).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainGame');

        });
    }

    addShape (area: Phaser.Geom.Rectangle, animation: string | Phaser.Animations.Animation | Phaser.Types.Animations.PlayAnimationConfig)
    {
        let start = area.getRandomPoint();

        let shape = this.add.sprite(start.x, start.y, "").play(animation).setScale(3);
        
        let durationX = Phaser.Math.Between(4000, 6000);
        let durationY = durationX + 3000;

        this.tweens.add({
            targets: shape,
            x: {
                getStart: (tween: any, target: any) => {
                    return shape.x;
                },
                getEnd: () => {
                    return area.getRandomPoint().x;
                },
                duration: durationX,
                ease: 'Linear'
            },
            y: {
                getStart: (tween: any, target: any) => {
                    return shape.y;
                },
                getEnd: () => {
                    return area.getRandomPoint().y;
                },
                duration: durationY,
                ease: 'Linear'
            },
            repeat: -1
        });
    }
}