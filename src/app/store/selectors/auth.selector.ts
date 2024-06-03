// src/app/store/selectors/auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoginStatus = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoginStatus
);

export const selectUserRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.userRole
);

export const selectUserEmail = createSelector(
  selectAuthState,
  (state: AuthState) => state.userEmail
);
