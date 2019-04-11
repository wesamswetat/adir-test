import { Component, ChangeDetectionStrategy, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { Store } from "@ngxs/store";
import { ITodoItem } from "src/app/interface/todo";
import { AddNewTodo, EditTodo } from "src/app/@Ngxrs/todolistState/actions";

@Component({
    selector: 'add-new-todo-component',
    templateUrl: './add_new_todo_component.html',
    styleUrls: ['./add_new_todo_component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewTodoComponent implements OnChanges {

    addNewTodoForm: FormGroup;
    @ViewChild('formDirective') formDirective: FormGroupDirective;
    @Output() finish: EventEmitter<any> = new EventEmitter<any>();
    @Input() event: ITodoItem;

    constructor(private formBuilder: FormBuilder, private store: Store) {
        this.addNewTodoForm = this.formBuilder.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            date: ['', Validators.required],
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.event.currentValue) {
            this.addNewTodoForm.get('id').setValue(this.event.id);
            this.addNewTodoForm.get('name').setValue(this.event.name);
            this.addNewTodoForm.get('date').setValue(this.event.date);
        }
    }


    onSubmit() {
       if (this.addNewTodoForm.valid) {
           const newTodoEvent: ITodoItem = this.addNewTodoForm.value;
           if (!this.event) {
            newTodoEvent.status = 'active';
            this.store.dispatch(new AddNewTodo(newTodoEvent))
           } else {
            newTodoEvent.status = this.event.status;
            this.store.dispatch(new EditTodo(newTodoEvent))
           }
           this.formDirective.resetForm();
           this.addNewTodoForm.reset();
           this.finish.emit();
       }
    }
}