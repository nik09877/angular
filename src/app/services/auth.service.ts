import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LokiService } from './loki.service';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { login, logout } from '../store/actions/auth.action';
import { Router } from '@angular/router';
import { selectIsLoginStatus } from '../store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoginStatus$: Observable<boolean>;

  constructor(
    private loki: LokiService,
    private store: Store,
    private router: Router
  ) {
    this.isLoginStatus$ = this.store.select(selectIsLoginStatus);
  }

  register(user: User) {
    return this.loki.register(user);
  }

  login(searchType: string, searchVal: string, password: string) {
    return this.loki.login(searchType, searchVal, password).pipe(
      tap((user: User) => {
        this.store.dispatch(login({ email: user.email, role: user.role }));
      })
    );
  }

  isAuthenticated() {
    return this.isLoginStatus$;
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
