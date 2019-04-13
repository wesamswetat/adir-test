import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';


import { NgxsModule } from '@ngxs/store';
import { TodoListState } from './@Ngxrs/todolistState/state';
import { HomeComponent } from './home/home_component';
import { AddNewTodoComponent } from './components/add_new_todo/add_new_todo_component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodoEeventRowComponent, DialogOverviewEditTodoDialog } from './components/todo-event-row/todo-event-row';
import { CommonModule } from '@angular/common';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SortByActiveFirst } from './pipes/sort-array-by-active-first.pipe';
import { FilterEventsByComponent } from './components/filter-events/filter-events';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddNewTodoComponent,
    TodoEeventRowComponent,
    DialogOverviewEditTodoDialog,
    FilterEventsByComponent,
    MyFilterPipe,
    SortByActiveFirst
  ],
  entryComponents: [DialogOverviewEditTodoDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([
      TodoListState
    ]),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule,
    DragDropModule,
    MatDividerModule,
    MatMenuModule
  ],
  providers: [ MatDatepickerModule  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
