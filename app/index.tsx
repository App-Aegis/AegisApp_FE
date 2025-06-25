import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/splash'); // an toàn hơn push
    }, 0); // Hoặc thêm độ trễ nhỏ nếu muốn
    return () => clearTimeout(timeout);
  }, []);

  return null;
}

