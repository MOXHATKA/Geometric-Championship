import { types } from 'wolf-ecs'
import ecs from '../ECSInstance'

export enum State {
    Idle,
    Run,
    Fly,
    Zoya,
    Bat
}

const StateAnimation = ecs.defineComponent({
    state: types.any
})

export default StateAnimation