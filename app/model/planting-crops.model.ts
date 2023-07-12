import { BaseModel } from "./base.model";

export class PlantingCrops extends BaseModel{

    private _name: string;

    /**
     *  @param name the name of the plant to create or update for this plant instance
     */
    constructor(id:string, active:boolean, name:string) {
        super(id, active);
        this._name = name;
    }


    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

}
