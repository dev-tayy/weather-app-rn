import {TaskEither} from 'fp-ts/lib/TaskEither';
import {Do} from 'fp-ts-contrib/lib/Do';
import * as TE from 'fp-ts/TaskEither';
import {fetchWeatherAPI, reverseGeocodingAPI} from '../api/weather.api';
import {Weather} from '../models/weather.model';
import {LatLng} from '../utils/constants';

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
