import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { router, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

export default function BottomNav() {
  const theme = useTheme();
  const { user } = useAuthStore();
  const pathname = usePathname();

  // Hide on certain screens
  const hiddenScreens = ['/edit-profile', '/kyc-intro', '/vendor-registration'];
  if (hiddenScreens.some(screen => pathname.includes(screen))) {
    return null;
  }

  const isMap = pathname === '/(main)/map' || pathname === '/map';
  const isFavorites = pathname.includes('/favorites');
  const isDashboard = pathname.includes('/vendor-dashboard');
  const isProfile = pathname.includes('/profile');

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => router.push('/(main)/map')}
      >
        <MaterialCommunityIcons 
          name={isMap ? "map" : "map-outline"} 
          size={28} 
          color={isMap ? theme.colors.primary : "#888"} 
        />
        <Text style={[styles.navText, isMap && { color: theme.colors.primary }]}>Explore</Text>
      </TouchableOpacity>

      {user?.role === 'VENDOR' && (
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(main)/vendor-dashboard')}
        >
          <MaterialCommunityIcons 
            name={isDashboard ? "view-dashboard" : "view-dashboard-outline"} 
            size={28} 
            color={isDashboard ? theme.colors.primary : "#888"} 
          />
          <Text style={[styles.navText, isDashboard && { color: theme.colors.primary }]}>Dashboard</Text>
        </TouchableOpacity>
      )}

      {user?.role === 'CUSTOMER' && (
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(main)/favorites')}
        >
          <MaterialCommunityIcons 
            name={isFavorites ? "heart" : "heart-outline"} 
            size={28} 
            color={isFavorites ? theme.colors.primary : "#888"} 
          />
          <Text style={[styles.navText, isFavorites && { color: theme.colors.primary }]}>Favorites</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => router.push('/(main)/profile')}
      >
        <MaterialCommunityIcons 
          name={isProfile ? "account" : "account-outline"} 
          size={28} 
          color={isProfile ? theme.colors.primary : "#888"} 
        />
        <Text style={[styles.navText, isProfile && { color: theme.colors.primary }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 1000,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
    fontWeight: '500',
  }
});
