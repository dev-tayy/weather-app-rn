export type Weather = {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: CurrentConditions[];
  stations: {[key: string]: Station};
  currentConditions: CurrentConditions;
};

export type CurrentConditions = {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  snow: number;
  snowdepth: number | null;
  preciptype: Preciptype[] | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  conditions: string;
  icon: ConditionType;
  stations: string[] | null;
  source: Source;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  tempmax?: number;
  tempmin?: number;
  feelslikemax?: number;
  feelslikemin?: number;
  precipcover?: number;
  severerisk?: number;
  description?: string;
};

export enum Preciptype {
  Rain = 'rain',
}

export enum ConditionType {
  ClearDay = 'clear-day',
  ClearNight = 'clear-night',
  Cloudy = 'cloudy',
  Fog = 'fog',
  Hail = 'hail',
  PartlyCloudyDay = 'partly-cloudy-day',
  PartlyCloudyNight = 'partly-cloudy-night',
  RainSnowShowersDay = 'rain-snow-showers-day',
  RainSnowShowersNight = 'rain-snow-showers-night',
  RainSnow = 'rain-snow',
  Rain = 'rain',
  ShowersDay = 'showers-day',
  ShowersNight = 'showers-night',
  Sleet = 'sleet',
  SnowShowersDay = 'snow-showers-day',
  SnowShowersNight = 'snow-showers-night',
  Snow = 'snow',
  Thunder = 'thunder',
  ThunderRain = 'thunder-rain',
  ThunderShowersDay = 'thunder-showers-day',
  ThunderShowersNight = 'thunder-showers-night',
  Wind = 'wind',
}

export enum Source {
  Comb = 'comb',
  Fcst = 'fcst',
  Obs = 'obs',
}

export type Station = {
  distance: number;
  latitude: number;
  longitude: number;
  useCount: number;
  id: string;
  name: string;
  quality: number;
  contribution: number;
};

// Converts JSON strings to/from your types
export class Convert {
  public static toWeather(json: string): Weather {
    return JSON.parse(json);
  }

  public static weatherToJson(value: Weather): string {
    return JSON.stringify(value);
  }
}
