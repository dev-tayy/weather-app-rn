import {View, Image, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppColors, AppImages} from '../utils/constants';
import React from 'react';
import metrics from '../utils/metrics';
import {BottomSheetContentProps} from '../components/modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

type WeatherHomeProps = BottomSheetContentProps & {
  celsius: number;
  description: string;
  location: string;
  image: string;
  handleLocationTap: () => void;
};

export function WeatherHome({
  setModalVisible,
  bottomSheetRef,
  celsius,
  location,
  image,
  description,
  handleLocationTap,
}: WeatherHomeProps): JSX.Element {
  return (
    <View style={[styles.background]}>
      <Image source={AppImages.cloud} style={[styles.cloudImage, {}]} />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.searchButton}
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(true);
            bottomSheetRef.current?.expand();
          }}>
          <Text style={[styles.mainText]}>Search for a place</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gpsButton}
          activeOpacity={0.7}
          onPress={handleLocationTap}>
          <Icon name="navigation" size={18} color={AppColors.white} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={styles.currentWeatherImage}
          resizeMode="contain"
        />
        <View style={styles.tempRow}>
          <Text style={styles.weatherText}>{celsius}</Text>
          <Text style={styles.celciusText}>℃</Text>
        </View>
        <Text
          style={[
            styles.celciusText,
            {
              fontWeight: styles.weatherText.fontWeight,
              alignSelf: styles.gpsButton.alignSelf,
            },
          ]}>
          {description}
        </Text>
      </View>
      <View style={styles.tempRow}>
        <Text
          style={[
            styles.celciusText,
            {fontSize: styles.mainText.fontSize + 2},
          ]}>
          Today
        </Text>
        <Text
          style={[
            styles.celciusText,
            {
              fontSize: styles.mainText.fontSize + 2,
              marginHorizontal: styles.mainText.fontSize,
            },
          ]}>
          •
        </Text>
        <Text
          style={[
            styles.celciusText,
            {fontSize: styles.mainText.fontSize + 2},
          ]}>
          Fri, 5 Jun
        </Text>
      </View>
      <View style={styles.tempRow}>
        <Text
          style={[
            styles.celciusText,
            {fontSize: styles.mainText.fontSize + 2},
          ]}>
          {location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: AppColors.primary,
    height: metrics.height - 50,
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  searchButton: {
    backgroundColor: AppColors.grey,
    paddingHorizontal: 18,
    paddingVertical: 11,
    width: '100%',
  },
  gpsButton: {
    backgroundColor: AppColors.grey,
    padding: 9,
    alignSelf: 'center',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    color: AppColors.white,
    fontSize: 16,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cloudImage: {
    marginTop: 50,
    opacity: 0.05,
    position: 'absolute',
    alignSelf: 'center',
  },
  weatherText: {
    fontSize: 144,
    color: AppColors.white,
    fontFamily: 'Raleway',
    fontWeight: '400',
  },
  celciusText: {
    fontSize: 48,
    color: AppColors.greyText,
    fontFamily: 'Raleway',
    fontWeight: '300',
    alignSelf: 'center',
    textAlign: 'center',
  },
  tempRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 33,
  },
  currentWeatherImage: {
    width: 150,
    height: 174,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: -20,
  },
});
