// app/auth/register.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormData {
  parentName: string;
  email: string;
  phone: string;
  birthDate: string;
  familySize: string;
  children: {
    name: string;
    age: string;
    devices: string[];
  }[];
  selectedFeatures: string[];
  password: string;
  confirmPassword: string;
}

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Thông tin cá nhân",
    subtitle: "Hãy cho chúng tôi biết về bạn",
    icon: "person-outline"
  },
  {
    id: 2,
    title: "Thông tin gia đình",
    subtitle: "Kích thước gia đình của bạn",
    icon: "home-outline"
  },
  {
    id: 3,
    title: "Thông tin con em",
    subtitle: "Chi tiết về các con",
    icon: "people-outline"
  },
  {
    id: 4,
    title: "Tính năng bảo vệ",
    subtitle: "Chọn tính năng phù hợp",
    icon: "shield-checkmark-outline"
  },
  {
    id: 5,
    title: "Bảo mật tài khoản",
    subtitle: "Tạo mật khẩu an toàn",
    icon: "lock-closed-outline"
  }
];

const protectionFeatures = [
  { id: 'content-filter', name: 'Lọc nội dung', icon: 'filter-outline' },
  { id: 'screen-time', name: 'Quản lý thời gian', icon: 'time-outline' },
  { id: 'app-control', name: 'Kiểm soát ứng dụng', icon: 'apps-outline' },
  { id: 'location-track', name: 'Theo dõi vị trí', icon: 'location-outline' },
  { id: 'web-monitor', name: 'Giám sát web', icon: 'globe-outline' },
  { id: 'social-media', name: 'Mạng xã hội', icon: 'chatbubbles-outline' },
  { id: 'bedtime', name: 'Giờ đi ngủ', icon: 'moon-outline' },
  { id: 'educational', name: 'Nội dung giáo dục', icon: 'library-outline' },
];

