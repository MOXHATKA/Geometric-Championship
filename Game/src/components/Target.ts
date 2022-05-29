import { types } from 'wolf-ecs'
import ecs from '../ECSInstance'
import Player from '../objects/Player'

export const Target = ecs.defineComponent({
	sprite: types.custom<Player>()
})

export default Target