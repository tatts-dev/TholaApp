import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme, Avatar, Divider, List } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        {user?.profile_picture ? (
          <Avatar.Image size={80} source={{ uri: user.profile_picture }} />
        ) : (
          <Avatar.Text 
            size={80} 
            label={user?.full_name?.substring(0, 2).toUpperCase() || 'U'} 
            style={{ backgroundColor: theme.colors.primary }} 
          />
        )}
        <Text variant="headlineSmall" style={styles.name}>{user?.full_name}</Text>
        <Text variant="bodyMedium" style={styles.email}>{user?.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{user?.role}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        {user?.bio ? <Text style={styles.bioText}>"{user.bio}"</Text> : null}
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{user?.age ? `${user.age} yrs` : '--'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{user?.location || 'Not set'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <List.Section>
          <List.Subheader>Account Settings</List.Subheader>
          <List.Item
            title="Edit Profile"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/(main)/edit-profile')}
          />
          <Divider />
          <List.Item
            title="Notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/(main)/notifications')}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/(main)/help-support')}
          />
        </List.Section>
      </View>

      <Button 
        mode="outlined" 
        icon="logout" 
        style={styles.logoutButton} 
        textColor={theme.colors.error}
        onPress={handleLogout}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
    backgroundColor: '#E3F2FD',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  email: {
    color: '#666',
    marginTop: 4,
  },
  badge: {
    marginTop: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bioText: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  infoDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  logoutButton: {
    margin: 24,
    marginTop: 'auto',
    borderColor: '#ff5252',
  }
});
