import Phaser from 'phaser'
import Sprite from '../components/Sprite'
import PlayerTag from '../components/PlayerTag'
import * as PlayerObj from '../objects/Player'
import Input from '../components/Input'

import playerMovementSystem from '../systems/playerMovement'
import ecs from '../ECSInstance'

export default class Game extends Phaser.Scene {
	player!: number
	bg!: Phaser.GameObjects.TileSprite

	constructor() {
		super('game')
	}

	create() {
        this.scene.run('ui-scene');

		this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0);
		this.scale.on('resize', this.resize, this);

		this.player = ecs.createEntity();
		const sprite = Sprite;
		sprite.sprite[this.player] = new PlayerObj.default(this, this.scale.width / 2, this.scale.height / 2);
		ecs.addComponent(this.player, PlayerTag);
		ecs.addComponent(this.player, Sprite);
		ecs.addComponent(this.player, Input);

        var camera = this.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight);
        // camera.zoom = 2;
		camera.startFollow(sprite.sprite[this.player]);

		this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
			if (true) {
				var vect = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
				Input.x[this.player] = vect.x;
				Input.y[this.player] = vect.y;
			}
		});
		playerMovementSystem(this)
	}

	resize (gameSize: { width: number; height: number }, baseSize: any, displaySize: any, resolution: any)
	{
		var width = gameSize.width;
		var height = gameSize.height;
	
		this.cameras.resize(width, height);
		this.bg.setSize(width, height);
	}

	update(time: number, delta: number) {
		playerMovementSystem(this)
	}
}