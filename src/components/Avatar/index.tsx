import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, View } from 'react-native';
import { theme } from '../../shared/styles/theme';

import { styles } from './styles';

type AvatarProps = {
  imageUrl: string;
};

export function Avatar({ imageUrl }: AvatarProps) {
  const { secondary50, secondary70 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary70]}
    >
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
    </LinearGradient>
  );
}
