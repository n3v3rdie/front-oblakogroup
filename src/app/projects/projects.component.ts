import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Project, Todo } from "../model/Project";

@Component({
  selector: 'app-projects',
  template: `
    <div class="flex-container">
    <mat-card class="project-card" *ngFor="let p of projects">
      <mat-card-title> {{ p.title }} </mat-card-title>
        <div *ngFor="let t of p.todos">
          <mat-checkbox [checked]="t.isCompleted" (click)="checkBoxClick(t)" color="primary" >
            <span *ngIf="t.isCompleted; else text" style="text-decoration:line-through"> {{ t.text }} </span>
            <ng-template #text>{{ t.text }}</ng-template>
          </mat-checkbox>
        </div>
    </mat-card>
    </div>
  `,
})
export class ProjectsComponent implements OnInit {
  
  projects: Project[] = [];

  constructor(public ProjectService: ProjectService) { }

  ngOnInit(): void {
    this.ProjectService.projects.subscribe(
      data => {
        this.projects = data;
    });
    this.ProjectService.loadAll();
  };

  checkBoxClick(todo: Todo):boolean {
    const newTodo = Object.assign({}, todo);
    newTodo.isCompleted = !newTodo.isCompleted;
    this.ProjectService.toogleTodo(newTodo);
    return false;
  };

}
