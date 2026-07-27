import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import useTransactionStore from '../store/useTransactionStore';
import useBudgetStore from '../store/useBudgetStore';
import { CATEGORIES } from '../constants/Categories';

export default function BudgetScreen() {
  const [selectedDate] = useState(new Date());
  const [input, setInput] = useState('');

  const { monthlyBudget, setMonthlyBudget, categoryBudgets, setCategoryBudget } = useBudgetStore();
  const transactions = useTransactionStore((state) => state.transactions);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const monthlyExpenses = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return (
      tx.type === 'expense' &&
      d.getFullYear() === year &&
      d.getMonth() === month
    );
  });

  const totalExpense = monthlyExpenses.reduce((acc, tx) => acc + tx.amount, 0);
  const remaining = monthlyBudget - totalExpense;
  const isOverBudget = remaining < 0;

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <SafeAreaView>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
          Budget
        </Text>

        {/* Monthly Budget */}
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
          Monthly Budget
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
          <TextInput
            style={{ borderWidth: 0.5, borderRadius: 8, padding: 10, flex: 1 }}
            placeholder="Enter monthly budget"
            keyboardType="numeric"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            onPress={() => {
              setMonthlyBudget(Number(input));
              setInput('');
            }}
            style={{
              backgroundColor: '#6366f1',
              padding: 10,
              borderRadius: 8,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>Set</Text>
          </TouchableOpacity>
        </View>

        {/* Budget Summary */}
        {monthlyBudget > 0 && (
          <View
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: isOverBudget ? '#fee2e2' : '#f0fdf4',
              marginBottom: 24,
            }}
          >
            <Row label="Budget" value={`₹${monthlyBudget}`} />
            <Row label="Spent" value={`₹${totalExpense}`} />
            <Row
              label="Remaining"
              value={`₹${Math.abs(remaining)}`}
              valueColor={isOverBudget ? '#dc2626' : '#16a34a'}
            />
            {isOverBudget && (
              <Text style={{ color: '#dc2626', marginTop: 8, fontWeight: '500' }}>
                Over budget by ₹{Math.abs(remaining)}
              </Text>
            )}
          </View>
        )}

        {/* Category Budgets */}
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 12 }}>
          Category Budgets
        </Text>
        {CATEGORIES.map((cat) => {
          const catExpense = monthlyExpenses
            .filter((tx) => tx.category === cat.key)
            .reduce((acc, tx) => acc + tx.amount, 0);

          const catBudget = categoryBudgets[cat.key] || 0;
          const catOver = catBudget > 0 && catExpense > catBudget;

          return (
            <View
              key={cat.key}
              style={{
                marginBottom: 12,
                padding: 12,
                borderWidth: 0.5,
                borderRadius: 8,
                borderColor: catOver ? '#dc2626' : '#e5e7eb',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text>{cat.icon} {cat.label}</Text>
                <Text style={{ color: catOver ? '#dc2626' : '#888' }}>
                  ₹{catExpense} {catBudget > 0 ? `/ ₹${catBudget}` : ''}
                </Text>
              </View>
              <CategoryBudgetInput
                catKey={cat.key}
                current={catBudget}
                onSet={(val) => setCategoryBudget(cat.key, val)}
              />
            </View>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
      <Text style={{ color: '#888' }}>{label}</Text>
      <Text style={{ fontWeight: '500', color: valueColor || '#000' }}>{value}</Text>
    </View>
  );
}

function CategoryBudgetInput({ catKey, current, onSet }) {
  const [val, setVal] = useState(current > 0 ? String(current) : '');
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <TextInput
        style={{ borderWidth: 0.5, borderRadius: 6, padding: 6, flex: 1, fontSize: 13 }}
        placeholder="Set limit"
        keyboardType="numeric"
        value={val}
        onChangeText={setVal}
      />
      <TouchableOpacity
        onPress={() => onSet(Number(val))}
        style={{
          backgroundColor: '#6366f1',
          paddingHorizontal: 12,
          borderRadius: 6,
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 13 }}>Set</Text>
      </TouchableOpacity>
    </View>
  );
}