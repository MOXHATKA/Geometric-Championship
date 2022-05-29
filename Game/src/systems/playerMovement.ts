import Phaser from "phaser";
import ecs from "../ECSInstance";

import Sprite from "../components/Sprite";
import { any } from "wolf-ecs";
import Input from "../components/Input";

export default function playerMovementSystem(scene: Phaser.Scene): void {
    const spriteQuery = ecs.createQuery(any(Sprite), any(Input));

    spriteQuery.forEach((id) => {
        if (Sprite.sprite[id].body.speed > 0) {
            if (
                Phaser.Math.Distance.Between(
                    Sprite.sprite[id].x,
                    Sprite.sprite[id].y,
                    Input.x[id],
                    Input.y[id]
                ) < 6
            ) {
                Sprite.sprite[id].body.reset(Input.x[id], Input.y[id]);
            }
        }
        if (
            Input.x[id] != 0 &&
            Input.y[id] != 0 &&
			Phaser.Math.Distance.Between(
				Sprite.sprite[id].x,
				Sprite.sprite[id].y,
				Input.x[id],
				Input.y[id]
			) >= 6
        ) {
            scene.physics.moveTo(
                Sprite.sprite[id],
                Input.x[id],
                Input.y[id],
                300
            );
        }
    });
}
