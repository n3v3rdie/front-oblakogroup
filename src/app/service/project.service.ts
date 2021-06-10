import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../model/Todo';
import { Project } from '../model/Project';
import { plainToClass } from 'class-transformer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projects = new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) {
    this.loadAll();
  }

  private loadAll() {
    const url = `${environment.baseUrl}/projects`;
    this.http.get(url).subscribe(
      data => {
        this.projects.next(plainToClass(Project, data as Object[]));
      },
      error => {
        alert('Error load data');
        console.log(error);
      }
    );
  }

  toogleTodo(todo: Todo) {
    const url = `${environment.baseUrl}/projects/${todo.project_id}/todos/${todo.id}`;
    this.http.put<Todo>(url, todo).subscribe(
      data => {
        const newTodo = plainToClass(Todo, data);
        const projects = this.projects.getValue();
        projects.find(
          (p) => {
            if (p.id === newTodo.project_id)
              p.todos.find((todo) => {
                if (todo.id === newTodo.id) {
                  todo.isCompleted = newTodo.isCompleted;
                  return;
                }
              })
          }
        );
        this.projects.next(projects);
      },
      error => {
        alert('Error update data');
        console.log(error);
      }
    );
  }

  createTodo(newTodo: Todo) {
    const url = `${environment.baseUrl}/todos`;
    this.http.post<any>(url, newTodo).subscribe(
      data => {
        const projects = this.projects.getValue();
        const newTodo = plainToClass(Todo, data);
        let project = projects.find(p => p.id === newTodo.project_id)
        if (!project) {
          project = plainToClass(Project, data.project);
          project.todos = [newTodo];
          projects.push(project);
        } else {
          project.todos.push(newTodo);
        }
        this.projects.next(projects);
      },
      error => {
        alert('Error create todo');
        console.log(error);
      }
    );
  }

}
