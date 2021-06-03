import {Type} from "class-transformer";


export class Project{
  id!: number;
  title!: string;
  @Type(() => Todo)
  todos!: Todo[];
}
export class Todo{
  id!: number;
  text!: string;
  isCompleted!: boolean;
}
