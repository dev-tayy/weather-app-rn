import {Text, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {HighlightTile, HighlightTileProps} from '../components/highlight.tile';
import {Spacer} from '../components/spacer';
import {AppColors} from '../utils/constants';
import React from 'react';

export function TodayHighlight(): JSX.Element {
  const highlightArr: HighlightTileProps[] = [
    {
      title: 'Wind status',
      value: 7,
      suffix: 'mph',
      type: 'wind-status',
    },
    {
      title: 'Humidity',
      value: 84,
      suffix: '%',
      type: 'humidity',
    },
    {
      title: 'Visibility',
      value: 6.4,
      suffix: 'miles',
      type: 'default',
    },
    {
      title: 'Air Pressure',
      value: 998,
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
