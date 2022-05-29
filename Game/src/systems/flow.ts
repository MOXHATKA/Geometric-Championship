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
		if (sprite.body.speed > 0) {
			if (Phaser.Math.Distance.Between(sprite.x, sprite.y, Target.sprite[id].x, Target.sprite[id].y,) < 6) {
				sprite.body.reset(sprite.x, sprite.y);
			}
		}
		if (Phaser.Math.Distance.Between(sprite.x, sprite.y, Target.sprite[id].x, Target.sprite[id].y) >= 6 ) 

			scene.physics.moveTo(Sprite.sprite[id], Target.sprite[id].x, Target.sprite[id].y, 200)
	})
}