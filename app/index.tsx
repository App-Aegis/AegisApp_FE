import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Use a timeout to ensure the router is ready
    const timer = setTimeout(() => {
      router.replace('/splash');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  // Return a minimal view while redirecting
  return <View style={{ flex: 1, backgroundColor: '#522546' }} />;
}
