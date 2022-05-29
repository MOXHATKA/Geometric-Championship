import { types } from 'wolf-ecs'
import ecs from '../ECSInstance'
import Actor from '../objects/Actor'

export const Target = ecs.defineComponent({
	sprite: types.custom<Actor>()
})

export default Target