import { Component } from '@angular/core';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
})
export class ProjectsComponent {

  constructor(public ProjectService: ProjectService) { }

}
