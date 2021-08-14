import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { discordAuthConfig } from '../config/discordAuth';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_USERS } from '../config/storage';

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const { CLIENT_ID } = process.env;
  const { REDIRECT_URI } = process.env;
  const { RESPONSE_TYPE } = process.env;
  const { SCOPE } = process.env;
  const { CDN_URL } = process.env;

  // const { REDIRECT_URI, CLIENT_ID, RESPONSE_TYPE, SCOPE, CDN_URL } =
  // discordAuthConfig;

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_URL}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const user = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(user));

        setUser(user);
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setUser({} as User);

    AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const authenticatedUser = JSON.parse(storage) as User;

      api.defaults.headers.authorization = `Bearer ${authenticatedUser.token}`;

      setUser(authenticatedUser);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
