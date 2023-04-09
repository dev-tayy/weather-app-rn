import React from 'react';
import {View} from 'react-native';

type SpacerProps = {
  height?: number;
  width?: number;
};

export function Spacer({height, width}: SpacerProps): JSX.Element {
  return (
    <View
      style={{
        paddingBottom: height ?? 0,
        paddingRight: width ?? 0,
      }}
    />
  );
}
