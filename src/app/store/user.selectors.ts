// store/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectToken = createSelector(
  selectUserState,
  (state: UserState) => state.token
);

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
