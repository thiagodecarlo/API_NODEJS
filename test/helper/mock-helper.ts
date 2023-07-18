import { Crop } from '../../app/model/crop.model';
import { Farm } from '../../app/model/farm.model';

export class MockHelper {
  private getCrop(): Crop {
    const plantingCrop: Crop = new Crop();
    plantingCrop.name = 'string';
    return plantingCrop;
  }

  private getAllCrops(): Crop[] {
    return new Array(this.getCrop());
  }

  private getruralProducer(): Farm {
    const ruralProducer: Farm = new Farm();
    ruralProducer.name = 'string';
    return ruralProducer;
  }

  private getAllFarms(): Farm[] {
    return new Array(this.getruralProducer());
  }
}
