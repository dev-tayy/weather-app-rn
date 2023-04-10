import axios from 'axios';
import * as TE from 'fp-ts/lib/TaskEither';
import {PrivateKeys} from './constants';
import {LatLng} from '../utils/constants';

// lagos
const axiosInstance = axios.create({
  baseURL:
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
});

function getBaseUrl(location: string) {
  return `${location}?unitGroup=metric&include=days%2Ccurrent&key=${PrivateKeys.WEATHER_API}&contentType=json`;
}

export function fetchWeatherAPI(location: string): TE.TaskEither<Error, any> {
  return TE.tryCatch(
    () => axiosInstance.get(getBaseUrl(location)),
    (reason: any) => new Error(reason.response.data),
  );
}

export function reverseGeocodingAPI({
  lat,
  long,
}: LatLng): TE.TaskEither<Error, any> {
  return TE.tryCatch(
    () =>
      axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${PrivateKeys.GOOGLE_API}`,
      ),
    (reason: any) => new Error(reason.response.data),
  );
}
