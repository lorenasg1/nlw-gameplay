import React, { useEffect, useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Fontisto } from '@expo/vector-icons';
import { theme } from '../../shared/styles/theme';
import {
  Alert,
  FlatList,
  ImageBackground,
  Platform,
  Share,
  Text,
  View,
} from 'react-native';
import bannerImg from '../../assets/banner.png';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Loading } from '../../components/Loading';
import * as Linking from 'expo-linking';

type RouteParams = {
  selectedGuild: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
};

export function AppointmentDetails() {
  const route = useRoute();
  const { selectedGuild } = route.params as RouteParams;

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${selectedGuild.guild.id}/widget.json`
      );

      setWidget(response.data);
    } catch {
      Alert.alert(
        'Verifique as configurações do servidor. O widget está habilitado'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${selectedGuild.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleEnterGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          selectedGuild.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={18} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{selectedGuild.guild.name}</Text>
          <Text style={styles.subtitle}>{selectedGuild.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />
          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}

      {selectedGuild.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleEnterGuild} />
        </View>
      )}
    </Background>
  );
}
