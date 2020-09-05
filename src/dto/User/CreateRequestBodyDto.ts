import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateRequestBodyDto {

    constructor(params: CreateRequestBodyDto) {
        this.email = params.email;
        this.password = params.email;
        this.name = params.name;
    }

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}