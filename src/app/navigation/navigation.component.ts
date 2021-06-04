import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../service/project.service';
import { Project, Todo } from "../model/Project";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
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
  todoCreationForm!: FormGroup;

  constructor(public ProjectService: ProjectService,
              private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
    this.ProjectService.projects.subscribe(
      data => {
        this.projects = data;
    });
  };

  initForm(){
    this.todoCreationForm = this.formBuilder.group({
      project_id: [''],
      title: [''],
      text: [''],
      isCompleted: [false]
    });
  }
  
  createClick(){
    const newTodo = this.todoCreationForm.value;
    this.ProjectService.createTodo(newTodo);
  }
}
