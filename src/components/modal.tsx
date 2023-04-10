import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {AppColors} from '../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Spacer} from './spacer';
import {LocationTile} from './location.tile';
import {fetchWeather} from '../repositories/weather.repository';
import {Weather} from '../models/weather.model';

export type BottomSheetContentProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setWeatherData?: React.Dispatch<React.SetStateAction<Weather | undefined>>;
};

export function BottomSheetContent({
  bottomSheetRef,
  setModalVisible,
  setWeatherData,
}: BottomSheetContentProps): JSX.Element {
  const [value, onChangeText] = useState<string | undefined>();
  const [showPlaceHolder, setPlaceHolderValue] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>();
  const [weather, setWeather] = useState<Weather>();

  const handleTextChange = (text: string) => {
    onChangeText(text);
    setPlaceHolderValue(text === '');
  };

  const handleBottomSheetClose = () => {
    bottomSheetRef.current?.close();
    setModalVisible(false);
    Keyboard.dismiss();
    if (weather && setWeatherData) {
      setWeatherData(weather);
    }
  };

  return (
    <View style={{}}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleBottomSheetClose}
        style={styles.closeIcon}>
        <Icon name="close" size={30} color={AppColors.white} />
      </TouchableOpacity>
      <View style={{flexDirection: styles.placeholder.flexDirection}}>
        <View style={styles.inputField}>
          <TextInput
            autoFocus={true}
            cursorColor={AppColors.white}
            inputMode="search"
            returnKeyType="search"
            style={{
              color: styles.inputField.color,
              fontSize: styles.inputField.fontSize,
            }}
            underlineColorAndroid="transparent"
            value={value}
            onChangeText={handleTextChange}
          />
          {showPlaceHolder && (
            <View style={styles.placeholder} pointerEvents="none">
              <Icon name="search" size={23} color={AppColors.greyText} />
              <Text style={styles.placeholderText}>search location</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.searchBtn}
          onPress={async () => {
            if (value) {
              setLoading(true);
              const result = await fetchWeather(value)();

              switch (result._tag) {
                case 'Left':
                  setError(result.left.message);
                  break;

                case 'Right':
                  setError(null);
                  setWeather(result.right);
                  break;
              }

              setLoading(false);
            }
          }}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Spacer height={38} />
      {error && !isLoading && (
        <View style={styles.displayColumn}>
          <Icon name="info" size={23} color={AppColors.greyText} />
          <Spacer height={5} />
          <Text style={styles.displayText}>{error}</Text>
        </View>
      )}
      {isLoading && (
        <View style={styles.displayColumn}>
          <ActivityIndicator size={'small'} style={styles.loader} />
          <Spacer height={15} />
          <Text style={styles.displayText}>Loading...</Text>
        </View>
      )}
      {weather && !isLoading && !error && (
        <View>
          <FlatList
            data={[weather]}
            scrollEnabled={false}
            renderItem={_ => (
              <LocationTile
                location={weather.address}
                onPressed={handleBottomSheetClose}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderColor: AppColors.white,
    borderEndColor: AppColors.white,
    padding: 18,
    borderWidth: 1,
    color: AppColors.white,
    fontSize: 16,
    flex: 1,
  },
  placeholderText: {
    color: AppColors.greyText,
    fontSize: 16,
    paddingLeft: 10,
  },
  placeholder: {
    position: 'absolute',
    flexDirection: 'row',
    paddingLeft: 15,
    padding: 17,
  },
  closeIcon: {alignSelf: 'flex-end', paddingBottom: 30},
  searchBtn: {
    backgroundColor: AppColors.blue,
    marginLeft: 12,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  searchBtnText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  displayColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loader: {height: 5, width: 5},
  displayText: {color: AppColors.white, textAlign: 'center'},
});
