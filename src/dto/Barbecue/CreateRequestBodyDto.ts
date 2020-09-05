import { IsDefined, IsOptional, IsUUID } from "class-validator";

export class CreateRequestBodyDto {

    constructor(params: CreateRequestBodyDto) {
        this.price = params.price;
    }

    @IsDefined()
    price: number;
}