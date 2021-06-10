import { Component, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateTodo } from './dialogcreatetodo.component';


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
