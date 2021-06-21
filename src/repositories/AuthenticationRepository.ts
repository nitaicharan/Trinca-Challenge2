import { EntityRepository, Repository } from "typeorm";
import { Authentication } from "../entities/Authentication";

@EntityRepository(Authentication)
export class AuthenticationRepository extends Repository<Authentication> {
}