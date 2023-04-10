import {Do} from 'fp-ts-contrib/lib/Do';
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import * as TE from 'fp-ts/lib/TaskEither';
import {nullCheck, syncTryCatch, asyncTryCatch, logicCheck} from './fp.helpers';
import {TaskEither} from 'fp-ts/lib/TaskEither';

type LocationPermissionStatus = 'granted' | 'not-granted';

export function requestLocationPermission(): TaskEither<
  Error,
  LocationPermissionStatus
> {
  return (
    Do(TE.Monad)
      .bind(
        'permission',
        syncTryCatch(() => {
          return Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          });
        }),
      )
      //check if permission is null/undefined
      .doL(({permission}) =>
        nullCheck(permission, 'Location only works on Android/iOS platforms!'),
      )
      //check permission status
      .bindL('permissionStatus', ({permission}) =>
        asyncTryCatch(check(permission!)),
      )
      .doL(({permissionStatus}) =>
        logicCheck(
          permissionStatus === RESULTS.UNAVAILABLE,
          "This feature isn't available for your device",
        ),
      )
      //
      .bindL('status', ({permission, permissionStatus}) =>
        permissionStatus === RESULTS.DENIED
          ? asyncTryCatch(request(permission!))
          : syncTryCatch(() => permissionStatus),
      )
      .return(({status}) => resolvePermissionStatus(status))
  );
}

const resolvePermissionStatus = (
  permissionStatus: string,
): LocationPermissionStatus => {
  switch (permissionStatus) {
    case RESULTS.GRANTED:
      return 'granted';
    case RESULTS.DENIED:
    case RESULTS.LIMITED:
    case RESULTS.UNAVAILABLE:
    case RESULTS.BLOCKED:
      return 'not-granted';
    default:
      throw new Error('Invalid permission status');
  }
};
