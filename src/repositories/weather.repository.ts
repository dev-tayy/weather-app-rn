import {TaskEither} from 'fp-ts/lib/TaskEither';
import {Do} from 'fp-ts-contrib/lib/Do';
import * as TE from 'fp-ts/TaskEither';
import {fetchWeatherAPI} from '../api/weather.api';
import {Weather} from '../models/weather.model';

export function fetchWeather(location: string): TaskEither<Error, Weather> {
  return Do(TE.Monad)
    .bind('weather', fetchWeatherAPI(location))
    .return(({weather}) => weather.data);
}
