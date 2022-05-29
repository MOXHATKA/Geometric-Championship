import Phaser from 'phaser'
import ecs from '../ECSInstance'

import { any } from 'wolf-ecs'
import StateAnimation from '../components/StateAnimation'
import { State } from '../components/StateAnimation'
import Sprite from '../components/Sprite'
import Player from '../objects/Player'

export default function animationSystem(scene: Phaser.Scene): void {
    const animationQuery = ecs.createQuery(any(StateAnimation), any(Sprite))


    animationQuery.forEach(id => {
        const sprite = Sprite.sprite[id];
        const name = sprite.texture.key;

        // if (sprite.body.speed == 0) {
        //     sprite.anims.play({ key: State[State.Idle], repeat: -1 }, true);
        // }
        // else if (sprite.body.speed > 0) {
        //     sprite.play({ key: State[State.Run], repeat: -1 }, true);
        // }

        // if (sprite.body.speed == 0 && sprite instanceof Player) {
        //     sprite.anims.play({ key: name + '_Idle', repeat: -1 }, true);
        // }
        // else if (sprite.body.speed > 0) {
        //     sprite.play({ key: name + '_Run', repeat: -1 }, true);
        // }

        if (sprite.body.velocity.x < 0)
            sprite.setFlipX(true);
        else if (sprite.body.velocity.x > 0)
            sprite.setFlipX(false);

    })
}