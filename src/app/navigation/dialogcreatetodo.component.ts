import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';

@Component({
    selector: 'dialog-create-todo',
    templateUrl: './dialogcreatetodo.component.html',
})
export class DialogCreateTodo implements OnInit {
    todoCreationForm!: FormGroup;

    constructor(public ProjectService: ProjectService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.initForm();
    };

    initForm() {
        this.todoCreationForm = this.formBuilder.group({
            project_id: [''],
            title: ['', [Validators.required]],
            text: ['', [Validators.required]],
            isCompleted: [false]
        });
    }

    selectEvent(id: number) {
        const p = this.ProjectService.projects.getValue();
        const project = p.find(e => e.id === id);
        const title = (project ? project.title : '');
        this.todoCreationForm.get('title')?.setValue(title);
    }

    createClick() {
        this.todoCreationForm.markAllAsTouched();
        if (this.todoCreationForm.valid) {
            const newTodo = this.todoCreationForm.value;
            this.ProjectService.createTodo(newTodo);
        }
    }
}

