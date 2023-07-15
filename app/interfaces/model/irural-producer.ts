import { IBaseModel } from './ibase-model';

export interface IRuralProducer extends IBaseModel {
  name: string;
  document: string;
  propertyName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
}
