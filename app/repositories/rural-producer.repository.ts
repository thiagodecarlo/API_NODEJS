import {RuralProducer} from "../model/rural-producer.model";
import {RepositoryBase} from "./repository-base";

class RuralProducerRepository extends RepositoryBase<RuralProducer> {
  constructor() {
    super("ruralproducers");
  }

  async create(ruralProducer: RuralProducer): Promise<RuralProducer> {
    let params = [ruralProducer.name, ruralProducer.document];
    const queryText = `INSERT INTO ${this.tableName} (name, document) VALUES ($1, $2) RETURNING *`;
    const result = await this.query(queryText, params);
    return result.rows[0];
  }

  // Outros métodos específicos do RuralProducerRepository, como update() e delete()
}

export default {RuralProducerRepository};
