import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/AuthContext';
import { paymentRecords, PaymentStatus } from './paymentsData';

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

  const PAGE_SIZE = 10;
  const SORTABLE_COLUMNS = [
    'CustomerName',
    'Amount',
    'Status',
    'PlanName',
    'PaymentDate',
    'PayOSOrderCode',
  ] as const;
  type SortColumn = typeof SORTABLE_COLUMNS[number];

  type SortDirection = 'asc' | 'desc';

  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>('PaymentDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  function handleSort(col: SortColumn) {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page on sort
  }

  function getSortIndicator(col: SortColumn) {
    if (sortColumn !== col) return null;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  }

  function compare(a: any, b: any, col: SortColumn) {
    let aVal = a[col];
    let bVal = b[col];
    if (col === 'PaymentDate') {
      aVal = aVal ? new Date(aVal).getTime() : 0;
      bVal = bVal ? new Date(bVal).getTime() : 0;
    }
    if (col === 'Amount') {
      return aVal - bVal;
    }
    if (col === 'Status') {
      // Custom order: paid < pending < cancelled/expired
      const order = { paid: 0, pending: 1, cancelled: 2, expired: 2 };
      return order[aVal as PaymentStatus] - order[bVal as PaymentStatus];
    }
    // String compare
    return String(aVal).localeCompare(String(bVal));
  }

  const sortedRecords = [...paymentRecords].sort((a, b) => {
    const cmp = compare(a, b, sortColumn);
    return sortDirection === 'asc' ? cmp : -cmp;
  });
  const totalPages = Math.ceil(sortedRecords.length / PAGE_SIZE);
  const paginatedRecords = sortedRecords.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
          {/* Table: Horizontal ScrollView for columns */}
          <ScrollView horizontal>
            <View>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <TouchableOpacity style={{ minWidth: 120 }} onPress={() => handleSort('CustomerName')}>
                  <Text style={styles.tableHeaderCell}>Customer Name{getSortIndicator('CustomerName')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ minWidth: 100 }} onPress={() => handleSort('Amount')}>
                  <Text style={styles.tableHeaderCell}>Amount{getSortIndicator('Amount')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ minWidth: 90 }} onPress={() => handleSort('Status')}>
                  <Text style={styles.tableHeaderCell}>Status{getSortIndicator('Status')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ minWidth: 110 }} onPress={() => handleSort('PlanName')}>
                  <Text style={styles.tableHeaderCell}>Plan{getSortIndicator('PlanName')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ minWidth: 140 }} onPress={() => handleSort('PaymentDate')}>
                  <Text style={styles.tableHeaderCell}>Payment Date{getSortIndicator('PaymentDate')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ minWidth: 140 }} onPress={() => handleSort('PayOSOrderCode')}>
                  <Text style={styles.tableHeaderCell}>Order Code{getSortIndicator('PayOSOrderCode')}</Text>
                </TouchableOpacity>
              </View>
              {/* Table Rows: FlatList */}
              <FlatList
                data={paginatedRecords}
                keyExtractor={item => item.Id}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, { minWidth: 120 }]} numberOfLines={1} ellipsizeMode="tail">
                      {item.CustomerName}
                    </Text>
                    <Text style={[styles.tableCell, { minWidth: 100 }]}>
                      {formatCurrency(item.Amount)}
                    </Text>
                    <View style={[styles.tableCell, { minWidth: 90 }]}>
                      <View style={getStatusBadgeStyle(item.Status)}>
                        <Text style={styles.statusBadgeText}>{getStatusText(item.Status)}</Text>
                      </View>
                    </View>
                    <Text style={[styles.tableCell, { minWidth: 110 }]} numberOfLines={1} ellipsizeMode="tail">
                      {item.PlanName}
                    </Text>
                    <Text style={[styles.tableCell, { minWidth: 140 }]}>
                      {formatDate(item.PaymentDate)}
                    </Text>
                    <Text style={[styles.tableCell, { minWidth: 140 }]} numberOfLines={1} ellipsizeMode="tail">
                      {item.PayOSOrderCode}
                    </Text>
                  </View>
                )}
                scrollEnabled={false}
                initialNumToRender={10}
              />
            </View>
          </ScrollView>
          {/* Pagination Controls */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
              onPress={handlePrevPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationButtonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminDashboard;

// --- Helper functions ---
function formatCurrency(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' ₫';
}

function formatDate(date?: Date): string {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getStatusBadgeStyle(status: PaymentStatus) {
  switch (status) {
    case 'paid':
      return [styles.statusBadge, styles.statusPaid];
    case 'pending':
      return [styles.statusBadge, styles.statusPending];
    case 'cancelled':
    case 'expired':
      return [styles.statusBadge, styles.statusCancelled];
    default:
      return styles.statusBadge;
  }
}

function getStatusText(status: PaymentStatus) {
  switch (status) {
    case 'paid': return 'Paid';
    case 'pending': return 'Pending';
    case 'cancelled': return 'Cancelled';
    case 'expired': return 'Expired';
    default: return status;
  }
}
// ---

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
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#522546',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    alignItems: 'center',
  },
  tableCell: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222',
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  statusPaid: {
    backgroundColor: '#22c55e', // green
  },
  statusPending: {
    backgroundColor: '#eab308', // yellow
  },
  statusCancelled: {
    backgroundColor: '#ef4444', // red
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  paginationButton: {
    backgroundColor: '#522546',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  paginationButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  paginationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paginationText: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#522546',
  },
});
// ---

// ---
// Explanation:
// - Route protection: useEffect checks if user is admin, redirects if not
// - Sidebar: for future admin features
// - Header: shows dashboard title and logout button
// - Main content: placeholder for Payment History
// --- 