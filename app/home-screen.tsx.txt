import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const handleSeeMore = (section: string) => {
    console.log(`See more pressed for ${section}`);
  };

  const handleNavigation = (tab: string) => {
    console.log(`Navigate to ${tab}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>
            <Text style={styles.brandName}>Aegis</Text>
            <Text style={styles.brandPlus}>+</Text>
          </Text>
          <Text style={styles.greeting}>Chào buổi sáng, XhuyZ</Text>
          <Text style={styles.subGreeting}>Chúng tôi chúc bạn một ngày tốt lành</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsCards}>
          <View style={[styles.statCard, styles.timeCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Time</Text>
              <Ionicons name="time" size={24} color="#fff" />
            </View>
            <Text style={styles.cardSubtitle}>use Social Networks</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardTime}>20 Min/Day</Text>
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={() => handleSeeMore('Time')}
              >
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.statCard, styles.historyCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>History</Text>
              <Ionicons name="eye" size={24} color="#fff" />
            </View>
            <Text style={styles.cardSubtitle}>Watched</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardTime}>20 Apps/Day</Text>
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={() => handleSeeMore('History')}
              >
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Blocked */}
        <View style={styles.blockedCard}>
          <View style={styles.blockedContent}>
            <Text style={styles.blockedTitle}>Content Blocked</Text>
            <Text style={styles.blockedSubtitle}>You Blocked • 15 Apps</Text>
          </View>
          <TouchableOpacity
            style={styles.seeMoreButtonWhite}
            onPress={() => handleSeeMore('Blocked')}
          >
            <Text style={styles.seeMoreTextDark}>See More</Text>
          </TouchableOpacity>
        </View>

        {/* Recommended */}
        <Text style={styles.recommendedTitle}>Recommended for you</Text>
        <View style={styles.recommendedCards}>
          <View style={styles.recommendedCard}>
            <View style={styles.recommendedIcon}>
              <Text style={styles.recommendedEmoji}>🎵</Text>
            </View>
            <Text style={styles.recommendedName}>Tiktok</Text>
            <View style={styles.recommendedLevel}>
              <Text style={styles.levelText}>Level •</Text>
              <Text style={styles.warningText}> Warning</Text>
            </View>
          </View>

          <View style={styles.recommendedCard}>
            <View style={styles.recommendedIcon}>
              <Text style={styles.recommendedEmoji}>📷</Text>
            </View>
            <Text style={styles.recommendedName}>Instagram</Text>
            <View style={styles.recommendedLevel}>
              <Text style={styles.levelText}>Level •</Text>
              <Text style={styles.mediumText}> Medium</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItemActive}
          onPress={() => handleNavigation('Home')}
        >
          <Ionicons name="home" size={24} color="#c53030" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Account')}
        >
          <Ionicons name="information-circle-outline" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Timing')}
        >
          <Ionicons name="time-outline" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Timing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Tracking')}
        >
          <Ionicons name="location-outline" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation('Profile')}
        >
          <Ionicons name="person-outline" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  brandName: {
    color: '#1e40af',
  },
  brandPlus: {
    color: '#c53030',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
  },
  statsCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
  },
  timeCard: {
    backgroundColor: '#ef4444',
  },
  historyCard: {
    backgroundColor: '#f59e0b',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeMoreButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  blockedCard: {
    backgroundColor: '#4c51bf',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockedContent: {
    flex: 1,
  },
  blockedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  blockedSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  seeMoreButtonWhite: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  seeMoreTextDark: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  recommendedCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  recommendedCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 120,
  },
  recommendedIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  recommendedEmoji: {
    fontSize: 24,
  },
  recommendedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recommendedLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    color: '#666',
  },
  warningText: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  mediumText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 12,
    color: '#c53030',
    marginTop: 2,
    fontWeight: 'bold',
  },
});

export default HomeScreen;