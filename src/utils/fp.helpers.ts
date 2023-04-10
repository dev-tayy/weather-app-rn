import * as TE from 'fp-ts/lib/TaskEither';
import {Lazy, pipe} from 'fp-ts/lib/function';
import {ErrorMessages} from './constants';
import * as E from 'fp-ts/lib/Either';
import * as R from 'ramda';

export const asyncTryCatch = <T>(
  f: Promise<T>,
  error_message?: string,
): TE.TaskEither<Error, T> =>
  TE.tryCatch(
    () => f,
    reason => {
      console.log(reason);
      return new Error(error_message || ErrorMessages.Generic);
    },
  );

export const syncTryCatch = <T>(
  f: Lazy<T>,
  error_message?: string,
): TE.TaskEither<Error, T> =>
  TE.fromEither(
    E.tryCatch(f, reason => {
      console.log(reason);
      return new Error(error_message || ErrorMessages.Generic);
    }),
  );

export const nullCheck = <T>(item: T, error_message?: string) =>
  pipe(
    item,
    TE.fromPredicate(
      predicate => R.not(R.isNil(predicate)),
      () => new Error(error_message),
    ),
  );

export const isEmpty = <T>(item: T, error_message?: string) =>
  pipe(
    item,
    TE.fromPredicate(
      predicate => R.not(R.isEmpty(predicate)),
      () => new Error(error_message),
    ),
  );

export const logicCheck = (logic: boolean, error_message: string) =>
  pipe(
    Boolean(logic),
    TE.fromPredicate(
      bool => R.not(bool),
      () => new Error(error_message),
    ),
  );
