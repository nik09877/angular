// src/app/store/reducers/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.action';

export interface AuthState {
  isLoginStatus: boolean;
  userRole: string | boolean;
  userEmail: string | null;
}

export const initialState: AuthState = {
  isLoginStatus: false,
  userRole: false,
  userEmail: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, { email, role }) => ({
    ...state,
    isLoginStatus: true,
    userRole: role,
    userEmail: email,
  })),
  on(logout, (state) => ({
    ...state,
    isLoginStatus: false,
    userRole: false,
    userEmail: null,
  }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
