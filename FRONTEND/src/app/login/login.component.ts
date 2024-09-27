import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todoService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  'loginForm': FormGroup;
  loginError: string = "";

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.todoService.login(loginData).subscribe({
        next: (response: any) => {
          this.router.navigate(['/todos']);
        },
        error: (err: any) => {
          this.loginError = err.error.message || 'Login failed. Please try again.';
        }
      });

    }
  }
}
