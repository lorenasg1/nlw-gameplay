import React from 'react';

import { ActivityIndicator, View } from 'react-native';
import { theme } from '../../shared/styles/theme';

import { styles } from './styles';

export function Loading() {
  return (
    <View>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
