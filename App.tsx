/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useRef, useState, useEffect} from 'react';
import {AppColors, getWeatherIcon} from './src/utils/constants';
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
import {fetchWeatherOnStart} from './src/repositories/weather.repository';
import Snackbar from 'react-native-snackbar';

function App(): JSX.Element {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [weather, setWeather] = useState<Weather>();
  const [resolvedAddress, setResolvedAddress] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  async function fetchWeather() {
    setLoading(true);
    let result = await fetchWeatherOnStart()();
    switch (result._tag) {
      case 'Left':
        setLoading(false);
        Snackbar.show({
          text: result.left.message,
          duration: Snackbar.LENGTH_SHORT,
          numberOfLines: 2,
          textColor: AppColors.white,
          backgroundColor: 'red',
        });
        break;
      case 'Right':
        setLoading(false);
        setWeather(result.right.weather);
        setResolvedAddress(result.right.address);
        break;
    }
  }

  useEffect(() => {
    fetchWeather();
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
          handleLocationTap={async () => {
            await fetchWeather();
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
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color={AppColors.yellow} />
        </View>
      )}
      {modalVisible && <View style={styles.shadow} />}
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primary,
    opacity: 0.7,
  },
});

export default App;
