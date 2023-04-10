import {Text, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {HighlightTile, HighlightTileProps} from '../components/highlight.tile';
import {Spacer} from '../components/spacer';
import {AppColors} from '../utils/constants';
import React from 'react';
import {CurrentConditions} from '../models/weather.model';

type TodayHighlightProps = {
  highlights?: CurrentConditions;
};

export function TodayHighlight({highlights}: TodayHighlightProps): JSX.Element {
  const highlightArr: HighlightTileProps[] = [
    {
      title: 'Wind status',
      value: highlights?.windspeed ?? 0,
      suffix: 'mph',
      type: 'wind-status',
    },
    {
      title: 'Humidity',
      value: highlights?.humidity ?? 0,
      suffix: '%',
      type: 'humidity',
    },
    {
      title: 'Visibility',
      value: highlights?.visibility ?? 0,
      suffix: 'miles',
      type: 'default',
    },
    {
      title: 'Air Pressure',
      value: highlights?.pressure ?? 0,
      suffix: 'mb',
      type: 'default',
    },
  ];
  return (
    <View>
      <Text style={styles.highlightText}>Today’s Hightlights</Text>
      <Spacer height={32} />
      <FlatList
        data={highlightArr}
        scrollEnabled={false}
        renderItem={item => (
          <HighlightTile
            title={item.item.title}
            value={item.item.value}
            suffix={item.item.suffix}
            type={item.item.type}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  highlightText: {
    fontWeight: '700',
    fontSize: 24,
    fontFamily: 'Raleway',
    color: AppColors.white,
  },
});
