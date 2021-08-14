import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';
import { Category } from '../Category';
import { styles } from './styles';

type CategorySelectedProps = {
  selectedCategory: string;
  setCategory: (categoryId: string) => void;
  hasCheckbox?: boolean;
};

export function CategorySelect({
  selectedCategory,
  setCategory,
  hasCheckbox = false,
}: CategorySelectedProps) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === selectedCategory}
          onPress={() => setCategory(category.id)}
          hasCheckbox={hasCheckbox}
        />
      ))}
    </ScrollView>
  );
}
