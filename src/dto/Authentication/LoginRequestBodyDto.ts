import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginRequestBodyDto {

    constructor(params: LoginRequestBodyDto) {
        this.email = params.email;
        this.password = params.password;
    }

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}