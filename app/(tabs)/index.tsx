import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Header from '../../components/Header';
import JournalHeader from '../../components/JournalHeader';
import AddTripButton from '../../components/AddTripButton';
import TripCard from '../../components/TripCard';
import AddTripModal from '../../components/AddTripMOdal';
import travelAnimation from '../../assets/animations/travel-intro.json'; //


const initialTrips = [
  {
    title: 'Sunset in Santorini',
    description: 'A peaceful evening by the sea.Santorini is a beautiful Greek island known for its white-washed buildings, blue domes, and breathtaking sunsets. Walking through the narrow streets of Oia, enjoying the sea breeze, and watching the sun dip below the Aegean Sea creates a magical experience. The island offers a mix of romance, adventure, and scenic beauty.',
    image: require('../../assets/images/santorini.png'),
  },
  {
    title: 'Paris Adventures',
    description: 'Paris, the City of Light, is famous for its iconic Eiffel Tower, romantic cafés, and charming streets. Whether it’s strolling along the Seine, exploring world-class art at the Louvre, or sipping coffee at a sidewalk café, Paris offers a timeless blend of culture, beauty, and elegance. Every moment in Paris feels like a scene from a movie.',
    image: require('../../assets/images/paris.png'),
  },
  {
    title: 'Mountain Escape',
    description: 'Nestled in the Himalayas, Manali is a paradise for nature lovers and adventure seekers. Surrounded by snow-capped peaks, pine forests, and rivers, it offers peaceful getaways and thrilling treks alike. Whether youre exploring hidden trails or enjoying the mountain air, Manali gives you the perfect escape into nature’s lap.',
    image: require('../../assets/images/mountains.png'),
  },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tripList, setTripList] = useState(initialTrips);

  const filteredTrips = tripList.filter(trip =>
    trip.title.toLowerCase().includes(searchText.toLowerCase())
  );

const handleAddTrip = (newTrip: {
  title: string;
  description: string;
  media: { uri: string; type: 'image' | 'video' }[];
  date: Date;
}) => {
  const coverImage =
    newTrip.media && newTrip.media.length > 0
      ? { uri: newTrip.media[0].uri }
      : require('../../assets/images/mountains.png');

  const tripWithImage = {
    ...newTrip,
    image: coverImage,     //  used as main trip image (cover)
    media: newTrip.media,  //  gallery media list
  };

  setTripList((prev) => [tripWithImage, ...prev]);
};


const handleDeleteTrip = (index: number) => {
  const updatedTrips = [...tripList];
  updatedTrips.splice(index, 1);
  setTripList(updatedTrips);
};



  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={travelAnimation}
        autoPlay
        loop
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <ScrollView>
        <Header />
        <Text style={styles.title}>Welcome to Your Journal  App</Text>
        <JournalHeader onSearch={setSearchText} />

        <AddTripButton onPress={() => setShowModal(true)} />

        <AddTripModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onAddTrip={handleAddTrip}
        />

{filteredTrips.map((trip) => {
  const index = tripList.findIndex(t => t.title === trip.title); // ✅ accurate index

  return (
   <TripCard
  key={trip.title}
  title={trip.title}
  description={trip.description}
  image={trip.image}
  // media={trip.media} // ✅ REQUIRED
  onDelete={() => handleDeleteTrip(index)}
/>

  );
})}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cde398ff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#060606ff',
  },
});