const deviceTypes = [
  { id: 'smartphone', name: 'Điện thoại', icon: 'phone-portrait-outline' },
  { id: 'tablet', name: 'Máy tính bảng', icon: 'tablet-portrait-outline' },
  { id: 'computer', name: 'Máy tính', icon: 'desktop-outline' },
  { id: 'gaming', name: 'Máy chơi game', icon: 'game-controller-outline' },
];

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    email: '',
    phone: '',
    birthDate: '',
    familySize: '2',
    children: [{ name: '', age: '', devices: [] }],
    selectedFeatures: [],
    password: '',
    confirmPassword: '',
  });

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateStepEntry();
    updateProgress();
  }, [currentStep]);

  useEffect(() => {
    // Background glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Particle animation
    Animated.loop(
      Animated.timing(particleAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const animateStepEntry = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    scaleAnim.setValue(0.95);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const updateProgress = () => {
    Animated.timing(progressAnim, {
      toValue: (currentStep + 1) / steps.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const validateCurrentStep = (): boolean => {
    // Basic validation logic
    switch (currentStep) {
      case 0:
        if (!formData.parentName || !formData.email || !formData.phone || !formData.birthDate) {
          Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin cá nhân.');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            Alert.alert('Lỗi', 'Địa chỉ email không hợp lệ.');
            return false;
        }
        break;
      case 1:
        if (!formData.familySize) {
          Alert.alert('Lỗi', 'Vui lòng chọn số thành viên trong gia đình.');
          return false;
        }
        break;
      case 2:
        const hasEmptyChild = formData.children.some(child => !child.name || !child.age);
        if (hasEmptyChild) {
          Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin của con.');
          return false;
        }
        break;
      case 3:
        if (formData.selectedFeatures.length === 0) {
          Alert.alert('Lỗi', 'Vui lòng chọn ít nhất một tính năng bảo vệ.');
          return false;
        }
        break;
      case 4:
        if (!formData.password || !formData.confirmPassword) {
          Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu.');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
          return false;
        }
        if (formData.password.length < 8) {
             Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự.');
            return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Start loading animation
    Animated.loop(
      Animated.timing(loadingAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      loadingAnim.stopAnimation();
      Alert.alert('Thành công', 'Tài khoản của bạn đã được tạo thành công!', [
          { text: 'OK', onPress: () => router.push('/plan') },
      ]);
    }, 3000);
  };

  const addChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { name: '', age: '', devices: [] }]
    });
  };

  const removeChild = (index: number) => {
    if (formData.children.length > 1) {
      const newChildren = formData.children.filter((_, i) => i !== index);
      setFormData({ ...formData, children: newChildren });
    }
  };

  const updateChild = (index: number, field: keyof typeof formData.children[0], value: any) => {
    const newChildren = [...formData.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setFormData({ ...formData, children: newChildren });
  };

  const toggleDevice = (childIndex: number, deviceId: string) => {
    const newChildren = [...formData.children];
    const devices = newChildren[childIndex].devices;
    if (devices.includes(deviceId)) {
      newChildren[childIndex].devices = devices.filter(d => d !== deviceId);
    } else {
      newChildren[childIndex].devices = [...devices, deviceId];
    }
    setFormData({ ...formData, children: newChildren });
  };

  const toggleFeature = (featureId: string) => {
    const features = formData.selectedFeatures;
    if (features.includes(featureId)) {
      setFormData({
        ...formData,
        selectedFeatures: features.filter(f => f !== featureId)
      });
    } else {
      setFormData({
        ...formData,
        selectedFeatures: [...features, featureId]
      });
    }
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const loadingRotation = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderStepContent = () => {
    // Renders the content for the current step
    switch (currentStep) {
      case 0:
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Họ và tên phụ huynh"
                value={formData.parentName}
                onChangeText={(text) => setFormData({ ...formData, parentName: text })}
                placeholderTextColor="#9A9A9A"
              />
            </View>
             <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Địa chỉ Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9A9A9A"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                placeholderTextColor="#9A9A9A"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ngày sinh (DD/MM/YYYY)"
                value={formData.birthDate}
                onChangeText={(text) => setFormData({ ...formData, birthDate: text })}
                placeholderTextColor="#9A9A9A"
              />
            </View>
          </Animated.View>
        );
      case 1:
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.sectionTitle}>Gia đình bạn có bao nhiêu thành viên?</Text>
            <View style={styles.familySizeContainer}>
              {[2, 3, 4, 5, '6+'].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.familySizeButton, formData.familySize === size.toString() && styles.familySizeButtonActive]}
                  onPress={() => setFormData({ ...formData, familySize: size.toString() })}
                >
                  <Text style={[styles.familySizeText, formData.familySize === size.toString() && styles.familySizeTextActive]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {formData.children.map((child, index) => (
                <View key={index} style={styles.childContainer}>
                  <View style={styles.childHeader}>
                    <Text style={styles.childTitle}>Thông tin con thứ {index + 1}</Text>
                    {formData.children.length > 1 && (
                      <TouchableOpacity onPress={() => removeChild(index)} style={styles.removeChildButton}>
                        <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.inputWrapper}>
                     <Ionicons name="person-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                     <TextInput
                        style={styles.input}
                        placeholder="Tên của con"
                        value={child.name}
                        onChangeText={(text) => updateChild(index, 'name', text)}
                        placeholderTextColor="#9A9A9A"
                     />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="calendar-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tuổi của con"
                        value={child.age}
                        onChangeText={(text) => updateChild(index, 'age', text)}
                        keyboardType="numeric"
                        placeholderTextColor="#9A9A9A"
                    />
                  </View>
                  <Text style={styles.deviceTitle}>Thiết bị con sử dụng:</Text>
                  <View style={styles.deviceGrid}>
                    {deviceTypes.map((device) => (
                      <TouchableOpacity
                        key={device.id}
                        style={[styles.deviceButton, child.devices.includes(device.id) && styles.deviceButtonActive]}
                        onPress={() => toggleDevice(index, device.id)}
                      >
                        <Ionicons name={device.icon as any} size={24} color={child.devices.includes(device.id) ? "#FFFFFF" : "#4ECDC4"} />
                        <Text style={[styles.deviceText, child.devices.includes(device.id) && styles.deviceTextActive]}>
                          {device.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.addChildButton} onPress={addChild}>
                <Ionicons name="add-circle-outline" size={24} color="#4ECDC4" />
                <Text style={styles.addChildText}>Thêm con</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        );
       case 3:
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.sectionTitle}>Chọn các tính năng bạn muốn sử dụng:</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.featuresGrid}>
                {protectionFeatures.map((feature) => (
                    <TouchableOpacity
                    key={feature.id}
                    style={[styles.featureButton, formData.selectedFeatures.includes(feature.id) && styles.featureButtonActive]}
                    onPress={() => toggleFeature(feature.id)}
                    >
                    <Ionicons name={feature.icon as any} size={28} color={formData.selectedFeatures.includes(feature.id) ? "#FFFFFF" : "#4ECDC4"} />
                    <Text style={[styles.featureText, formData.selectedFeatures.includes(feature.id) && styles.featureTextActive]}>
                        {feature.name}
                    </Text>
                     {formData.selectedFeatures.includes(feature.id) && (
                        <View style={styles.featureCheck}>
                            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                        </View>
                    )}
                    </TouchableOpacity>
                ))}
                </View>
            </ScrollView>
          </Animated.View>
        );
      case 4:
        return (
          <Animated.View style={[styles.stepContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    secureTextEntry
                    placeholderTextColor="#9A9A9A"
                />
            </View>
            <View style={styles.inputWrapper}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                    secureTextEntry
                    placeholderTextColor="#9A9A9A"
                />
            </View>
             <View style={styles.passwordTips}>
                <Text style={styles.passwordTipsTitle}>Gợi ý mật khẩu mạnh:</Text>
                <View style={styles.passwordTip}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#4ECDC4" style={{marginRight: 6}}/>
                    <Text style={styles.passwordTipText}>Ít nhất 8 ký tự</Text>
                </View>
                <View style={styles.passwordTip}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#4ECDC4" style={{marginRight: 6}} />
                    <Text style={styles.passwordTipText}>Bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt</Text>
                </View>
             </View>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#522546" />
        <Animated.View style={[styles.backgroundGlow, { opacity: glowOpacity }]} />
        <View style={styles.loadingContent}>
          <Animated.View style={[styles.loadingSpinner, { transform: [{ rotate: loadingRotation }] }]}>
             <Ionicons name="settings-outline" size={60} color="#4ECDC4" />
          </Animated.View>
          <Text style={styles.loadingTitle}>Đang thiết lập tài khoản</Text>
          <Text style={styles.loadingSubtitle}>
            Vui lòng chờ trong giây lát, chúng tôi đang cá nhân hóa trải nghiệm cho gia đình bạn...
          </Text>
          <View style={styles.loadingSteps}>
            <Text style={styles.loadingStep}>✓ Xác thực thông tin</Text>
            <Text style={styles.loadingStep}>✓ Tạo hồ sơ gia đình</Text>
            <Text style={styles.loadingStep}>⚡ Cấu hình các lớp bảo vệ</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" backgroundColor="#522546" />
      <Animated.View style={[styles.backgroundGlow, { opacity: glowOpacity }]} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>
            Bước {currentStep + 1} / {steps.length}
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>

        <Animated.View style={[styles.stepHeader, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.stepIconContainer}>
            <Ionicons name={steps[currentStep].icon as any} size={32} color="#4ECDC4" />
          </View>
          <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
          <Text style={styles.stepSubtitle}>{steps[currentStep].subtitle}</Text>
        </Animated.View>

        <View style={styles.contentContainer}>
          {renderStepContent()}
        </View>
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'HOÀN TẤT' : 'TIẾP TỤC'}
            </Text>
            <Ionicons
              name={currentStep === steps.length - 1 ? "checkmark-done-outline" : "arrow-forward-outline"}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E1F47', // Slightly different background
  },
  backgroundGlow: {
    position: 'absolute',
    top: -height * 0.2,
    left: -width * 0.5,
    width: width * 2,
    height: height * 0.7,
    backgroundColor: '#7B4397',
    borderRadius: width,
    opacity: 0.3, // Softer glow
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  stepIndicator: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 20,
    borderRadius: 2,
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  stepHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  stepIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(78, 205, 196, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stepSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContent: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  familySizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  familySizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  familySizeButtonActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  familySizeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  familySizeTextActive: {
    color: '#FFFFFF',
  },
  childContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  childHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  childTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeChildButton: {
    padding: 5,
  },
  deviceTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
  },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deviceButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  deviceButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  deviceText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginLeft: 10,
  },
  deviceTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
    borderStyle: 'dashed',
    marginTop: 10,
  },
  addChildText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.3)',
  },
  featureButtonActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
  },
  featureTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  featureCheck: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
  },
  passwordTips: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderRadius: 12,
  },
  passwordTipsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passwordTip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  passwordTipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    flexShrink: 1, // Allow text to wrap
  },
  navigationContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20, // Padding for home bar
  },
  nextButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // Shadow for Android
    elevation: 8,
    // Shadow for iOS
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E1F47',
  },
  loadingContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingSpinner: {
    marginBottom: 40,
  },
  loadingTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  loadingSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  loadingSteps: {
    alignSelf: 'flex-start',
  },
  loadingStep: {
    color: '#4ECDC4',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RegisterScreen;



