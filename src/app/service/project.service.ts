import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Project, Todo } from '../model/Project';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private baseUrl = '';
  private toogleTodoUrl = '/projects/0/todos/'  
  private _projects = new BehaviorSubject<Project[]>([]);
  private dataStore: { projects: Project[] } = { projects: [] };
  readonly projects = this._projects.asObservable();

  constructor(private http: HttpClient) { }

  loadAll(){
    const url = `${this.baseUrl}/projects`;
    this.http.get(url).subscribe(
      data => {
        this.dataStore.projects = plainToClass(Project, data as Object[]);
        this._projects.next(Object.assign({}, this.dataStore).projects);
      },
      error => {
        alert('Error load data');
        console.log(error);
      }
    );
  }
  
  toogleTodo(todo: Todo) {
    const url = `${this.baseUrl}/projects/0/todos/${todo.id}`
    this.http.put<Todo>(url, todo).subscribe(
      data => {
        this.dataStore.projects.forEach((p, i) => {
          p.todos.forEach((t, j) =>{
            if (t.id === todo.id){
              this.dataStore.projects[i].todos[j] = todo;
              this._projects.next(Object.assign({}, this.dataStore).projects);
            }
          })
        })      
       },
       error => {
         alert('Error update data');
         console.log(error);
       }
    );
  }

}
