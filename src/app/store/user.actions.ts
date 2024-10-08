// store/user.actions.ts
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[User] Login',
  props<{ email: string; password: string; role: string }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[User] Logout');

export const getUsers = createAction('[User] Get Users');

export const getUsersSuccess = createAction(
  '[User] Get Users Success',
  props<{ users: any[] }>()
);

export const getUsersFailure = createAction(
  '[User] Get Users Failure',
  props<{ error: string }>()
);

// Add more actions as needed for create, update, delete, etc.
