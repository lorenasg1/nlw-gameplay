import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import illustrationImg from '../../assets/illustration.png';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useAuth } from '../../hooks/useAuth';
import { theme } from '../../shared/styles/theme';
import { styles } from './styles';

export function SignIn() {
  const navigation = useNavigation();
  const { user, loading, signIn } = useAuth();

  async function handleSignIn() {
    // navigation.navigate('Home');

    try {
      await signIn();
    } catch (error) {
      Alert.alert(String(error));
    }
  }
  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={illustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}e organize suas {'\n'}jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games favoritos com seus amigos
          </Text>

          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}
