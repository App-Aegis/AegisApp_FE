import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PreferenceScreen = () => {
  const menuItems = [
    {
      title: 'Account Information',
      subtitle: 'Change your Account information',
      icon: 'person-outline',
    },
    {
      title: 'Password',
      subtitle: 'Change your Password',
      icon: 'eye-outline',
    },
    {
      title: 'Payment Methods',
      subtitle: 'Add Your Credit / Credit Cards',
      icon: 'card-outline',
    },
    {
      title: 'Invite Your Friends',
      subtitle: 'Get $3 For Each Invitation!',
      icon: 'pencil-outline',
    },
    {
      title: 'Theme Colour',
      subtitle: 'Change Your Theme Colour',
      icon: 'settings-outline',
    },
  ];

  const handleBackPress = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  const handleMenuItemPress = (item: string) => {
    // Handle menu item press
    console.log(`${item} pressed`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Preference</Text>
      </View>

      <ScrollView style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item.title)}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon as any} size={24} color="#c53030" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
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
    backgroundColor: '#c53030',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: '#fff',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c53030',
    marginBottom: 5,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
});

export default PreferenceScreen;