import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoginStatus } from '../store/selectors/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoginStatus$: Observable<boolean>;

  constructor(public authService: AuthService, private store: Store) {
    this.isLoginStatus$ = this.store.select(selectIsLoginStatus);
  }

  ngOnInit(): void {}
}
