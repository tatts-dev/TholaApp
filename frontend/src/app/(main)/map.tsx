import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme, Searchbar, FAB, Text, Card, Avatar } from 'react-native-paper';
import * as Location from 'expo-location';
import apiClient from '../../api/client';
import { customMapStyle } from '../../utils/mapStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [vendors, setVendors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<any | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const theme = useTheme();
  const { user } = useAuthStore();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Fetch vendors
      try {
        const response = await apiClient.get('/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      }

      // Fetch user's favorites to show heart status
      if (user?.role === 'CUSTOMER') {
        try {
          const favResponse = await apiClient.get('/favorites');
          const ids = new Set(favResponse.data.map((fav: any) => fav.vendor_id));
          setFavoriteIds(ids as Set<string>);
        } catch (error) {
          console.error('Failed to fetch favorites:', error);
        }
      }
    })();
  }, [user]);

  const toggleFavorite = async (vendorId: string) => {
    try {
      if (favoriteIds.has(vendorId)) {
        await apiClient.delete(`/favorites/${vendorId}`);
        setFavoriteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(vendorId);
          return newSet;
        });
      } else {
        await apiClient.post('/favorites', { vendor_id: vendorId });
        setFavoriteIds(prev => {
          const newSet = new Set(prev);
          newSet.add(vendorId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.headerContainer}>
        <Searchbar
          placeholder="Search for food, clothing, services..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={2}
        />
      </View>

      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : undefined}
      >
        {vendors.map((vendor) => (
          <Marker
            key={vendor.id}
            coordinate={{ latitude: vendor.latitude, longitude: vendor.longitude }}
            onPress={() => setSelectedVendor(vendor)}
          >
            <View style={[styles.markerContainer, { backgroundColor: theme.colors.primary }]}>
              <MaterialCommunityIcons name="store" size={20} color="#fff" />
            </View>
          </Marker>
        ))}
      </MapView>


      {selectedVendor && (
        <Card style={styles.vendorCard} mode="elevated" onPress={() => console.log('Open vendor profile')}>
          <Card.Title
            title={selectedVendor.business_name}
            subtitle={selectedVendor.category}
            left={(props) => <Avatar.Icon {...props} icon="store" style={{ backgroundColor: theme.colors.primary }} />}
            right={(props) => user?.role === 'CUSTOMER' ? (
              <FAB 
                {...props} 
                icon={favoriteIds.has(selectedVendor.id) ? "heart" : "heart-outline"} 
                color={favoriteIds.has(selectedVendor.id) ? theme.colors.error : "#888"}
                style={{ backgroundColor: 'transparent', elevation: 0 }}
                onPress={() => toggleFavorite(selectedVendor.id)} 
              />
            ) : null}
          />
          <Card.Content>
            <Text variant="bodyMedium">{selectedVendor.business_description}</Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  markerContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  vendorCard: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    borderRadius: 16,
  }
});
