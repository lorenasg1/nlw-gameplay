import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Loading } from '../../components/Loading';
import { Profile } from '../../components/Profile';
import { COLLECTION_APPOINTMENTS } from '../../config/storage';

import { styles } from './styles';

export function Home() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  function handleSelectCategory(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(selectedGuild: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { selectedGuild });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const storedAppointments: AppointmentProps[] = storage
      ? JSON.parse(storage)
      : [];

    if (category) {
      setAppointments(
        storedAppointments.filter(
          (appointment) => appointment.category === category
        )
      );
    } else {
      setAppointments(storedAppointments);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <View>
        <CategorySelect
          selectedCategory={category}
          setCategory={handleSelectCategory}
        />
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />

          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 64 }}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}
