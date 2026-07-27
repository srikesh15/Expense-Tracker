import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CATEGORIES } from '../constants/Categories';
import useTransactionStore from '../store/useTransactionStore';

export default function AddTransactionScreen({ navigation }) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    if (!amount || !type || !category) return;
    addTransaction({
      amount: Number(amount),
      note,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Type Selector */}
        <View style={styles.typeRow}>
          <TouchableOpacity
            onPress={() => setType('expense')}
            style={[
              styles.typeBtn,
              type === 'expense' && styles.typeBtnExpenseActive,
            ]}
          >
            <Ionicons
              name="arrow-up-circle-outline"
              size={18}
              color={type === 'expense' ? '#fff' : '#dc2626'}
            />
            <Text style={[styles.typeBtnText, type === 'expense' && { color: '#fff' }]}>
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType('income')}
            style={[
              styles.typeBtn,
              type === 'income' && styles.typeBtnIncomeActive,
            ]}
          >
            <Ionicons
              name="arrow-down-circle-outline"
              size={18}
              color={type === 'income' ? '#fff' : '#16a34a'}
            />
            <Text style={[styles.typeBtnText, type === 'income' && { color: '#fff' }]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Note */}
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="What was this for?"
          value={note}
          onChangeText={setNote}
          placeholderTextColor="#9ca3af"
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setCategory(cat.key)}
              style={[
                styles.categoryItem,
                category === cat.key && {
                  borderColor: cat.color,
                  borderWidth: 2,
                  backgroundColor: cat.color + '22',
                },
              ]}
            >
              <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          style={[
            styles.saveBtn,
            (!amount || !category) && { opacity: 0.5 },
          ]}
        >
          <Text style={styles.saveBtnText}>Save Transaction</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#1f2937' },
  content: { padding: 16, paddingBottom: 40 },
  typeRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  typeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff' },
  typeBtnText: { fontSize: 15, fontWeight: '500', color: '#374151' },
  typeBtnExpenseActive: { backgroundColor: '#dc2626', borderColor: '#dc2626' },
  typeBtnIncomeActive: { backgroundColor: '#16a34a', borderColor: '#16a34a' },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
  amountContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 16, marginBottom: 20 },
  currencySymbol: { fontSize: 24, fontWeight: '600', color: '#6366f1', marginRight: 8 },
  amountInput: { flex: 1, fontSize: 28, fontWeight: '700', color: '#1f2937', paddingVertical: 16 },
  noteInput: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', padding: 14, fontSize: 15, color: '#1f2937', marginBottom: 20 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  categoryItem: { width: '22%', alignItems: 'center', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff', gap: 4 },
  categoryLabel: { fontSize: 11, color: '#6b7280', textAlign: 'center' },
  saveBtn: { backgroundColor: '#6366f1', padding: 16, borderRadius: 14, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});