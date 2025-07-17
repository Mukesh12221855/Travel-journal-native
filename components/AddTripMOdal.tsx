import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Video } from 'expo-av';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAddTrip: (trip: {
    title: string;
    description: string;
    image: any;
    media: { uri: string; type: 'image' | 'video' }[];
    date: Date;
  }) => void;
};

export default function AddTripModal({ visible, onClose, onAddTrip }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<{ uri: string; type: 'image' | 'video' }[]>([]);
  const [tripDate, setTripDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickCoverImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission required to access gallery!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

 const pickExtraMedia = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert('Permission required to access gallery!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsMultipleSelection: true,
    quality: 1,
  });

  if (!result.canceled && 'assets' in result && result.assets.length > 0) {
    const newMedia = result.assets.map((asset: any) => ({
      uri: asset.uri,
      type: asset.type === 'video' ? 'video' : 'image',
    }));
    setMediaList((prev) => [...prev, ...newMedia]);
  }
};


  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTripDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    if (title && description) {
      onAddTrip({
        title,
        description,
        image: imageUri ? { uri: imageUri } : null,
        media: mediaList,
        date: tripDate,
      });

      // Reset fields
      setTitle('');
      setDescription('');
      setImageUri(null);
      setMediaList([]);
      setTripDate(new Date());
      onClose();
    } else {
      alert('Please enter both title and description.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add New Trip</Text>

        <TextInput
          style={styles.input}
          placeholder="Trip Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.pickImageButton} onPress={pickCoverImage}>
          <Text style={styles.buttonText}>Pick Cover Image</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        )}

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>
            Select Trip Date: {tripDate.toDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={tripDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.extraMediaButton} onPress={pickExtraMedia}>
          <Text style={styles.buttonText}>Choose More Images & Videos</Text>
        </TouchableOpacity>

        <View style={styles.mediaPreview}>
          {mediaList.map((media, index) =>
            media.type === 'image' ? (
              <Image key={index} source={{ uri: media.uri }} style={styles.mediaItem} />
            ) : (
              <Video
                key={index}
                source={{ uri: media.uri }}
                style={styles.mediaItem}
                useNativeControls
                // resizeMode="cover"
              />
            )
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#FFF7EE',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#121111ff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickImageButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  extraMediaButton: {
    backgroundColor: '#D2691E',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  mediaPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mediaItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#00AA88',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancel: {
    textAlign: 'center',
    color: '#888',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
