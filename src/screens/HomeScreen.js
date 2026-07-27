import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTransactionStore from '../store/useTransactionStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getCategoryByKey } from '../constants/Categories';

export default function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const transactions = useTransactionStore((state) => state.transactions);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });

  const monthlyTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const totalIncome = monthlyTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = monthlyTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const goToPrevMonth = () => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() - 1);
    setSelectedDate(d);
  };

  const goToNextMonth = () => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() + 1);
    setSelectedDate(d);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Expense Tracker</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddTransaction')}>
          <Ionicons name="add-circle-outline" size={28} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <Ionicons name="chevron-back-outline" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthName} {year}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={[styles.balanceAmount, { color: totalBalance >= 0 ? '#16a34a' : '#dc2626' }]}>
          ₹{totalBalance}
        </Text>
        <View style={styles.incomeExpenseRow}>
          <View style={styles.incomeBox}>
            <Ionicons name="arrow-down-circle-outline" size={18} color="#16a34a" />
            <Text style={styles.incomeExpenseLabel}>Income</Text>
            <Text style={styles.incomeAmount}>₹{totalIncome}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.expenseBox}>
            <Ionicons name="arrow-up-circle-outline" size={18} color="#dc2626" />
            <Text style={styles.incomeExpenseLabel}>Expense</Text>
            <Text style={styles.expenseAmount}>₹{totalExpense}</Text>
          </View>
        </View>
      </View>

      {/* Transactions List */}
      <Text style={styles.sectionTitle}>Transactions</Text>
      <FlatList
        data={monthlyTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const category = getCategoryByKey(item.category);
          return (
            <TouchableOpacity
              style={styles.txItem}
              onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
            >
              <View style={[styles.txIcon, { backgroundColor: category.color + '33' }]}>
                <Text style={{ fontSize: 20 }}>{category.icon}</Text>
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txNote}>{item.note || category.label}</Text>
                <Text style={styles.txCategory}>{category.label}</Text>
              </View>
              <Text style={[
                styles.txAmount,
                { color: item.type === 'income' ? '#16a34a' : '#dc2626' }
              ]}>
                {item.type === 'income' ? '+' : '-'}₹{item.amount}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No transactions this month</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  appTitle: { fontSize: 20, fontWeight: '700', color: '#1f2937' },
  monthSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 32, marginBottom: 12 },
  monthText: { fontSize: 16, fontWeight: '600', color: '#374151' },
  balanceCard: { margin: 16, backgroundColor: '#1f2937', borderRadius: 16, padding: 20 },
  balanceLabel: { color: '#c7d2fe', fontSize: 13, marginBottom: 4 },
  balanceAmount: { fontSize: 32, fontWeight: '700', color: '#fff', marginBottom: 16 },
  incomeExpenseRow: { flexDirection: 'row', justifyContent: 'space-around' },
  incomeBox: { alignItems: 'center', gap: 4 },
  expenseBox: { alignItems: 'center', gap: 4 },
  divider: { width: 1, backgroundColor: '#818cf8' },
  incomeExpenseLabel: { color: '#c7d2fe', fontSize: 12 },
  incomeAmount: { color: '#fff', fontWeight: '600', fontSize: 15 },
  expenseAmount: { color: '#fff', fontWeight: '600', fontSize: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937', paddingHorizontal: 16, marginBottom: 8 },
  txItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10, padding: 12, borderRadius: 12 },
  txIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txInfo: { flex: 1 },
  txNote: { fontSize: 14, fontWeight: '500', color: '#1f2937' },
  txCategory: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText: { color: '#9ca3af', fontSize: 14 },
});