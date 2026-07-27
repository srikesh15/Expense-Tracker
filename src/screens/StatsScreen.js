import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';
import { BarChart, PieChart } from 'react-native-chart-kit';
import useTransactionStore from '../store/useTransactionStore';
import { getCategoryByKey } from '../constants/Categories';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.6,
};

export default function StatsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const transactions = useTransactionStore((state) => state.transactions);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });

  const monthlyTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const expenses = monthlyTransactions.filter((tx) => tx.type === 'expense');

  // group by category
  const categoryMap = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  // bar chart data
  const barData = {
    labels: Object.keys(categoryMap).map(
      (key) => getCategoryByKey(key).icon
    ),
    datasets: [{ data: Object.values(categoryMap) }],
  };

  // pie chart data
  const pieData = Object.keys(categoryMap).map((key) => {
    const cat = getCategoryByKey(key);
    return {
      name: cat.label,
      amount: categoryMap[key],
      color: cat.color,
      legendFontColor: '#333',
      legendFontSize: 12,
    };
  });

  const hasData = Object.keys(categoryMap).length > 0;

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        Stats
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>
        {monthName} {year}
      </Text>

      {!hasData ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: '#888' }}>
          No expense data for this month
        </Text>
      ) : (
        <>
          <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
            Expenses by Category
          </Text>
          <BarChart
            data={barData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={{ borderRadius: 8, marginBottom: 24 }}
          />

          <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
            Category Breakdown
          </Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={200}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="16"
            style={{ borderRadius: 8, marginBottom: 24 }}
          />
        </>
      )}
    </ScrollView>
  );
}