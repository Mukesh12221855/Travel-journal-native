import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  onSearch: (text: string) => void;
};

export default function JournalHeader({ onSearch }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Travel Journal</Text>
      <Text style={styles.subheading}>3 adventures recorded</Text>
      
      <TextInput
        placeholder="Search your trips..."
        placeholderTextColor="#999"
        style={styles.searchInput}
        onChangeText={onSearch}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
