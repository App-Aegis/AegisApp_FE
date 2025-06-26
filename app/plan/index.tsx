// app/plan/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const freePlanFeatures = [
  { icon: 'people-outline', text: 'Quản lý tối đa 2 hồ sơ con' },
  { icon: 'sparkles-outline', text: 'Gợi ý nội dung từ AI' },
  { icon: 'phone-portrait-outline', text: 'Quản lý thiết bị từ xa' },
  { icon: 'bar-chart-outline', text: 'Báo cáo hoạt động cơ bản' },
];

const paidPlanFeatures = [
  { icon: 'people-circle-outline', text: 'Không giới hạn hồ sơ con' },
  { icon: 'location-outline', text: 'Theo dõi vị trí thời gian thực' },
  { icon: 'calendar-outline', text: 'Quản lý lịch học và bài tập' },
  { icon: 'library-outline', text: 'Truy cập nội dung học tập độc quyền' },
  { icon: 'stats-chart-outline', text: 'Phân tích và thống kê nâng cao từ AI' },
  { icon: 'shield-checkmark-outline', text: 'Tất cả các tính năng bảo vệ' },
];

const PlanScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim1 = useRef(new Animated.Value(100)).current;
  const slideAnim2 = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnim1, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim2, {
          toValue: 0,
          duration: 700,
          delay: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleSelectFree = () => {
    router.replace('/home/home');
  };

  const handleSelectPaid = () => {
    router.push('/pland');
  };

  const renderFeature = (feature: { icon: string; text: string }, index: number, isPaid: boolean) => (
    <View key={index} style={styles.featureItem}>
      <Ionicons 
        name={feature.icon as any} 
        size={22} 
        color={isPaid ? '#FFFFFF' : '#4ECDC4'} 
        style={styles.featureIcon}
      />
      <Text style={[styles.featureText, isPaid && styles.paidFeatureText]}>{feature.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3E1F47" />
      <View style={styles.backgroundGlow} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Chọn Gói Dịch Vụ</Text>
          <Text style={styles.subtitle}>
            Bảo vệ và đồng hành cùng con trẻ ngay hôm nay.
          </Text>
        </Animated.View>

        {/* Free Plan Card */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim1 }] }]}>
          <Text style={styles.cardTitle}>Miễn Phí</Text>
          <Text style={styles.cardPrice}>$0<Text style={styles.priceUnit}> /mãi mãi</Text></Text>
          <Text style={styles.cardDescription}>Những tính năng cần thiết để bắt đầu.</Text>
          <View style={styles.featuresContainer}>
            {freePlanFeatures.map((feat, index) => renderFeature(feat, index, false))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSelectFree}>
            <Text style={styles.buttonText}>Bắt Đầu Ngay</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Paid Plan Card */}
        <Animated.View style={[styles.card, styles.paidCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim2 }] }]}>
          <View style={styles.popularBadge}>
            <Ionicons name="star" size={12} color="#FFFFFF" />
            <Text style={styles.popularText}>Phổ Biến Nhất</Text>
          </View>
          <Text style={[styles.cardTitle, styles.paidCardTitle]}>Chuyên Nghiệp</Text>
          <Text style={[styles.cardPrice, styles.paidCardPrice]}>199.000<Text style={[styles.priceUnit, styles.paidPriceUnit]}> /tháng</Text></Text>
          <Text style={[styles.cardDescription, styles.paidCardDescription]}>Trải nghiệm toàn bộ sức mạnh bảo vệ.</Text>
          <View style={styles.featuresContainer}>
            {paidPlanFeatures.map((feat, index) => renderFeature(feat, index, true))}
          </View>
          <TouchableOpacity style={[styles.button, styles.paidButton]} onPress={handleSelectPaid}>
            <Text style={[styles.buttonText, styles.paidButtonText]}>Nâng Cấp Ngay</Text>
            <Ionicons name="sparkles" size={18} color="#3E1F47" style={{ marginLeft: 8 }}/>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E1F47',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGlow: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.4,
    width: width * 1.8,
    height: height * 0.6,
    backgroundColor: '#7B4397',
    borderRadius: width,
    opacity: 0.25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 10,
    maxWidth: '90%',
  },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: 25,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  paidCard: {
    backgroundColor: '#4ECDC4',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    // Shadow for iOS
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    // Shadow for Android
    elevation: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
  paidCardTitle: {
    color: '#FFFFFF',
  },
  cardPrice: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  paidCardPrice: {
    color: '#FFFFFF',
  },
  priceUnit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  paidPriceUnit: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
    minHeight: 40,
  },
  paidCardDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featuresContainer: {
    marginVertical: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    width: 25,
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  paidFeatureText: {
      color: '#FFFFFF',
      fontWeight: '500',
  },
  button: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    borderWidth: 1,
    borderColor: '#4ECDC4',
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#4ECDC4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paidButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
  },
  paidButtonText: {
    color: '#3E1F47',
  },
});

export default PlanScreen;

