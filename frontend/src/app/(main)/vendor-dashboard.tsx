import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, useTheme, Avatar, Divider, ActivityIndicator } from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import apiClient from '../../api/client';

export default function VendorDashboard() {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState<string>('PENDING');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const kycRes = await apiClient.get('/kyc/status');
      if (kycRes.data.status) {
        setKycStatus(kycRes.data.status);
      }

      // Fetch vendor products using user ID mapping would go here
      // For MVP, if we had the vendor ID readily in the user context, we'd use it:
      // const productsRes = await apiClient.get(`/products/vendor/${user.vendor_id}`);
      // setProducts(productsRes.data);
    } catch (error) {
      console.log('Error fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Avatar.Text size={64} label={user?.full_name?.substring(0, 2) || 'VN'} style={styles.avatar} />
        <Text variant="headlineSmall" style={styles.name}>{user?.full_name}</Text>
        <Text variant="bodyMedium" style={styles.role}>Business Owner</Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.statusCard}>
          <Card.Content>
            <Text variant="titleMedium">Verification Status</Text>
            <View style={styles.statusRow}>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: kycStatus === 'VERIFIED' ? '#4CAF50' : '#FF9800' }
              ]}>
                <Text style={styles.statusText}>{kycStatus}</Text>
              </View>
              {kycStatus !== 'VERIFIED' && (
                <Button mode="text" onPress={() => router.push('/(main)/kyc-intro')}>
                  Complete KYC
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>

        <Text variant="titleLarge" style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <Button icon="plus" mode="contained-tonal" style={styles.actionBtn} onPress={() => {}}>
            Add Product
          </Button>
          <Button icon="map" mode="contained-tonal" style={styles.actionBtn} onPress={() => router.replace('/(main)/map')}>
            View Map
          </Button>
        </View>

        <Text variant="titleLarge" style={styles.sectionTitle}>Catalogue ({products.length})</Text>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : products.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge" style={{ color: '#666' }}>No products added yet.</Text>
          </View>
        ) : (
          products.map((p: any) => (
            <Card key={p.id} style={styles.productCard}>
              <Card.Title title={p.name} subtitle={`R ${p.price}`} />
            </Card>
          ))
        )}

        <Button mode="outlined" style={styles.logoutBtn} onPress={handleLogout} textColor={theme.colors.error}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
  },
  role: {
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    padding: 20,
  },
  statusCard: {
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionBtn: {
    flex: 1,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  productCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  logoutBtn: {
    marginTop: 40,
    marginBottom: 20,
    borderColor: '#B00020',
  }
});
