import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Star = ({ x, y, size = 2 }: { x: number; y: number; size?: number }) => (
  <View
    style={[
      styles.star,
      {
        left: x,
        top: y,
        width: size,
        height: size,
      },
    ]}
  />
);

const Moon = () => (
  <Svg width="60" height="60" viewBox="0 0 60 60" style={styles.moon}>
    <Path
      d="M45 30c0 16.569-13.431 30-30 30C6.863 60 0 53.137 0 45c0-8.284 6.716-15 15-15 8.284 0 15-6.716 15-15 0-8.137 6.863-15 15-15z"
      fill="#FFE4B5"
    />
  </Svg>
);

const Bird = ({ color, isLeft }: { color: string; isLeft: boolean }) => (
  <Svg
    width="80"
    height="60"
    viewBox="0 0 80 60"
    style={[styles.bird, isLeft ? styles.birdLeft : styles.birdRight]}
  >
    {/* Bird body */}
    <Ellipse cx="40" cy="35" rx="25" ry="20" fill={color} />
    {/* Bird head */}
    <Circle cx="40" cy="20" r="15" fill={color} />
    {/* Eye */}
    <Circle cx={isLeft ? "35" : "45"} cy="18" r="3" fill="#000" />
    <Circle cx={isLeft ? "36" : "44"} cy="17" r="1" fill="#FFF" />
    {/* Beak */}
    <Path
      d={isLeft ? "M25 22 L30 20 L25 18 Z" : "M55 22 L50 20 L55 18 Z"}
      fill="#FFA500"
    />
    {/* Wing */}
    <Ellipse
      cx={isLeft ? "30" : "50"}
      cy="30"
      rx="8"
      ry="12"
      fill={color}
      opacity="0.8"
    />
  </Svg>
);

const Branch = () => (
  <Svg width="200" height="20" viewBox="0 0 200 20" style={styles.branch}>
    {/* Main branch */}
    <Ellipse cx="100" cy="10" rx="100" ry="4" fill="#8B4513" />
    {/* Small leaves */}
    <Ellipse cx="60" cy="6" rx="8" ry="4" fill="#228B22" />
    <Ellipse cx="140" cy="6" rx="8" ry="4" fill="#228B22" />
    <Ellipse cx="80" cy="14" rx="6" ry="3" fill="#228B22" />
    <Ellipse cx="120" cy="14" rx="6" ry="3" fill="#228B22" />
  </Svg>
);

export default function Welcome() {
  const handleStart = () => {
    // Navigation logic here
    console.log('Starting app...');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1a237e', '#3949ab', '#5c6bc0']}
        style={styles.background}
      >
        {/* Stars */}
        <Star x={50} y={80} size={3} />
        <Star x={120} y={60} size={2} />
        <Star x={300} y={90} size={3} />
        <Star x={280} y={120} size={2} />
        <Star x={80} y={150} size={2} />
        <Star x={320} y={160} size={3} />
        <Star x={40} y={200} size={2} />
        <Star x={200} y={140} size={2} />
        <Star x={350} y={200} size={3} />
        
        {/* Moon */}
        <Moon />
        
        {/* Welcome text */}
        <Text style={styles.welcomeText}>Welcome</Text>
        
        {/* Main greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Xin chào XhuZ,</Text>
          <Text style={styles.greetingText}>Chào mừng đến với Aegis+</Text>
        </View>
        
        {/* Description */}
        <Text style={styles.descriptionText}>
          Bảo vệ con bạn tính hồi động hiệu cực{'\n'}
          trên mọi xã hội và trách nhiệm của{'\n'}
          chúng tôi!
        </Text>
        
        {/* Birds on branch */}
        <View style={styles.birdsContainer}>
          <Branch />
          <Bird color="#98E4D6" isLeft={true} />
          <Bird color="#FFB6C1" isLeft={false} />
        </View>
        
        {/* Start button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>BẮT ĐẦU</Text>
        </TouchableOpacity>
        
        {/* Bottom indicator */}
        <View style={styles.bottomIndicator} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    opacity: 0.8,
  },
  moon: {
    position: 'absolute',
    top: 60,
    right: 40,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 40,
  },
  greetingContainer: {
    alignItems: 'center',
    marginTop: -20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
  },
  descriptionText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
    marginHorizontal: 40,
  },
  birdsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginVertical: 20,
  },
  branch: {
    position: 'absolute',
    bottom: 20,
  },
  bird: {
    position: 'absolute',
  },
  birdLeft: {
    left: -60,
    bottom: 15,
  },
  birdRight: {
    right: -60,
    bottom: 15,
  },
  startButton: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 80,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2.5,
    opacity: 0.3,
  },
});

