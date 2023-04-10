/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useRef, useState} from 'react';
import {AppColors, getWeatherIcon} from './src/utils/constants';
import BottomSheet from '@gorhom/bottom-sheet';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import metrics from './src/utils/metrics';
import {Spacer} from './src/components/spacer';
import {BottomSheetContent} from './src/components/modal';
import {SubWeather} from './src/screens/sub.weather';
import {TodayHighlight} from './src/screens/highlight';
import {WeatherHome} from './src/screens/weather';
import {ConditionType, Weather} from './src/models/weather.model';

function App(): JSX.Element {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [weather, setWeather] = useState<Weather>();

  return (
    <GestureHandlerRootView style={{flex: styles.background.flex}}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={AppColors.primary}
      />
      <ScrollView
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
          location={weather?.resolvedAddress ?? 'No location detected'}
          image={getWeatherIcon(
            weather?.currentConditions.icon ?? ConditionType.ClearDay,
          )}
          bottomSheetRef={bottomSheetRef}
          setModalVisible={setModalVisible}
        />
        <View style={styles.darkBackground}>
          <Spacer height={52} />
          {/* sub weather arena */}
          <SubWeather />
          <Spacer height={51} />
          {/* today highlight arena */}
          <TodayHighlight />
          <Spacer height={130} />
        </View>
      </ScrollView>
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
});

export default App;
