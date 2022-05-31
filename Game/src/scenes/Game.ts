import Phaser from "phaser";
import Sprite from "../components/Sprite";
import PlayerTag from "../components/PlayerTag";
import Player from "../objects/Player";
import Input from "../components/Input";
import eventsCenter from "../events/EventsCenter";
import * as matter from 'matter-js'
import movementSystem from "../systems/movement";
import ecs from "../ECSInstance";
import EnemyTag from "../components/EnemyTag";
import Enemy from "../objects/Enemy";
import Target from "../components/Target";
import flowSystem from "../systems/flow";
import StateAnimation from "../components/StateAnimation";
import animationSystem from "../systems/animation";

export default class Game extends Phaser.Scene {
    bg!: Phaser.GameObjects.TileSprite;
    player!: number;
    // enemy!: number
    timer: number;
    constructor() {
        super("game");
        this.timer = 0;
    }

    create() {
        this.matter.world.disableGravity();
        this.matter.world.setBounds();
        this.scene.run("ui-scene");
        this.bg = this.add
            .tileSprite(0, 0, this.scale.width, this.scale.height, "background")
            .setOrigin(0);
        // this.scale.on("resize", this.resize, this);

        this.player = ecs.createEntity();
        const sprite = Sprite;

        sprite.sprite[this.player] = new Player(
            this,
            this.scale.width / 2,
            this.scale.height / 2,
            "Zoya"
        );
        Sprite.sprite[this.player].setCollidesWith(0);
        // const stateAnimation = Idle;
        ecs.addComponent(this.player, PlayerTag);
        ecs.addComponent(this.player, Sprite);
        ecs.addComponent(this.player, Input);
        ecs.addComponent(this.player, StateAnimation);

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (true) {
                var vect = pointer.positionToCamera(
                    this.cameras.main
                ) as Phaser.Math.Vector2;
                Input.x[this.player] = vect.x;
                Input.y[this.player] = vect.y;
            }
        });
        const target = Target;
        for (let i = 0; i < 3000; i++) {
            const enemy = ecs.createEntity();
            const x = Phaser.Math.RND.between(0, window.innerWidth * 3);
            const y = Phaser.Math.RND.between(0, window.innerHeight * 3);
            target.sprite[enemy] = sprite.sprite[this.player];
            sprite.sprite[enemy] = new Enemy(this, x, y, "Bat");
			matter.Body.setInertia(sprite.sprite[enemy].body as matter.Body, Infinity);
			ecs.addComponent(enemy, EnemyTag);
            ecs.addComponent(enemy, Sprite);
            ecs.addComponent(enemy, target);
            ecs.addComponent(enemy, StateAnimation);
            sprite.sprite[enemy].setOnCollide(() => {
                var timeCol = Sprite.collisionTime[enemy];
                if (timeCol == 0) return;
                Sprite.collisionTime[enemy] = 8;
            });
        }
        // // this.enemy = ecs.createEntity();

        // // const target = Target;
        // // target.sprite[this.enemy] = sprite.sprite[this.player];
        // // sprite.sprite[this.enemy] = new Enemy(this, 500, 500, 'Bat');

        // // ecs.addComponent(this.enemy, EnemyTag);
        // // ecs.addComponent(this.enemy, Sprite);
        // // ecs.addComponent(this.enemy, target);
        // // ecs.addComponent(this.enemy, StateAnimation);

        var camera = this.cameras.main.setBounds(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
        camera.zoom = 0.5;
        camera.startFollow(sprite.sprite[this.player]);
        this.time.addEvent({
            delay: 150,
            callback: () => {
                flowSystem(this);
            },
            loop: true,
        });
    }

    update(time: number, delta: number) {
        var fps = Math.round((1 / delta) * 1000);
        eventsCenter.emit("update-count", fps);
        movementSystem(this);
        animationSystem(this);
    }

    resize(
        gameSize: { width: number; height: number },
        baseSize: any,
        displaySize: any,
        resolution: any
    ) {
        var width = gameSize.width;
        var height = gameSize.height;

        this.cameras.resize(width, height);
        this.bg.setSize(width, height);
    }
}
