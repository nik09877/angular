// src/app/store/actions/auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; role: string }>()
);

export const logout = createAction('[Auth] Logout');
