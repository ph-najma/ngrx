// store/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  token: string | null;
  users: any[];
  error: string | null;
  signupMessage: string | null;
  userProfile: any | null;
  updateMessage: string | null; // New property for storing user profile data
}

export const initialState: UserState = {
  token: null,
  users: [],
  error: null,
  signupMessage: null,
  userProfile: null,
  updateMessage: null, // Initialize as null
};

export const userReducer = createReducer(
  initialState,

  // Login handlers
  on(UserActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Get users handlers
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null,
  })),
  on(UserActions.getUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Logout handler
  on(UserActions.logout, (state) => ({
    ...state,
    token: null,
  })),

  // Signup handlers
  on(UserActions.signupSuccess, (state, { message }) => ({
    ...state,
    signupMessage: message, // Update signup message on success
    error: null,
  })),
  on(UserActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // Get user by ID handlers
  on(UserActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    userProfile: user, // Update user profile on success
    error: null,
  })),
  on(UserActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update User Profile handlers
  on(UserActions.updateUserProfileSuccess, (state, { message }) => ({
    ...state,
    error: null,
    signupMessage: message, // Store the success message
  })),
  on(UserActions.updateUserProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // Load Users handlers
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // Create User handlers
  on(UserActions.createUserSuccess, (state, { message }) => ({
    ...state,
    signupMessage: message,
    error: null,
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // Update user handlers
  on(UserActions.updateUserSuccess, (state, { message }) => ({
    ...state,
    updateMessage: message, // Update message on success
    error: null,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
