import { BaseModel } from "./base.model";
import { PlantingCrops } from "./planting-crops.model";

export class RuralProducer extends BaseModel{
    
    private _name: string;
    private _document: string;
    private _propertyName: string;
    private _city: string;
    private _state: string;
    private _totalArea: number;
    private _arableArea: number;
    private _vegetationArea: number;
    private _plantingCrops: PlantingCrops[];


    constructor(id:string, active:boolean, name: string, document:string, propertyName:string, city:string, state:string, totalArea:number, 
        arableArea:number, vegetationArea:number) {
        super(id, active);
        this.name = name;
        this.document = document;
        this.propertyName = propertyName;
        this.city = city;
        this.state = state;
        this.totalArea = totalArea;
        this.arableArea = arableArea;
        this.vegetationArea = vegetationArea;
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(newName: string) {
        this._name = newName;
    }
    
    
    public get document(): string {
        return this._document;
    }
    public set document(newDocument: string) {
        this._document = newDocument;
    }
    
    
    public get propertyName(): string {
        return this._propertyName;
    }
    public set propertyName(newPropertyName: string) {
        this._propertyName = newPropertyName;
    }
    
    
    public get city(): string {
        return this._city;
    }
    public set city(newCity: string) {
        this._city = newCity;
    }
    
    
    public get state(): string {
        return this._state;
    }
    public set state(newState: string) {
        this._state = newState;
    }
    
    
    public get totalArea(): number {
        return this._totalArea;
    }
    public set totalArea(newTotalArea: number) {
        this._totalArea = newTotalArea;
    }
    
    
    public get arableArea(): number {
        return this._arableArea;
    }
    public set arableArea(newArableArea: number) {
        this._arableArea = newArableArea;
    }
    
    
    public get vegetationArea(): number {
        return this._vegetationArea;
    }
    public set vegetationArea(newVegetationArea: number) {
        this._vegetationArea = newVegetationArea;
    }
    
    
    public get plantingCrops(): PlantingCrops[] {
        return this._plantingCrops;
    }
    // public set plantingCrops(newPlantingCrops: PlantingCrops[]) {
    //     if (newPlantingCrops != null && newPlantingCrops.length !== 0) {
    //         this._plantingCrops = newPlantingCrops;
    //     }
    // }

   
}