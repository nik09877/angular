import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LokiService } from './loki.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoginStatus: any;
  userRole: any = false;
  customerId: any | string = 1;

  constructor(private loki: LokiService) {}

  register(user: User) {
    return this.loki.register(user);
  }

  login() {
    this.isLoginStatus = true;
  }

  logout() {
    this.isLoginStatus = false;
  }
}
