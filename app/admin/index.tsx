import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/AuthContext';

// Admin Dashboard Page
const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, userRole, logout } = useAuth();

  // Route protection: redirect to /auth if not logged in as admin
  React.useEffect(() => {
    if (!isLoggedIn || userRole !== 'admin') {
      router.replace('/auth');
    }
  }, [isLoggedIn, userRole]);

  // Handle logout
  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  return (
    <View style={styles.container}>
      {/* Sidebar (expandable for future features) */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>Admin Menu</Text>
        <TouchableOpacity style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>Payment History</Text>
        </TouchableOpacity>
        {/* Add more sidebar items here later */}
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* Main Content */}
        <View style={styles.contentArea}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <Text style={styles.placeholderText}>(Payment history table will go here)</Text>
        </View>
      </View>
    </View>
  );
};

export default AdminDashboard;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8f9fb',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#522546',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  sidebarTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 24,
  },
  sidebarItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#fff1',
  },
  sidebarItemText: {
    color: '#fff',
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#522546',
  },
  logoutButton: {
    backgroundColor: '#c53030',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentArea: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    minHeight: 300,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#522546',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
});

// ---
// Explanation:
// - Route protection: useEffect checks if user is admin, redirects if not
// - Sidebar: for future admin features
// - Header: shows dashboard title and logout button
// - Main content: placeholder for Payment History
// --- 