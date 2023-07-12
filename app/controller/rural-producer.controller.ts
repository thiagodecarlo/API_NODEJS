import { Request, Response } from 'express';
import { Controller, Get, Param, Req, Res } from "routing-controllers";
import { injectable } from "tsyringe";
import { RuralProducer } from "../model/rural-producer.model";


@injectable()
@Controller("/rural-producer")
export class RuralProducerController {
 
    constructor() { }


    @Get("/")
    public getAllRuralProducers(@Req() req: Request, @Res() res: Response) {
        console.log("Entrou");
        const RuralProducers: RuralProducer[] = [];
        let ruralProducer = new RuralProducer("1" ,true, "Thiago Gonçalves", "32930563850", "Fazenda Santa Fé", "Presidente Prudente","São Paulo", 500, 350, 50);
        RuralProducers.push(ruralProducer);
        let ruralProducer2 = new RuralProducer("2" ,true, "Ivan Guimarães", "36374800850", "Fazenda Santa Marina", "Estrela do Norte","São Paulo", 1200, 1000, 200);
        RuralProducers.push(ruralProducer2);
        return RuralProducers;
    };

    @Get("/:id")
    public getRuralProducerById(@Req() req: Request, @Res() res: Response, @Param('id') id : string) {
        let ruralProducer = new RuralProducer("1" ,true, "Thiago Gonçalves", "32930563850", "Fazenda Santa Fé", "Presidente Prudente","São Paulo", 500, 350, 50);
        return ruralProducer;
    };

}