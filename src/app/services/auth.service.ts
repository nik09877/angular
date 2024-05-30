import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LokiService } from './loki.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoginStatus: any;
  userRole: any = false;
  userEmail: any | string;

  constructor(private loki: LokiService) {}

  register(user: User) {
    return this.loki.register(user);
  }

  login(searchType: string, searchVal: string, password: string) {
    return this.loki.login(searchType, searchVal, password).pipe(
      tap((user: User) => {
        this.isLoginStatus = true;
        this.userRole = user.role;
        this.userEmail = user.email;
      })
    );
  }

  logout() {
    this.isLoginStatus = false;
    this.userRole = '';
    this.userEmail = '';
  }
}
