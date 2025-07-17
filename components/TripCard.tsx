import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  image: any;
  description: string;
  media?: { uri: string; type: 'image' | 'video' }[]; // 
  onDelete: () => void;
};

export default function TripCard({ title, image, description, onDelete }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/(tabs)/[id]', // 
          params: {
            id: title, // ✅ used in [id].tsx
            description,
            image: typeof image === 'object' && image.uri ? image.uri : '',
          },
        })
      }
    >
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <View style={styles.textSection}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}</Text>
           <TouchableOpacity
  onPress={() => {
    console.log('🗑️ Delete button pressed for:', title);
    onDelete(); // ✅ Should call the function from parent
  }}
>
  <Ionicons name="trash-outline" size={20} color="#A0522D" />
</TouchableOpacity>


          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  textSection: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#100f0fff',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
