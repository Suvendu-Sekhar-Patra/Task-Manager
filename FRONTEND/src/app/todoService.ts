import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private todoUrl = 'http://localhost:5000/api/todos';
  // private authUrl = 'http://localhost:5000/api/auth';
  private Url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.Url}api/auth/register`, signupData)
      .pipe(
        catchError(err => {
          console.error('Signup error', err);
          return throwError(() => new Error('Signup failed. Please try again.'));
        })
      );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.Url}api/auth/login`, credentials, { withCredentials: true })
      .pipe(
        catchError(err => {
          console.error('Login error', err);
          return throwError(() => new Error('Login failed. Please try again.'));
        })
      );
  }

  getTodos(): Observable<any> {
    return this.http.get(`${this.Url}api/todos/get`, { withCredentials: true })
      .pipe(
        catchError(err => {
          console.error('Error fetching todos', err);
          return throwError(() => new Error('Failed to load todos. Please try again.'));
        })
      );
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(`${this.Url}api/todos/add`, todo, { withCredentials: true })
      .pipe(
        catchError(err => {
          console.error('Error adding todo', err);
          return throwError(() => new Error('Failed to add todo. Please try again.'));
        })
      );
  }

  editTodo(id: string, todo: any): Observable<any> {
    return this.http.put(`${this.Url}api/todos/get/${id}`, todo, { withCredentials: true })
      .pipe(
        catchError(err => {
          console.error(`Error editing todo with ID ${id}`, err);
          return throwError(() => new Error('Failed to edit todo. Please try again.'));
        })
      );
  }

  removeTodo(id: string): Observable<any> {
    return this.http.delete(`${this.Url}api/todos/del/${id}`, { withCredentials: true })
      .pipe(
        catchError(err => {
          console.error(`Error removing todo with ID ${id}`, err);
          return throwError(() => new Error('Failed to remove todo. Please try again.'));
        })
      );
  }
}
