// store/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  token: string | null;
  users: any[];
  error: string | null;
}

export const initialState: UserState = {
  token: null,
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null,
  })),
  on(UserActions.getUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.logout, (state) => ({
    ...state,
    token: null,
  }))
);
