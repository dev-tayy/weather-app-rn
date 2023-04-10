import {ConditionType} from '../models/weather.model';
export const AppColors = {
  primary: '#1E213A',
  darkPrimary: '#100E1D',
  grey: '#6E707A',
  white: '#E7E7EB',
  greyText: '#A09FB1',
  yellow: '#FFEC65',
  blue: '#3C47E9',
  border: '#616475',
};

export const AppImages = {
  cloud: require('../assets/images/cloud.png'),
  tempCloud:
    'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png',
};

export function getWeatherIcon(condition: ConditionType): string {
  return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${condition}.png`;
}
