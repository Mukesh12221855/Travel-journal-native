import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Image
          source={require('../assets/images/travel-icon.png')} // You'll add this image
          style={styles.icon}
        />
        <View>
          <Text style={styles.title}>Travel Journal</Text>
          <Text style={styles.subtitle}>Capture your adventures</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.myTrips}>
          <Text style={styles.myTripsText}>My Trips</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 30,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111110ff',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111110ff',
  },
  tabs: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  myTrips: {
    backgroundColor: '#e1a800ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  myTripsText: {
    color: '#a73500ff',
    fontWeight: 'bold',
  },
  addTripText: {
    color: '#00AA88',
    fontWeight: 'bold',
  },
});
