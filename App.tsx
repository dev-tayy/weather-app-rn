/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useRef, useState, useMemo} from 'react';
import {AppColors, LatLng, getWeatherIcon} from './src/utils/constants';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import metrics from './src/utils/metrics';
import {Spacer} from './src/components/spacer';
import {BottomSheetContent} from './src/components/modal';
import {SubWeather} from './src/screens/sub.weather';
import {TodayHighlight} from './src/screens/highlight';
import {WeatherHome} from './src/screens/weather';
import {ConditionType, Weather} from './src/models/weather.model';
import {requestLocationPermission} from './src/utils/permission.handler';
import {
  fetchWeather,
  reverseGeocoding,
} from './src/repositories/weather.repository';
import Geolocation from 'react-native-geolocation-service';

function App(): JSX.Element {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [weather, setWeather] = useState<Weather>();
  const [location, setLocation] = useState<LatLng>();
  const [resolvedAddress, setResolvedAddress] = useState<string>();
  const [isLoading, setLoading] = useState(true);

  const handleLocation = async () => {
    const result = await requestLocationPermission()();
    if (result._tag === 'Right') {
      const status = result.right;
      if (status === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            setLocation({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          error => {
            //set default fallback location to Lagos, Nigeria
            setLocation({
              lat: 6.465422,
              long: 3.406448,
            });
            console.log(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log(status);
      }
    }
  };

  const handleWeatherData = async () => {
    if (location) {
      const result = await fetchWeather(`${location.lat},${location.long}`)();
      switch (result._tag) {
        case 'Left':
          console.log(result.left.message);
          // setError(result.left.message);
          break;
        case 'Right':
          // setError(null);
          setWeather(result.right);
          break;
      }
    }
  };

  const handleReverseGeocoding = async () => {
    if (location) {
      const result = await reverseGeocoding(location)();
      if (result._tag === 'Left') {
        console.log(result.left.message);
        // setError(result.left.message);
      } else {
        setResolvedAddress(result.right);
      }
    }
  };

  useMemo(() => {
    Promise.all([
      handleLocation(),
      handleReverseGeocoding(),
      handleWeatherData(),
    ]);
    setLoading(false);
    console.log('====================================');
    console.log('WHY ARE YOU RE-RENDERING HMM?');
    console.log('====================================');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView style={{flex: styles.background.flex}}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={AppColors.primary}
      />
      <ScrollView
        endFillColor={AppColors.darkPrimary}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        overScrollMode="never"
        style={{
          backgroundColor: AppColors.primary,
        }}>
        {/*  weather home arena */}
        <WeatherHome
          celsius={weather?.currentConditions.temp ?? 0}
          description={weather?.currentConditions.conditions ?? 'N/A'}
          location={
            (Number(weather?.resolvedAddress[0])
              ? resolvedAddress
              : weather?.resolvedAddress) ?? 'No location detected'
          }
          image={getWeatherIcon(
            weather?.currentConditions.icon ?? ConditionType.ClearDay,
          )}
          bottomSheetRef={bottomSheetRef}
          setModalVisible={setModalVisible}
          handleLocationTap={() => {
            Promise.all([
              handleLocation(),
              handleReverseGeocoding(),
              handleWeatherData(),
            ]);
            setLoading(false);
          }}
        />
        <View style={styles.darkBackground}>
          <Spacer height={52} />
          {/* sub weather arena */}
          <SubWeather forecastWeather={weather?.days.slice(0, 5) ?? []} />
          <Spacer height={51} />
          {/* today highlight arena */}
          <TodayHighlight highlights={weather?.currentConditions} />
          <Spacer height={130} />
        </View>
      </ScrollView>
      {modalVisible && <View style={styles.shadow} />}
      {isLoading && (
        <View style={styles.shadow}>
          <ActivityIndicator size={'small'} />
        </View>
      )}
      {modalVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          detached={true}
          index={0}
          backgroundComponent={null}
          handleComponent={null}
          onClose={() => setModalVisible(false)}
          style={[styles.modalSheet]}
          snapPoints={['85']}>
          <BottomSheetContent
            bottomSheetRef={bottomSheetRef}
            setModalVisible={setModalVisible}
            setWeatherData={setWeather}
          />
        </BottomSheet>
      )}
    </GestureHandlerRootView>
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
  modalSheet: {
    backgroundColor: AppColors.primary,
    color: AppColors.primary,
    borderRadius: 20,
    paddingTop: 17,
    paddingHorizontal: 13,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  darkBackground: {
    backgroundColor: AppColors.darkPrimary,
    paddingHorizontal: 23,
  },
});

export default App;
