import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { theme } from '../../shared/styles/theme';
import { styles } from './styles';

type CategoryProps = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  hasCheckbox?: boolean;
  checked?: boolean;
};

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckbox = false,
  ...props
}: CategoryProps) {
  const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;

  return (
    <RectButton {...props}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <LinearGradient
          style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[checked ? secondary85 : secondary50, secondary40]}
        >
          {hasCheckbox && (
            <View style={checked ? styles.checked : styles.unchecked} />
          )}

          <Icon width={48} height={48} />

          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}
