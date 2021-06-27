import { PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export abstract class BaseEntity {

    // TODO change type to uuid and strategy auto generate
    @PrimaryColumn('varchar')
    id: string = uuid();

}