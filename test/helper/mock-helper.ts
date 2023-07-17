import { RuralProducer } from '../../app/model/farm.model';
import { PlantingCrop } from '../../app/model/planting-crop.model';

export class MockHelper {
  private getPlantingCrop(): PlantingCrop {
    const plantingCrop: PlantingCrop = new PlantingCrop();
    plantingCrop.name = 'string';
    return plantingCrop;
  }

  private getAllPlantingCrops(): PlantingCrop[] {
    return new Array(this.getPlantingCrop());
  }

  private getruralProducer(): RuralProducer {
    const ruralProducer: RuralProducer = new RuralProducer();
    ruralProducer.name = 'string';
    return ruralProducer;
  }

  private getAllRuralProducers(): RuralProducer[] {
    return new Array(this.getruralProducer());
  }
}
