import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppColors} from '../utils/constants';
import React from 'react';

type LocationTileProps = {
  onPressed?: () => void;
  location: string;
};

export const LocationTile = ({
  location,
  onPressed,
}: LocationTileProps): JSX.Element => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPressed}>
      <View style={styles.tile}>
        <Text style={styles.locationText}>{location}</Text>
        <Icon name="chevron-right" size={23} color={AppColors.greyText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  tile: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingHorizontal: 12,
    paddingVertical: 23,
  },
});
