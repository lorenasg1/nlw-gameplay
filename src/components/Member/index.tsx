import React from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../shared/styles/theme';
import { Avatar } from '../Avatar';
import { styles } from './styles';

type Member = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
};

export type MemberProps = {
  data: Member;
};

export function Member({ data }: MemberProps) {
  const isOnline = data.status === 'online';

  const { on, primary } = theme.colors;

  return (
    <View style={styles.container}>
      <Avatar imageUrl={data.avatar_url} />

      <View>
        <Text style={styles.title}>{data.username}</Text>

        <View style={[styles.status]}>
          <View
            style={[
              styles.bulletStatus,
              { backgroundColor: isOnline ? on : primary },
            ]}
          />
          <Text style={[styles.nameStatus]}>
            {isOnline ? 'Disponível' : 'Ocupado'}
          </Text>
        </View>
      </View>
    </View>
  );
}
