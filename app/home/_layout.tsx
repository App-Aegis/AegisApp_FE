// app/home/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, usePathname } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


export default function HomeLayout() {
  const pathname = usePathname();

  const handleNavigation = (tab: string, route: string) => {
    console.log(`Navigate to ${tab}`);
    router.push(route);
  };

  const isActive = (route: string) => {
    // Check if current path matches the route
    if (route === '/home' && (pathname === '/home' || pathname === '/home/')) {
      return true;
    }
    return pathname === route || pathname === `/home${route}`;
  };

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      
      {/* Persistent Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={isActive('/home') ? styles.navItemActive : styles.navItem}
          onPress={() => handleNavigation('Home', '/home')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={isActive('/home') ? "#c53030" : "#9ca3af"} 
          />
          <Text style={isActive('/home') ? styles.navTextActive : styles.navText}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={isActive('/preference') ? styles.navItemActive : styles.navItem}
          onPress={() => handleNavigation('Account', '/home/preference')}
        >
          <Ionicons 
            name="information-circle-outline" 
            size={24} 
            color={isActive('/preference') ? "#c53030" : "#9ca3af"} 
          />
          <Text style={isActive('/preference') ? styles.navTextActive : styles.navText}>
            Account
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={isActive('/timing') ? styles.navItemActive : styles.navItem}
          onPress={() => handleNavigation('Timing', '/home/timing')}
        >
          <Ionicons 
            name="time-outline" 
            size={24} 
            color={isActive('/timing') ? "#c53030" : "#9ca3af"} 
          />
          <Text style={isActive('/timing') ? styles.navTextActive : styles.navText}>
            Timing
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={isActive('/track') ? styles.navItemActive : styles.navItem}
          onPress={() => handleNavigation('Tracking', '/home/track')}
        >
          <Ionicons 
            name="location-outline" 
            size={24} 
            color={isActive('/track') ? "#c53030" : "#9ca3af"} 
          />
          <Text style={isActive('/track') ? styles.navTextActive : styles.navText}>
            Tracking
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={isActive('/profile') ? styles.navItemActive : styles.navItem}
          onPress={() => handleNavigation('Profile', '/home/profile')}
        >
          <Ionicons 
            name="person-outline" 
            size={24} 
            color={isActive('/profile') ? "#c53030" : "#9ca3af"} 
          />
          <Text style={isActive('/profile') ? styles.navTextActive : styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
    zIndex: 1000,
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