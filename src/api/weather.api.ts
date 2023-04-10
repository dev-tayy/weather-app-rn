import axios from 'axios';
import * as TE from 'fp-ts/lib/TaskEither';

// lagos
const axiosInstance = axios.create({
  baseURL:
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
});

function getBaseUrl(location: string) {
  return `${location}?unitGroup=metric&include=days%2Ccurrent&key=FWFMC5LMCS7CLPPCQYULYWCUJ&contentType=json`;
}

export function fetchWeatherAPI(location: string): TE.TaskEither<Error, any> {
  return TE.tryCatch(
    () => axiosInstance.get(getBaseUrl(location)),
    (reason: any) => new Error(reason.response.data),
  );
}
