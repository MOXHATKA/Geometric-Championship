import Phaser from 'phaser'
import ecs from '../ECSInstance'

import Sprite from '../components/Sprite'
import { any } from 'wolf-ecs'
import Input from '../components/Input'

export default function movementSystem(scene: Phaser.Scene): void {
	const movementQuery = ecs.createQuery(any(Sprite), any(Input))

	movementQuery.forEach(id => {
		const sprite = Sprite.sprite[id];
		// if (sprite.body.speed > 0) {
		// 	if (Phaser.Math.Distance.Between(sprite.x, sprite.y, Input.x[id], Input.y[id]) < 6) {
		// 		sprite.body.reset(Input.x[id], Input.y[id]);
		// 		// sprite.body.stop();
		// 	}
		// }
		const vectA = new Phaser.Math.Vector2;
		vectA.x = sprite.x;
		vectA.y = sprite.y;
		const vectB = new Phaser.Math.Vector2;
		vectB.x = Input.x[id];
		vectB.y = Input.y[id];

		var vect = new Phaser.Math.Vector2;
		vect = vectB.subtract(vectA).normalize();
		if (Input.x[id] != 0 && Input.y[id] != 0 && (Math.abs(vect.x) > 0.5 || Math.abs(vect.y) > 0.5))
			// scene.physics.moveTo(sprite, Input.x[id], Input.y[id], 300)
			// scene.matter.body.applyForce(sprite);
			sprite.setVelocity(Math.round(vect.x * 5), Math.round(vect.y * 5));
		// console.log(vect);
	})
}