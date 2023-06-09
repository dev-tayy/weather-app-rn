import {View, Text, Image, StyleSheet} from 'react-native';
import {AppColors} from '../utils/constants';
import {Spacer} from './spacer';
import React from 'react';

export type SubWeatherTileProps = {
  image: string;
  title: string;
  initialTemp: number;
  secondTemp: number;
};

export function SubWeatherTile({
  title,
  image,
  initialTemp,
  secondTemp,
}: SubWeatherTileProps): JSX.Element {
  return (
    <View style={styles.outerPadding}>
      <View style={styles.background}>
        <Text style={styles.tempText}>{title}</Text>
        <Spacer height={10} />
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Spacer height={31} />
        <View style={styles.direction}>
          <Text style={styles.tempText}> {`${initialTemp ?? 0}°C`}</Text>
          <Spacer width={16} />
          <Text
            style={[
              styles.tempText,
              {
                color: AppColors.greyText,
              },
            ]}>
            {`${secondTemp ?? 0}°C`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: AppColors.primary,
    height: 177,
    width: 120,
    alignItems: 'center',
    paddingVertical: 18,
  },
  tempText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Raleway',
  },
  image: {
    height: 62,
    width: 56,
  },
  direction: {
    flexDirection: 'row',
  },
  outerPadding: {paddingHorizontal: 20, paddingVertical: 20},
});
