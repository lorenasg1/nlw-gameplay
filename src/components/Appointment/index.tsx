import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { theme } from '../../shared/styles/theme';
import { categories } from '../../utils/categories';
import { GuildIcon } from '../GuildIcon';
import { styles } from './styles';
import { Guild } from '../Guild';
import { LinearGradient } from 'expo-linear-gradient';

export type AppointmentProps = {
  id: string;
  guild: Guild;
  category: string;
  date: string;
  description: string;
};

type AppointmentComponentProps = RectButtonProps & {
  data: AppointmentProps;
};

export function Appointment({ data, ...props }: AppointmentComponentProps) {
  const [category] = categories.filter((item) => item.id === data.category);
  const { owner } = data.guild;
  const { primary, on, secondary50, secondary70 } = theme.colors;

  return (
    <RectButton {...props}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>

            <Text style={styles.category}>{category.title}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>{data.date}</Text>
            </View>

            <View style={styles.playerInfo}>
              <PlayerSvg fill={owner ? primary : on} />

              <Text style={[styles.player, { color: owner ? primary : on }]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
