import { injectable } from 'tsyringe';

@injectable()
export class RuralProducerService {
  constructor() {}

  // public getAllRuralProducers(): Promise<RuralProducer[]> {
  //   return new Promise<RuralProducer[]>((resolve, reject) => {
  //     try {
  //       const RuralProducers: RuralProducer[] = [];
  //       const ruralProducer = new RuralProducer(
  //         "1",
  //         true,
  //         "Thiago Gonçalves",
  //         "32930563850",
  //         "Fazenda Santa Fé",
  //         "Presidente Prudente",
  //         "São Paulo",
  //         500,
  //         350,
  //         50
  //       );
  //       RuralProducers.push(ruralProducer);
  //       const ruralProducer2 = new RuralProducer(
  //         "2",
  //         true,
  //         "Ivan Guimarães",
  //         "36374800850",
  //         "Fazenda Santa Marina",
  //         "Estrela do Norte",
  //         "São Paulo",
  //         1200,
  //         1000,
  //         200
  //       );
  //       RuralProducers.push(ruralProducer2);
  //       return resolve(RuralProducers);
  //     } catch (error) {
  //       return reject(error);
  //     }
  //   });
  // }

  // public getRuralProducerById(id: string): Promise<RuralProducer> {
  //   const query = id;
  //   query == id;
  //   return new Promise<RuralProducer>((resolve, reject) => {
  //     try {
  //       const ruralProducer = new RuralProducer(
  //         "1",
  //         true,
  //         "Thiago Gonçalves",
  //         "32930563850",
  //         "Fazenda Santa Fé",
  //         "Presidente Prudente",
  //         "São Paulo",
  //         500,
  //         350,
  //         50
  //       );
  //       return resolve(ruralProducer);
  //     } catch (error) {
  //       return reject(error);
  //     }
  //   });
  // }
}
