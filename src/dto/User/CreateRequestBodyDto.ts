import { IsNotEmpty } from "class-validator";

export class CreateRequestBodyDto {

    constructor(params: CreateRequestBodyDto) {
        this.email = params.email;
        this.password = params.email;
    }

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}