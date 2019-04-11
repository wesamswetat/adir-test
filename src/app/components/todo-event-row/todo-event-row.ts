import { Component, ChangeDetectionStrategy, Input, Inject } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ITodoItem } from "src/app/interface/todo";
import { Store } from "@ngxs/store";
import { DeleteTodo, DuplicateTodo, DeactivateTodo, ActiveTodo } from "src/app/@Ngxrs/todolistState/actions";

@Component({
    selector: 'todo-event-row-component',
    templateUrl: './todo-event-row.html',
    styleUrls: ['./todo-event-row.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEeventRowComponent {
    @Input() event: ITodoItem

    constructor(private store: Store, public dialog: MatDialog) {}

    remove() {
        this.store.dispatch(new DeleteTodo(this.event.id))
    }

    duplicate() {
        this.store.dispatch(new DuplicateTodo(this.event))
    }

    deactivate() {
        this.store.dispatch(new DeactivateTodo(this.event.id))
    }

    active() {
        this.store.dispatch(new ActiveTodo(this.event.id))
    }

    edit() {
        const dialogRef = this.dialog.open(DialogOverviewEditTodoDialog, {
            width: '80%',
            data: this.event
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
          });
        }
}

@Component({
    selector: 'dialog-overview-edit-todo-dialog',
    templateUrl: './dialog-overview-edit-todo-dialog.html',
  })
  export class DialogOverviewEditTodoDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewEditTodoDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ITodoItem) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }