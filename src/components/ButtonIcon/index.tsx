import React from 'react';
import { Image, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import discordLogo from '../../assets/discord.png';
import { styles } from './styles';

type IconButtonProps = RectButtonProps & {
  title: string;
};

export function ButtonIcon({ title, ...props }: IconButtonProps) {
  return (
    <RectButton style={styles.container} {...props}>
      <View style={styles.iconWrapper}>
        <Image source={discordLogo} style={styles.icon} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
