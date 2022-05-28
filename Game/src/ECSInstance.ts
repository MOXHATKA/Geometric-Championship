import { ECS } from 'wolf-ecs'
class ECSInstance extends ECS
{
    private static _instance: ECSInstance;

    private constructor()
    {
        super();
        ECSInstance._instance = new ECS();
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}

export default ECSInstance.Instance;