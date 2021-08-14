import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { styles } from './styles';

type IconButtonProps = RectButtonProps & {
  title: string;
};

export function Button({ title, ...props }: IconButtonProps) {
  return (
    <RectButton style={styles.container} {...props}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
