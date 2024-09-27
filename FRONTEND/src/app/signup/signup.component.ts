import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todoService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  'signupForm': FormGroup;
  signupError: string | null = null;

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      this.todoService.signup(signupData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.signupError = err.error.message || 'Signup failed. Please try again.';
        }
      });
    }
  }
}
