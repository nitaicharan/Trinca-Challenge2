import { EntityRepository, Repository } from "typeorm";
import { Barbecue } from './../entities/Barbecue';

@EntityRepository(Barbecue)
export class BarbecueRepository extends Repository<Barbecue> {
}