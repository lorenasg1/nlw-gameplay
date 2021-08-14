import { StyleSheet } from 'react-native';
import { theme } from '../../shared/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 95,
    backgroundColor: theme.colors.secondary40,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    borderRadius: 8,
    fontSize: 13,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    textAlignVertical: 'top',
  },
});
