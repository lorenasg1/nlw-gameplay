import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { Background } from '../../components/Background';
import { Button } from '../../components/Button';
import { CategorySelect } from '../../components/CategorySelect';
import { Guild } from '../../components/Guild';
import { GuildIcon } from '../../components/GuildIcon';
import { Header } from '../../components/Header';
import { ModalView } from '../../components/ModalView';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { COLLECTION_APPOINTMENTS } from '../../config/storage';
import { theme } from '../../shared/styles/theme';
import { Guilds } from '../Guilds';
import { styles } from './styles';

export function AppointmentCreate() {
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [isGuildModalOpen, setIsGuildModalOpen] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<Guild>({} as Guild);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  function handleOpenGuildModal() {
    setIsGuildModalOpen(true);
  }

  function handleCloseGuildModal() {
    setIsGuildModalOpen(false);
  }

  function handleSelectedGuild(selectedGuild: Guild) {
    setSelectedGuild(selectedGuild);
    setIsGuildModalOpen(false);
  }

  function handleSelectCategory(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleCreateAppointment() {
    const newAppointment = {
      id: uuid.v4(),
      guild: selectedGuild,
      category,
      date: `${day}/${month} às ${hour}/${minute}h`,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.goBack();
  }

  return (
    <Background>
      <ScrollView>
        <Header title="Agendar partida" />

        <Text
          style={[
            styles.label,
            { marginTop: 36, marginBottom: 18, marginLeft: 24 },
          ]}
        >
          Categoria
        </Text>

        <CategorySelect
          hasCheckbox
          selectedCategory={category}
          setCategory={handleSelectCategory}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuildModal}>
            <View style={styles.select}>
              {selectedGuild.icon ? (
                <GuildIcon
                  guildId={selectedGuild.id}
                  iconId={selectedGuild.icon}
                />
              ) : (
                <View style={styles.image} />
              )}

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {selectedGuild.name
                    ? selectedGuild.name
                    : 'Selecione um servidor'}
                </Text>
              </View>

              <Feather
                name={'chevron-right'}
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={[styles.label, { marginBottom: 12 }]}>
                Dia e mês
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} onChangeText={setDay} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} onChangeText={setMonth} />
              </View>
            </View>

            <View>
              <Text style={[styles.label, { marginBottom: 12 }]}>
                Hora e minuto
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} onChangeText={setHour} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} onChangeText={setMinute} />
              </View>
            </View>
          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={[styles.label, { marginBottom: 12 }]}>Descrição</Text>

            <Text style={styles.charLimit}>Max 100 caracteres</Text>
          </View>
          <TextArea
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            onChangeText={setDescription}
          />

          <View style={styles.footer}>
            <Button title="Agendar" onPress={handleCreateAppointment} />
          </View>
        </View>
      </ScrollView>

      <ModalView visible={isGuildModalOpen} closeModal={handleCloseGuildModal}>
        <Guilds handleSelectedGuild={handleSelectedGuild} />
      </ModalView>
    </Background>
  );
}
