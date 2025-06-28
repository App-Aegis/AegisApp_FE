import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SplashScreenPage() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    // Start loading animation after a brief delay
    setTimeout(() => {
      // Rotating loading rings
      Animated.loop(
        Animated.timing(loadingAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();

      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start();

      // Pulsing glow effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 500);

    // Navigate after 6 seconds + initial animation time
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
      router.replace('/welcome');
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  const rotation = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressScale = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      {/* Background glow effect */}
      <Animated.View
        style={[
          styles.backgroundGlow,
          {
            opacity: glowOpacity,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoWrapper}>
          {/* Outer rotating ring */}
          <Animated.View
            style={[
              styles.loadingRing,
              styles.outerRing,
              {
                transform: [{ rotate: rotation }],
              },
            ]}
          />
          
          {/* Inner rotating ring (opposite direction) */}
          <Animated.View
            style={[
              styles.loadingRing,
              styles.innerRing,
              {
                transform: [{ 
                  rotate: loadingAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['360deg', '0deg'],
                  })
                }],
              },
            ]}
          />

          {/* Logo with glow */}
          <Animated.View
            style={[
              styles.logoGlow,
              {
                opacity: glowOpacity,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <Image
              source={require('../assets/images/logo_app.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Text style={styles.text}>Aegis+</Text>
        
        {/* Loading text */}
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>

      {/* Progress bar container */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                transform: [{ scaleX: progressScale }],
              },
            ]}
          />
          {/* Progress glow */}
          <Animated.View
            style={[
              styles.progressGlow,
              {
                transform: [{ scaleX: progressScale }],
                opacity: glowOpacity,
              },
            ]}
          />
        </View>
      </View>

      {/* Floating particles */}
      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          {
            opacity: glowOpacity,
            transform: [{ rotate: rotation }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          {
            opacity: glowOpacity,
            transform: [{ 
              rotate: loadingAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['180deg', '540deg'],
              })
            }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          {
            opacity: glowOpacity,
            transform: [{ 
              rotate: loadingAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['90deg', '450deg'],
              })
            }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#522546',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundGlow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#7B4397',
    shadowColor: '#7B4397',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 10,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loadingRing: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 3,
  },
  outerRing: {
    width: 200,
    height: 200,
    borderColor: 'transparent',
    borderTopColor: '#FF6B6B',
    borderRightColor: '#4ECDC4',
    borderBottomColor: '#45B7D1',
    borderLeftColor: '#FFA07A',
  },
  innerRing: {
    width: 170,
    height: 170,
    borderColor: 'transparent',
    borderTopColor: '#98D8C8',
    borderRightColor: '#F7DC6F',
    borderBottomColor: '#BB8FCE',
    borderLeftColor: '#85C1E9',
  },
  logoGlow: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  loadingText: {
    color: '#E8E8E8',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 10,
    opacity: 0.8,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    transformOrigin: 'left',
  },
  progressGlow: {
    width: '100%',
    height: 8,
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: -2,
    transformOrigin: 'left',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  particle1: {
    top: '30%',
    left: '15%',
  },
  particle2: {
    top: '25%',
    right: '20%',
  },
  particle3: {
    top: '70%',
    left: '20%',
  },
});


