// store/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// Feature selector for user state
export const selectUserState = createFeatureSelector<UserState>('user');

// Selector for token
export const selectToken = createSelector(
  selectUserState,
  (state: UserState) => state.token
);

// Selector for users list
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

// Selector for error
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Selector for signup message (New)
export const selectSignupMessage = createSelector(
  selectUserState,
  (state: UserState) => state.signupMessage
);

/// Selector for user profile
export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) => state.userProfile
);
export const selectUpdateMessage = createSelector(
  selectUserState,
  (state: UserState) => state.updateMessage
);
