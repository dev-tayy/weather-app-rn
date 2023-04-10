import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SubWeatherTile} from '../components/sub.weather.tile';
import React from 'react';
import {ConditionType, CurrentConditions} from '../models/weather.model';
import {getWeatherIcon} from '../utils/constants';

type SubWeatherProps = {
  forecastWeather: CurrentConditions[];
};

export function SubWeather({forecastWeather}: SubWeatherProps): JSX.Element {
  return (
    <View style={styles.background}>
      <FlatList
        data={forecastWeather}
        numColumns={2}
        keyExtractor={item => item.datetimeEpoch.toString()}
        scrollEnabled={false}
        renderItem={item => (
          <SubWeatherTile
            title={item.item.datetime}
            image={getWeatherIcon(item.item.icon ?? ConditionType.ClearDay)}
            initialTemp={item.item.tempmax ?? 0}
            secondTemp={item.item.tempmin ?? 0}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
