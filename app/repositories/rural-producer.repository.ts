import { PlantingCrop } from '../model/planting-crop.model';
import { RuralProducer } from '../model/rural-producer.model';
import { RepositoryBase } from './repository-base';

export class RuralProducerRepository extends RepositoryBase<
  RuralProducer,
  IRuralProducer
> {
  constructor() {
    super(RuralProducer);
  }

  public override async getAll(): Promise<RuralProducer[]> {
    console.log(`override getAll`);

    try {
      const entities = await RuralProducer.findAll({
        include: [
          {
            model: PlantingCrop,
            through: {
              attributes: ['id'],
            },
          },
        ],
      });
      return entities;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }

  public async create(
    ruralProducer: Partial<RuralProducer>
  ): Promise<RuralProducer> {
    try {
      const createdRuralProducer = await RuralProducer.create(ruralProducer);
      return createdRuralProducer;
    } catch (error) {
      throw new Error('Error creating RuralProducer in database');
    }
  }

  public async update(
    id: number,
    updates: Partial<RuralProducer>
  ): Promise<RuralProducer | null> {
    try {
      const ruralProducer = await RuralProducer.findByPk(id);
      ruralProducer?.setDataValue('PlantingCrops', 1);
      if (ruralProducer) {
        updates.updatedAt = new Date();
        const updated = await ruralProducer.update(updates);
        return updated;
      }
      return null;
    } catch (error) {
      throw new Error('Error when updating RuralProducer in the database');
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const ruralProducer = await RuralProducer.findByPk(id);
      if (ruralProducer) {
        await ruralProducer.destroy();
      }
    } catch (error) {
      throw new Error('Error deleting RuralProducer from database');
    }
  }

  // async create(
  //   ruralProducer: RuralProducer
  // ): Promise<RuralProducer> {
  //   const query = `
  //     INSERT INTO rural_producers (name, document, property_name, active, city, state, total_area, arable_area, vegetation_area)
  //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  //   `;

  //   const values = [
  //     ruralProducer.name,
  //     ruralProducer.document,
  //     ruralProducer.propertyName,
  //     ruralProducer.active,
  //     ruralProducer.city,
  //     ruralProducer.state,
  //     ruralProducer.totalArea,
  //     ruralProducer.arableArea,
  //     ruralProducer.vegetationArea,
  //   ];

  //   const result = await this.query(queryText, params);
  //   return result.rows[0];
  // }
}
