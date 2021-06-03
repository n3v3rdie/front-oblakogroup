import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../service/project.service';
import { Project, Todo } from "../model/Project";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [`
    h1{
      text-align: center;
      margin: 0;
      color: #fff;
    }
    button {
      color:white;
      position: absolute;
      margin: 10px;
      top: 0;
      right: 0;
    }
  `]
})
export class NavigationComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogCreateTodo);
  }
}

@Component({
  selector: 'dialog-create-todo',
  templateUrl: './dialogcreatetodo.component.html',
})
export class DialogCreateTodo implements OnInit{
  projects: Project[] = [];

  constructor(public ProjectService: ProjectService){}

  ngOnInit(): void {
    this.ProjectService.projects.subscribe(
      data => {
        this.projects = data;
    });
  };
}
