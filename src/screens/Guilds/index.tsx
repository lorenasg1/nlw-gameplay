import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Guild } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';
import { styles } from './styles';

type GuildsProps = {
  handleSelectedGuild: (guild: Guild) => void;
};

export function Guilds({ handleSelectedGuild }: GuildsProps) {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleSelectedGuild(item)} />
          )}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 64, paddingTop: 104 }}
          ListHeaderComponent={() => <ListDivider isCentered />}
          showsVerticalScrollIndicator={false}
          style={styles.guilds}
        />
      )}
    </View>
  );
}
