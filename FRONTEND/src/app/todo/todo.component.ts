import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todoService';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  form: FormGroup;
  list: any[] = [];

  constructor(private todoService: TodoService) {
    this.form = new FormGroup({
      todoname: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.list = todos;
    });
  }

  AddTodo() {
    if (this.form.valid) {
      const todoName = this.form.get('todoname')?.value;
      const newTodo = { name: todoName };

      this.todoService.addTodo(newTodo).subscribe(todo => {
        this.list.push(todo);
        this.form.reset();
      });
    }
  }

  EditTodo(item: any) {
    const newName = prompt('Enter new name', item.name);
    if (newName !== null && newName.trim() !== '') {
      this.todoService.editTodo(item._id, { name: newName }).subscribe(updatedTodo => {
        item.name = updatedTodo.name;
      });
    }
  }

  RemoveTodo(id: string) {
    console.log("Removing Todo with ID:", id);
    this.todoService.removeTodo(id).subscribe(() => {
      this.list = this.list.filter(task => task._id !== id);
    });
  }

}
