import Phaser from "phaser";
import ecs from "../ECSInstance";

import Sprite from "../components/Sprite";
import { any, not } from "wolf-ecs";
import Input from "../components/Input";
import PlayerNetTag from "../components/PlayerNetTag";
import PlayerTag from "../components/PlayerTag";

export default function playerNetMovementSystem(scene: Phaser.Scene): void {
    const spriteQuery = ecs.createQuery(
        any(Sprite),
        any(Input),
        any(PlayerNetTag),
        not(PlayerTag)
    );

    spriteQuery.forEach((id) => {
        // if (Sprite.sprite[id].body.speed > 0) {
        // 	if (Phaser.Math.Distance.Between(Sprite.sprite[id].x, Sprite.sprite[id].y, Input.x[id], Input.y[id]) < 6) {
        // 		Sprite.sprite[id].body.reset(Input.x[id], Input.y[id]);
        // 	}
        // }
        // console.debug(id +" "+ Input.x[id] + " " + Input.y[id]);
        if (Input.x[id] != 0 && Input.y[id] != 0) {
            // console.debug(Input.x[id] + " " + Input.y[id]);
            scene.physics.moveTo(
                Sprite.sprite[id],
                Input.x[id],
                Input.y[id],
                300
            );
        }
    });
}
