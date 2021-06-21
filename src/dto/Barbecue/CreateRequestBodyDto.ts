import { IsDefined, IsNotEmpty } from "class-validator";

export class CreateRequestBodyDto {

    constructor(params: CreateRequestBodyDto) {
        this.price = params.price;
        this.description = params.description;
    }

    @IsNotEmpty()
    description: string;

    @IsDefined()
    price: number;
}