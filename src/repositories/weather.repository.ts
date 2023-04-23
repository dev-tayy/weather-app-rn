import {TaskEither} from 'fp-ts/lib/TaskEither';
import {Do} from 'fp-ts-contrib/lib/Do';
import * as TE from 'fp-ts/TaskEither';
import {fetchWeatherAPI, reverseGeocodingAPI} from '../api/weather.api';
import {Weather} from '../models/weather.model';
import {LatLng} from '../utils/constants';
import {requestLocationPermission} from '../utils/permission.handler';
import Geolocation from 'react-native-geolocation-service';
import {logicCheck, asyncTryCatch} from '../utils/fp.helpers';

export function fetchWeather(location: string): TaskEither<Error, Weather> {
  return Do(TE.Monad)
    .bind('weather', fetchWeatherAPI(location))
    .return(({weather}) => weather.data);
}
export function reverseGeocoding(latLng: LatLng): TaskEither<Error, string> {
  return Do(TE.Monad)
    .bind('json', reverseGeocodingAPI(latLng))
    .return(({json}) => {
      const city = json.data.results[0]?.address_components[2].long_name;
      const country = json.data.results[0]?.address_components[4].long_name;
      return `${city}, ${country}`;
    });
}

export function fetchWeatherOnStart(): TaskEither<
  Error,
  {weather: Weather; address: string}
> {
  return Do(TE.Monad)
    .bind('locationStatus', requestLocationPermission())
    .doL(({locationStatus}) =>
      logicCheck(
        locationStatus === 'not-granted',
        'Enable location permission on your app settings to continue',
      ),
    )
    .bind(
      'coords',
      asyncTryCatch(
        new Promise<LatLng>((resolve, reject) => {
          Geolocation.getCurrentPosition(
            position =>
              resolve({
                lat: position.coords.latitude,
                long: position.coords.longitude,
              }),
            error => {
              console.log(error);
              return reject({
                lat: 6.465422,
                long: 3.406448,
              });
            },

            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }),
      ),
    )
    .bindL('address', ({coords}) => reverseGeocoding(coords))
    .bindL('weather', ({coords}) =>
      fetchWeather(`${coords.lat},${coords.long}`),
    )
    .return(({address, weather}) => ({
      weather,
      address,
    }));
}
