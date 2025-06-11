import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AegisLoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSignUp = () => {
            router.push('./register');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fb" />
      
      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        {/* Simple illustration placeholder - you can replace with actual SVG or image */}
        <View style={styles.illustrationPlaceholder}>
          <View style={styles.dashboardMockup}>
            <View style={styles.chartArea}>
              <View style={styles.pieChart} />
              <View style={styles.barChart}>
                <View style={[styles.bar, { height: 40 }]} />
                <View style={[styles.bar, { height: 60 }]} />
                <View style={[styles.bar, { height: 35 }]} />
                <View style={[styles.bar, { height: 50 }]} />
              </View>
            </View>
          </View>
          
          {/* People illustration */}
          <View style={styles.peopleContainer}>
            <View style={[styles.person, styles.person1]} />
            <View style={[styles.person, styles.person2]} />
            <View style={[styles.person, styles.person3]} />
          </View>
          
          {/* Security shield */}
          <View style={styles.shieldContainer}>
            <Ionicons name="shield-checkmark" size={32} color="#4A90E2" />
          </View>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            Aegis<Text style={styles.logoPlus}>+</Text>
          </Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Hàng triệu phụ huynh tin tưởng vào phần mềm Aegis+ của chúng tôi.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  illustrationPlaceholder: {
    width: width * 0.8,
    height: height * 0.4,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardMockup: {
    width: 280,
    height: 180,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pieChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F4FD',
    borderWidth: 8,
    borderColor: '#4A90E2',
    borderTopColor: '#FF6B6B',
    borderRightColor: '#FF6B6B',
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  bar: {
    width: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  peopleContainer: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    flexDirection: 'row',
    gap: 10,
  },
  person: {
    width: 40,
    height: 60,
    borderRadius: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  person1: {
    backgroundColor: '#4A90E2',
  },
  person2: {
    backgroundColor: '#FF6B6B',
  },
  person3: {
    backgroundColor: '#FFA726',
  },
  shieldContainer: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  logoPlus: {
    color: '#FF6B6B',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 20,
  },
  signUpButton: {
    backgroundColor: '#C54A4A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#666666',
  },
  signInLink: {
    fontSize: 14,
    color: '#C54A4A',
    fontWeight: 'bold',
  },
});

export default AegisLoginScreen;