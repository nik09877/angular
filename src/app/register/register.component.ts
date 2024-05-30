import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import {
  emailValidator,
  phoneNumberValidator,
} from '../custom-validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage: string | any;
  countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'BR', name: 'Brazil' },
    // Add more countries as needed
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]], // Custom email validator
      country: ['IN', Validators.required], // Use country codes
      phone: ['', Validators.required], // Phone control initially without validator
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['customer', Validators.required], // Default role
    });

    // Apply the phone number validator after form group initialization
    this.userForm
      .get('phone')
      ?.setValidators([
        Validators.required,
        phoneNumberValidator(this.userForm.get('country')),
      ]);

    // Update the phone number validator when the country changes
    this.userForm.get('country')?.valueChanges.subscribe(() => {
      this.userForm.get('phone')?.updateValueAndValidity();
    });
  }

  register() {
    if (
      this.userForm.get('password')?.value.trim() !==
      this.userForm.get('confirmPassword')?.value.trim()
    ) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    if (!this.userForm.valid) {
      this.errorMessage = 'Enter valid details';
      return;
    }

    const formVals = this.userForm.value;
    const user: User = {
      email: formVals.email.trim(),
      phone: formVals.phone.trim(),
      country: formVals.country,
      password: formVals.password.trim(),
      role: formVals.role,
    };
    this.authService.register(user).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err;
        console.error('Error:', err);
      },
      complete: () => console.log('Completed'),
    });
  }
}
