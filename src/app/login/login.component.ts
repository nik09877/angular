import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: any | string;

  //private userRole: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      phone: [''],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onClick(field: string) {
    if (field === 'email') {
      this.loginForm.get('phone')?.setValue('');
    } else {
      this.loginForm.get('email')?.setValue('');
    }
  }

  doLogin() {
    const formVal = this.loginForm.value;
    let searchType = 'email';
    let searchVal = formVal.email;
    if (formVal.email === '') {
      searchType = 'phone';
      searchVal = formVal.phone;
    }
    this.authService.login(searchType, searchVal, formVal.password).subscribe({
      next: (_) => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err;
      },
    });
  }
}
