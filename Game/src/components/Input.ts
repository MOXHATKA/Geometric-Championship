import { types } from 'wolf-ecs'
import ecs from '../ECSInstance'

const Input = ecs.defineComponent({
	x: types.f32,
	y:  types.f32,
	speed: types.int
})

export default Input