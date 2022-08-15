import { EntityRepository, Repository } from "typeorm";
import { Todo } from "../model/Todo";

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {}
