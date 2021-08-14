import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../shared/styles/theme';
import React, { ReactNode } from 'react';

type BackgroundProps = {
  children: ReactNode;
};

export function Background({ children }: BackgroundProps) {
  const { secondary80, secondary100 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  );
}
