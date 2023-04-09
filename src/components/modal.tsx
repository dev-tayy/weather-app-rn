import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React from 'react';
import {View, Text} from 'react-native';
import {AppColors} from '../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

type BottomSheetContentProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function BottomSheetContent({
  bottomSheetRef,
  setModalVisible,
}: BottomSheetContentProps): JSX.Element {
  return (
    <View style={{}}>
      <View style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            bottomSheetRef.current?.close();
            setModalVisible(false);
          }}>
          <Icon name="close" size={25} color={AppColors.white} />
        </TouchableOpacity>
      </View>
      <Text>Awesome 🎉</Text>
    </View>
  );
}
