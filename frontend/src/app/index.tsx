import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function Index() {
  const { user } = useAuthStore();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // If user is a vendor and hasn't finished KYC, redirect to KYC. 
  // For MVP, we will direct everyone to Map/Main. Vendor dashboard will handle KYC check.
  return <Redirect href="/(main)/map" />;
}
