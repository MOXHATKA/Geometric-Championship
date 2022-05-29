import Phaser from 'phaser'
import ecs from '../ECSInstance'

import Sprite from '../components/Sprite'
import { any } from 'wolf-ecs'
import EnemyTag from '../components/EnemyTag'
import Target from '../components/Target'

export default function flowSystem(scene: Phaser.Scene): void {
	const movementQuery = ecs.createQuery(any(Sprite), any(EnemyTag), any(Target))

	movementQuery.forEach(id => {
		const sprite = Sprite.sprite[id];
		// if (sprite.body.speed > 0) {
		// 	if (Phaser.Math.Distance.Between(sprite.x, sprite.y, Target.sprite[id].x, Target.sprite[id].y,) < 6) {
		// 		sprite.body.reset(sprite.x, sprite.y);
		// 	}
		// }
		// if (Phaser.Math.Distance.Between(sprite.x, sprite.y, Target.sprite[id].x, Target.sprite[id].y) >= 6 ) 

		// 	scene.physics.moveTo(Sprite.sprite[id], Target.sprite[id].x, Target.sprite[id].y, 200)
		const vectA = new Phaser.Math.Vector2;
		vectA.x = sprite.x;
		vectA.y = sprite.y;
		const vectB = new Phaser.Math.Vector2;
		vectB.x = Target.sprite[id].x;
		vectB.y = Target.sprite[id].y;

		var vect = new Phaser.Math.Vector2;
		vect = vectB.subtract(vectA).normalize();
		if (Target.sprite[id].x != 0 && Target.sprite[id].x != 0 && (Math.abs(vect.x) > 0.5 || Math.abs(vect.y) > 0.5))
			// scene.physics.moveTo(sprite, Input.x[id], Input.y[id], 300)
			// scene.matter.body.applyForce(sprite);
			sprite.setVelocity(Math.round(vect.x * 5), Math.round(vect.y * 5));
	})
}