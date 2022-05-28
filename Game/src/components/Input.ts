import { types } from 'wolf-ecs'
import ecs from '../ECSInstance'

const Input = ecs.defineComponent({
	x: types.int,
	y:  types.int,
	speed: types.int
})

export default Input