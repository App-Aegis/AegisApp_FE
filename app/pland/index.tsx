// app/plan/paid-details.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

const PaidDetailsScreen: React.FC = () => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    // Basic validation
    if (!cardName || !cardNumber || !expiry || !cvv) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin thanh toán.');
      return;
    }
    // Simulate payment processing
    Alert.alert('Thanh toán thành công', 'Cảm ơn bạn đã nâng cấp! Bạn hiện có thể tận hưởng tất cả các tính năng cao cấp.', [
      { text: 'Tuyệt vời!', onPress: () => router.replace('/home/home') },
    ]);
  };

  const formatCardNumber = (text: string) => {
    // Add spaces every 4 digits
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };

  const formatExpiry = (text: string) => {
    // Add slash after 2 digits
    const cleaned = text.replace(/\//g, '');
    if (cleaned.length > 2) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#3E1F47" />
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>

        <View style={styles.content}>
            <Text style={styles.title}>Thanh Toán An Toàn</Text>
            <Text style={styles.subtitle}>Nhập thông tin thẻ của bạn để hoàn tất việc nâng cấp.</Text>

            <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Tên trên thẻ"
                    value={cardName}
                    onChangeText={setCardName}
                    placeholderTextColor="#9A9A9A"
                />
            </View>

            <View style={styles.inputWrapper}>
                <Ionicons name="card-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Số thẻ"
                    value={cardNumber}
                    onChangeText={formatCardNumber}
                    keyboardType="numeric"
                    maxLength={19} // 16 digits + 3 spaces
                    placeholderTextColor="#9A9A9A"
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.inputWrapper, styles.expiryInput]}>
                    <Ionicons name="calendar-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày hết hạn (MM/YY)"
                        value={expiry}
                        onChangeText={formatExpiry}
                        keyboardType="numeric"
                        maxLength={5}
                        placeholderTextColor="#9A9A9A"
                    />
                </View>
                <View style={[styles.inputWrapper, styles.cvvInput]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#4ECDC4" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="CVV"
                        value={cvv}
                        onChangeText={setCvv}
                        keyboardType="numeric"
                        maxLength={4}
                        secureTextEntry
                        placeholderTextColor="#9A9A9A"
                    />
                </View>
            </View>
            
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Tổng cộng:</Text>
                <Text style={styles.summaryPrice}>$20.00</Text>
            </View>

        </View>
        
        <View style={styles.footer}>
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Ionicons name="shield-checkmark-outline" size={22} color="#FFFFFF" />
                <Text style={styles.payButtonText}>Thanh Toán $20</Text>
            </TouchableOpacity>
            <Text style={styles.secureText}>
                <Ionicons name="lock-closed" size={12} color="rgba(255, 255, 255, 0.6)" />
                {" "}
                Thanh toán được bảo mật bởi Stripe.
            </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E1F47',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
  },
  backButton: {
    padding: 10,
    marginLeft: -10, // Align with edge
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 30,
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
    height: 55,
    color: '#FFFFFF',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInput: {
    width: '58%',
  },
  cvvInput: {
    width: '38%',
  },
  summary: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 16,
  },
  summaryPrice: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
  },
  footer: {
      padding: 20,
      paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  payButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  secureText: {
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 12,
      marginTop: 15,
  }
});

export default PaidDetailsScreen;


