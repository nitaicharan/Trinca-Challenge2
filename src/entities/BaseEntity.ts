import { PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export abstract class BaseEntity {

    @PrimaryColumn('varchar')
    id: string = uuid();

}