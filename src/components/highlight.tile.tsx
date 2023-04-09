import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppColors} from '../utils/constants';
import {Spacer} from './spacer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Bar} from 'react-native-progress';

export type HighlightTileProps = {
  title: string;
  value: number;
  suffix: string;
  type: HighlightTileType;
};

export type HighlightTileType = 'wind-status' | 'humidity' | 'default';

export function HighlightTile({
  title,
  value,
  suffix,
  type,
}: HighlightTileProps): JSX.Element {
  return (
    <View style={styles.outerPadding}>
      <View style={styles.background}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.row}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.suffix}>{` ${suffix}`}</Text>
        </View>
        {(type === 'wind-status' || type === 'humidity') && (
          <Spacer height={31} />
        )}
        {type === 'wind-status' && (
          <View style={styles.row}>
            <View style={styles.circleBackground}>
              <Icon name="navigation" size={18} color={AppColors.white} />
            </View>
            <Spacer width={8} />
            <Text style={styles.windStatusTrailing}>WSW</Text>
          </View>
        )}
        {type === 'humidity' && (
          <View style={styles.progressBar}>
            <View style={styles.rowSb}>
              <Text style={styles.progressText}>0</Text>
              <Text style={styles.progressText}>50</Text>
              <Text style={styles.progressText}>100</Text>
            </View>
            <Spacer height={3} />
            <Bar
              progress={value * 0.01}
              color={AppColors.yellow}
              unfilledColor={AppColors.white}
              width={229}
              borderColor="transparent"
            />
            <Spacer height={3} />
            <Text style={[styles.progressText]}>%</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerPadding: {paddingBottom: 32},
  background: {
    paddingTop: 22,
    paddingBottom: 35,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
  },
  title: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Raleway',
  },
  value: {
    fontSize: 64,
    color: AppColors.white,
    fontWeight: '500',
    fontFamily: 'Raleway',
  },
  suffix: {
    fontSize: 36,
    color: AppColors.white,
    fontWeight: '400',
    fontFamily: 'Raleway',
  },
  circleBackground: {
    backgroundColor: AppColors.grey,
    borderRadius: 100,
    padding: 6,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  rowSb: {flexDirection: 'row', justifyContent: 'space-between'},
  windStatusTrailing: {color: AppColors.white, fontFamily: 'Raleway'},
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: AppColors.white,
    fontFamily: 'Raleway',
    textAlign: 'right',
  },
  progressBar: {width: 229},
});
