// store/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../service/user.service';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap((action) =>
        this.userService.onLogin(action).pipe(
          map((res) => {
            if (res.token) {
              return UserActions.loginSuccess({ token: res.token });
            } else {
              return UserActions.loginFailure({ error: 'Login failed' });
            }
          }),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.getUsersSuccess({ users })),
          catchError((error) => of(UserActions.getUsersFailure({ error })))
        )
      )
    )
  );

  // Add more effects for create, update, delete, etc.
}
