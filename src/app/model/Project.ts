import { Type } from "class-transformer";
import { Todo } from "./Todo"

export class Project {
  id!: number;
  title!: string;
  @Type(() => Todo)
  todos!: Todo[];
}
