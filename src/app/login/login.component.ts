import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
      email: ['', Validators.email],
      phone: [''],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onClick(field: string) {
    if (field === 'email') {
      console.log(this.loginForm.get('phone')?.value);
      if (this.loginForm.get('phone')?.value.trim() === '') {
        this.loginForm.get('phone')?.disable();
        this.loginForm.get('email')?.enable();
      }
    } else {
      if (this.loginForm.get('email')?.value.trim() === '') {
        this.loginForm.get('email')?.disable();
        this.loginForm.get('phone')?.enable();
      }
    }
  }

  doLogin() {
    console.log(this.loginForm.value);
  }
  // doLogin() {
  //   this.lService
  //     .login(this.loginForm.value.username, this.loginForm.value.password)
  //     .subscribe(
  //       (res: any) => {
  //         if (res.user.role === 'admin') {
  //           this.lService.setUserRole(true);
  //           console.log(this.lService.getUserRole());
  //         } else {
  //           this.lService.setUserRole(false);
  //         }
  //         //console.log(res.loginStatus);
  //         //console.log(res.user.customer.customerId);
  //         if (res.user.customer != null) {
  //           this.lService.setCustomerId(res.user.customer.customerId);
  //         }
  //         this.lService.setLoginStatus(res.loginStatus);

  //         //this.lService.setUserRole(res.user.role);
  //         //this.userRole = res.user.role;
  //         this.router.navigate(['']);
  //       },
  //       (error: any) => {
  //         this.errorMessage = error;
  //       }
  //     );
  // }
}
