import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ProfileScreen = () => {
  const apps = [
    { name: 'TikTok', icon: '🎵', color: '#000', banned: true },
    { name: 'Leagua Of...', icon: '⚔️', color: '#1e3a8a', banned: false },
    { name: 'Youtube', icon: '▶️', color: '#ff0000', banned: false },
    { name: 'Instagram', icon: '📷', color: '#e1306c', banned: false },
    { name: 'PUBG', icon: '🎮', color: '#ff6b35', banned: false },
    { name: 'Twitter', icon: '🐦', color: '#000', banned: true },
    { name: 'Telegram', icon: '✈️', color: '#0088cc', banned: false },
    { name: 'Locket', icon: '💛', color: '#ffd700', banned: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            <Text style={styles.headerName}>Johnny's</Text>{' '}
            <Text style={styles.headerProfile}>Profile</Text>
          </Text>
        </View>

        {/* Select Options */}
        <Text style={styles.sectionTitle}>Select Options</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80x80' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Ti</Text>
              <Text style={styles.profileAge}>15 Years old</Text>
              <Text style={styles.profileSchool}>Student at VinSchool Primary School</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#c53030" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Hours / Day</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Apps / Banned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Location / Day</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.callButtonText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#c53030" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabActive}>
            <Ionicons name="bar-chart" size={24} color="#c53030" />
            <Text style={styles.tabTextActive}>Usage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="ban" size={24} color="#9ca3af" />
            <Text style={styles.tabText}>Banned</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Ionicons name="location" size={24} color="#9ca3af" />
            <Text style={styles.tabText}>Locations</Text>
          </TouchableOpacity>
        </View>

        {/* Apps Grid */}
        <View style={styles.appsGrid}>
          {apps.map((app, index) => (
            <TouchableOpacity key={index} style={styles.appCard}>
              <View style={[styles.appIcon, { backgroundColor: app.color }]}>
                <Text style={styles.appEmoji}>{app.icon}</Text>
              </View>
              <Text style={styles.appName}>{app.name}</Text>
              {app.banned && <View style={styles.bannedBadge} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerName: {
    color: '#c53030',
  },
  headerProfile: {
    color: '#1e40af',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c53030',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileAge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  profileSchool: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: '#c53030',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: '#c53030',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  messageButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#c53030',
  },
  messageButtonText: {
    color: '#c53030',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabActive: {
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#c53030',
    paddingBottom: 10,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  tabTextActive: {
    color: '#c53030',
    fontWeight: 'bold',
    marginTop: 5,
  },
  tabText: {
    color: '#9ca3af',
    marginTop: 5,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  appCard: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appEmoji: {
    fontSize: 24,
    color: '#fff',
  },
  appName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  bannedBadge: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
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

export default ProfileScreen;