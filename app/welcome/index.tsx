import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string[];
  illustration: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Welcome to Aegis+",
    subtitle: "Your Digital Guardian",
    description: "Protect your family's digital life with intelligent monitoring and comprehensive parental controls.",
    icon: "🛡️",
    gradient: ['#7B4397', '#DC2430'],
    illustration: "shield"
  },
  {
    id: 2,
    title: "Content Filtering",
    subtitle: "Safe Browsing Experience",
    description: "Advanced AI-powered content filtering keeps harmful websites and inappropriate content away from your children.",
    icon: "🔒",
    gradient: ['#4ECDC4', '#44A08D'],
    illustration: "filter"
  },
  {
    id: 3,
    title: "Screen Time Control",
    subtitle: "Healthy Digital Habits",
    description: "Set smart limits, create schedules, and promote balanced screen time for better family wellbeing.",
    icon: "⏰",
    gradient: ['#FF6B6B', '#FFE66D'],
    illustration: "clock"
  },
  {
    id: 4,
    title: "App Management",
    subtitle: "Control What They Use",
    description: "Monitor app usage, block inappropriate apps, and get detailed insights into your child's digital activities.",
    icon: "📱",
    gradient: ['#667eea', '#764ba2'],
    illustration: "apps"
  },
  {
    id: 5,
    title: "Location Tracking",
    subtitle: "Always Know They're Safe",
    description: "Real-time location tracking with geofencing alerts to ensure your children's safety wherever they go.",
    icon: "📍",
    gradient: ['#f093fb', '#f5576c'],
    illustration: "location"
  },
  {
    id: 6,
    title: "Ready to Start?",
    subtitle: "Your Family's Digital Safety",
    description: "Join thousands of families who trust Aegis+ to create a safer digital environment for their children.",
    icon: "🚀",
    gradient: ['#43e97b', '#38f9d7'],
    illustration: "rocket"
  }
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animateProgress();
  }, [currentSlide]);

  const animateProgress = () => {
    Animated.timing(progressAnim, {
      toValue: (currentSlide + 1) / slides.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animateSlideTransition = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
      animateSlideTransition();
    }
  };

  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
    setCurrentSlide(index);
    animateSlideTransition();
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      router.push('/auth');
    }
  };

  const skipToEnd = () => {
    router.replace('/auth');
  };

  const renderIllustration = (type: string, colors: string[]) => {
    const iconStyle = {
      fontSize: 120,
      textAlign: 'center' as const,
      marginBottom: 20,
    };

    return (
      <View style={styles.illustrationContainer}>
        <Animated.View
          style={[
            styles.illustrationBg,
            {
              backgroundColor: colors[0],
              opacity: 0.2,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
        <Animated.Text
          style={[
            iconStyle,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {slides[currentSlide].icon}
        </Animated.Text>
      </View>
    );
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.7],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={skipToEnd} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <Animated.View
              style={[
                styles.slideContent,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Illustration */}
              {renderIllustration(slide.illustration, slide.gradient)}

              {/* Content */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.subtitle}>{slide.subtitle}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </View>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                },
              ]}
            />
          </View>
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
              style={[
                styles.dot,
                currentSlide === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
            style={[
              styles.navButton,
              styles.backButton,
              currentSlide === 0 && styles.disabledButton,
            ]}
            disabled={currentSlide === 0}
          >
            <Text style={[
              styles.navButtonText,
              currentSlide === 0 && styles.disabledText,
            ]}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextSlide}
            style={[styles.navButton, styles.nextButton]}
          >
            <Text style={styles.nextButtonText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#522546',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  slideContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  illustrationContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  illustrationBg: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: width * 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E8E8E8',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#D0D0D0',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  progressContainer: {
    width: width * 0.7,
    marginBottom: 20,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4ECDC4',
    width: 20,
    borderRadius: 4,
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  nextButton: {
    backgroundColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.5,
  },
});
