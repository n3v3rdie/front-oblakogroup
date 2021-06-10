import { Component, Input } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Todo } from "../model/Todo";

@Component({
    selector: 'app-todo',
    templateUrl: 'todo.component.html',
})
export class TodoComponent {
    @Input() todo!: Todo;

    constructor(public ProjectService: ProjectService) { }

    checkBoxClick(t: Todo): boolean {
        const newTodo = Object.assign({}, t);
        newTodo.isCompleted = !newTodo.isCompleted;
        this.ProjectService.toogleTodo(newTodo);
        return false;
    };

}
