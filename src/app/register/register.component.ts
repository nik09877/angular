import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['+91 India'], // Default country code
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['customer'], // Default role
    });
  }

  ngOnInit(): void {}

  register() {
    if (
      this.userForm.valid &&
      this.userForm.get('password')?.value ===
        this.userForm.get('confirmPassword')?.value
    ) {
      const user: User = this.userForm.value;
      console.log(user);
    } else {
      this.errorMessage = 'Form is invalid or passwords do not match.';
    }
  }
}
