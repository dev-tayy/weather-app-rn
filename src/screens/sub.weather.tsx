import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  SubWeatherTile,
  SubWeatherTileProps,
} from '../components/sub.weather.tile';
import React from 'react';
import {AppImages} from '../utils/constants';

export function SubWeather(): JSX.Element {
  const subWeatherArr: SubWeatherTileProps[] = [
    {
      title: 'Tomorrow',
      image: AppImages.tempCloud,
      initialTemp: '10',
      secondTemp: '19',
    },
    {
      title: 'Sun, 7 Jun',
      image: AppImages.tempCloud,
      initialTemp: '22',
      secondTemp: '12',
    },
    {
      title: 'Mon, 8 Apr',
      image: AppImages.tempCloud,
      initialTemp: '18',
      secondTemp: '26',
    },
    {
      title: 'Fri, 9 Apr',
      image: AppImages.tempCloud,
      initialTemp: '24',
      secondTemp: '33',
    },
    {
      title: 'Sat, 9 Sep',
      image: AppImages.tempCloud,
      initialTemp: '18',
      secondTemp: '24',
    },
  ];
  return (
    <View style={styles.background}>
      <FlatList
        data={subWeatherArr}
        numColumns={2}
        keyExtractor={item => item.title.toString()}
        scrollEnabled={false}
        renderItem={item => (
          <SubWeatherTile
            title={item.item.title}
            image={item.item.image}
            initialTemp={item.item.initialTemp}
            secondTemp={item.item.secondTemp}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 31,
    justifyContent: 'center',
  },
});
