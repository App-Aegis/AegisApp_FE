import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock data - replace with actual data from your API/state management
const childData = {
  name: 'Bo',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  location: 'Located on the school grounds',
  currentLesson: {
    type: 'Math lesson',
    timeRemaining: 17,
    status: 'active',
  },
  schedule: [
    {
      id: 1,
      type: 'Speaking lesson',
      time: '10:30 - 11:00',
      status: 'completed',
      icon: 'checkmark-circle',
    },
    {
      id: 2,
      type: 'Math lesson',
      time: '17 min until the end',
      status: 'active',
      countdown: 43,
      icon: 'time',
    },
    {
      id: 3,
      type: 'Grammar lesson',
      time: '46 min before the start',
      status: 'upcoming',
      icon: 'school',
    },
  ],
};

const Tracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tracking');

  const renderScheduleItem = (item: any) => {
    const getStatusColor = () => {
      switch (item.status) {
        case 'completed':
          return '#10B981';
        case 'active':
          return '#EF4444';
        case 'upcoming':
          return '#9CA3AF';
        default:
          return '#9CA3AF';
      }
    };

    const getIconName = () => {
      switch (item.status) {
        case 'completed':
          return 'checkmark-circle';
        case 'active':
          return 'time-outline';
        case 'upcoming':
          return 'school-outline';
        default:
          return 'time-outline';
      }
    };

    return (
      <TouchableOpacity key={item.id} style={styles.scheduleItem}>
        <View style={styles.scheduleLeft}>
          <View style={[styles.scheduleIcon, { backgroundColor: getStatusColor() }]}>
            {item.status === 'active' && item.countdown ? (
              <Text style={styles.countdownText}>{item.countdown}</Text>
            ) : item.status === 'upcoming' ? (
              <MaterialIcons name="school" size={20} color="white" />
            ) : (
              <Ionicons name={getIconName()} size={20} color="white" />
            )}
          </View>
          {item.id !== childData.schedule.length && (
            <View style={[styles.connector, { backgroundColor: getStatusColor() }]} />
          )}
        </View>
        <View style={styles.scheduleContent}>
          <Text style={styles.scheduleTitle}>{item.type}</Text>
          <Text style={styles.scheduleTime}>{item.time}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    );
  };

  const TabIcon: React.FC<{ name: string; iconName: string; isActive: boolean }> = ({
    name,
    iconName,
    isActive,
  }) => (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => setActiveTab(name)}
    >
      <View style={[styles.tabIconContainer, isActive && styles.activeTabIcon]}>
        <Ionicons
          name={iconName as any}
          size={24}
          color={isActive ? 'white' : '#9CA3AF'}
        />
      </View>
      <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('./home-screen')}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="download-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Area */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          {/* Location marker */}
          <View style={styles.locationMarker}>
            <Text style={styles.markerLabel}>J</Text>
          </View>
          {/* Current location button */}
          <TouchableOpacity style={styles.currentLocationButton}>
            <Ionicons name="locate" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Child Profile */}
      <View style={styles.profileSection}>
        <Image source={{ uri: childData.avatar }} style={styles.avatar} />
        <Text style={styles.childName}>{childData.name}</Text>
        <Text style={styles.locationText}>{childData.location}</Text>
        <TouchableOpacity>
          <Text style={styles.showPreviousActions}>Show previous actions</Text>
        </TouchableOpacity>
      </View>

      {/* Schedule */}
      <ScrollView style={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
        {childData.schedule.map(renderScheduleItem)}
      </ScrollView>

      {/* Chat Button */}
      <TouchableOpacity style={styles.chatButton}>
        <MaterialIcons name="chat" size={24} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TabIcon name="Home" iconName="home-outline" isActive={activeTab === 'Home'} />
        <TabIcon name="Account" iconName="person-circle-outline" isActive={activeTab === 'Account'} />
        <TabIcon name="Timing" iconName="time-outline" isActive={activeTab === 'Timing'} />
        <TabIcon name="Tracking" iconName="location-outline" isActive={activeTab === 'Tracking'} />
        <TabIcon name="Profile" iconName="person-outline" isActive={activeTab === 'Profile'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#E5E7EB',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  locationMarker: {
    width: 60,
    height: 40,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D97706',
  },
  markerLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'white',
  },
  childName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  showPreviousActions: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  scheduleLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  connector: {
    width: 2,
    height: 40,
    marginTop: 4,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  chatButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeTabIcon: {
    backgroundColor: '#EF4444',
  },
  tabLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#EF4444',
  },
});

export default Tracking;