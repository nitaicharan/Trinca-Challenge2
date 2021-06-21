import { IsJWT, IsNotEmpty } from "class-validator";

export class RefreshTokenRequestBodyDto {

    constructor(params: RefreshTokenRequestBodyDto) {
        this.refresh_token = params.refresh_token;
    }

    @IsJWT()
    @IsNotEmpty()
    refresh_token: string;

}