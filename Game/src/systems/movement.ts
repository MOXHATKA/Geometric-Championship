import Phaser from 'phaser'
import ecs from '../ECSInstance'

import Sprite from '../components/Sprite'
import { any } from 'wolf-ecs'
import Input from '../components/Input'

export default function movementSystem(scene: Phaser.Scene): void {
	const movementQuery = ecs.createQuery(any(Sprite), any(Input))

	movementQuery.forEach(id => {
		const sprite = Sprite.sprite[id];
		if (sprite.body.speed > 0) {
			if (Phaser.Math.Distance.Between(sprite.x, sprite.y, Input.x[id], Input.y[id]) < 6) {
				sprite.body.reset(Input.x[id], Input.y[id]);
				// sprite.body.stop();
			}
		}
		if (Input.x[id] != 0 && Input.y[id] != 0 && Phaser.Math.Distance.Between(sprite.x, sprite.y, Input.x[id], Input.y[id]) >= 6 ) 
			scene.physics.moveTo(sprite, Input.x[id], Input.y[id], 300)

	})
}