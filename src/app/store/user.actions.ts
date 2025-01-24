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

//signup

export const signup = createAction(
  '[User] Signup',
  props<{ name: string; email: string; password: string }>()
);

export const signupSuccess = createAction(
  '[User] Signup Success',
  props<{ message: string }>()
);

export const signupFailure = createAction(
  '[User] Signup Failure',
  props<{ error: string }>()
);

// User Profile Actions
export const loadUserProfile = createAction(
  '[User] Load User Profile',
  props<{ userId: string }>()
);

export const loadUserProfileSuccess = createAction(
  '[User] Load User Profile Success',
  props<{ user: any }>()
);

export const loadUserProfileFailure = createAction(
  '[User] Load User Profile Failure',
  props<{ error: string }>()
);

export const updateUserProfile = createAction(
  '[User] Update User Profile',
  props<{ user: any }>()
);

export const updateUserProfileSuccess = createAction(
  '[User] Update User Profile Success',
  props<{ message: string }>()
);

export const updateUserProfileFailure = createAction(
  '[User] Update User Profile Failure',
  props<{ error: string }>()
);

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: any[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);
// Action for creating a user
export const createUser = createAction(
  '[User] Create User',
  props<{ user: any }>() // Define the user properties accordingly
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ message: string }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: string }>()
);

//update User
export const updateUser = createAction(
  '[User] Update User',
  props<{ userId: string | null; userData: FormData }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ message: string }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

