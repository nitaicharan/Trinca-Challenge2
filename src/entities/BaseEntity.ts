import { PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export abstract class BaseEntity {

    constructor() {
        if (!this.id) this.id = uuid();
    }


    @PrimaryColumn('varchar')
    id: string;

}