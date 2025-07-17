import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Video } from 'expo-av'; // ✅ Required for rendering videos

export default function TripDetailScreen() {
  const { id, description, image, media } = useLocalSearchParams();
 
  // ✅ Parse media if it's passed as a JSON string
  let mediaList: { uri: string; type: 'image' | 'video' }[] = [];
  try {
    if (media && typeof media === 'string') {
      mediaList = JSON.parse(decodeURIComponent(media));
    }
  } catch (err) {
    console.warn('Failed to parse media:', err);
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={
          typeof image === 'string' && image.startsWith('http')
            ? { uri: image }
            : require('../../assets/images/mountains.png')
        }
        style={styles.image}
      />
      <Text style={styles.title}>{id}</Text>
      <Text style={styles.description}>{description}</Text>

      {/* ✅ Gallery section */}
      <View style={styles.mediaGallery}>
        {mediaList.map((file, index) =>
          file.type === 'image' ? (
            <Image key={index} source={{ uri: file.uri }} style={styles.mediaItem} />
          ) : (
            <Video
              key={index}
              source={{ uri: file.uri }}
              style={styles.mediaItem}
              useNativeControls
            //   resizeMode="cover"
            />
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF7EE',
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e0d0dff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  mediaGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  mediaItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
});
